/* global use */

'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

const CrawlerHelper = use('App/Helpers/CrawlerHelper')
const Env = use('Env')
const baseURL = `${Env.get('PROTOCOL')}//${Env.get('HOST')}:${Env.get('PORT')}`

const Domain = use('App/Models/Domain')
const WebpageGroup = use('App/Models/WebpageGroup')
const User = use('App/Models/User')

const { HttpException } = use('@adonisjs/generic-exceptions') 

const Cache = use('Cache')

const ReadingConfig = use('Config').get('reading')

const fs = use('fs')
const Helpers = use('Helpers')

class Webpage extends Model {
  
  static boot () {
    super.boot()

    this.addHook('afterCreate', async (instance) => {
      instance._crawlTitleFromURL(instance)
    })
    
    this.addHook('beforeSave', async (instance) => {
      Cache.forget(Cache.key('Webpage', 'getReadingProgresses', instance))
      Cache.forget(Cache.key('Models.Webpage.getAgreement', this))
      Cache.forget(Cache.key('Models.Webpage.getConfig', this))
    })
  }
  
  async _crawlTitleFromURL (instance) {
    if (typeof(instance.title) === 'string' 
            && instance.title !== '') {
      return
    }

    let url = instance.url

    instance.title = await CrawlerHelper.getTitle(url)
    //console.log(instance.title)
    instance.save()
  }
  
  domain () {
    return this.belongsTo('App/Models/Domain')
  }
  
  annotations () {
    return this.hasMany('App/Models/Annotation')
  }
  
  groups (group_seq_id) {
    let groups = this.hasMany('App/Models/WebpageGroup')
            .with('users')
            .orderBy('group_seq_id', 'asc')
    
    if (typeof(group_seq_id) === 'number') {
      groups.where('group_seq_id', group_seq_id)
              .limit(1)
    }
    
    return groups
  }
  
  getGroups(group_seq_id) {
    return this.groups(group_seq_id)
  }
  
  async getGroup(group_seq_id) {
    let group = await this.groups(group_seq_id).fetch()
    if (group === null) {
      return null
    }
    return group.first()
  }
  
  async getGroups() {
    let groups = await this.groups()
            .fetch()
    
    let mapping = {}
    groups.rows.forEach(group => {
      mapping[group.group_seq_id] = group
    })
    return mapping
  }
  
  async getGroupsList() {
    let cacheKey = `Webpage.getGroupsList.${this.primaryKeyValue}`
    return await Cache.get(cacheKey, async () => {
      let groups = await this.groups().fetch()

      let list = groups.toJSON().map(group => {
        return group.users.map(user => user.username).join(' ')
      })

      let output = list.join('\n')
      await Cache.forever(cacheKey, output)
      return output
    })
  }
  
  async setGroupsList(list) {
    if (typeof(list) === 'string') {
      let lines = list.trim().split('\n')
      list = []
      lines.forEach(line => {
        let lineArray = []
        line.trim().split(' ').forEach(user => {
          if (user !== '') {
            lineArray.push(user)
          }
        })
        list.push(lineArray)
      })
    }
    
    // ---------------------
    
    let currentSeqID
    let groups = await this.getGroups()
    for (currentSeqID = 0; currentSeqID < list.length; currentSeqID++) {
      let group = groups[currentSeqID]
      
      if (group === null || group === undefined) {
        group = new WebpageGroup()
        group.group_seq_id = currentSeqID
        
        await this.groups().save(group)
      }
      
      // ----------------------
      
      let usersToAdd = list[currentSeqID]
      await group.setUsers(usersToAdd)
      
      // ----------------------
      
      delete groups[currentSeqID]
    }
    
    for (let i in groups) {
      await groups[i].users().detach()
      await groups[i].delete()
    }
    
    await Cache.forget(`User.getOtherUserIDsInGroup.${this.primaryKeyValue}`)
    await Cache.forget(`Webpage.getGroupsList.${this.primaryKeyValue}`)
  }
  
  static get hidden () {
    //return ['password']
    return ['created_at', 'updated_at']
  }
  
  static async findByURL (URL) {
    if (typeof(URL) !== 'string') {
      URL = '/'
    }
    
    let webpage = await Webpage.findBy('url', URL)
    
    if (webpage !== null) {
      return webpage
    }
    
    let domain = await Domain.findByURL(URL)
    webpage = new Webpage
    webpage.url = URL
    await domain.webpages().save(webpage)
    
    return webpage
  }
  
  // ------------------
  
  annotations () {
    return this.hasMany('App/Model/Annotation')
  }
  
  sectionAnnotations() {
    return this.hasMany('App/Model/SectionAnnotation')
  }
  
  // ------------------
  
  async getAnonymousUserIDs(excludedUserID) {
    if (typeof(excludedUserID) === 'object'
            && typeof(excludedUserID.primaryKeyValue) === 'number') {
      excludedUserID = excludedUserID.primaryKeyValue
    }
    
    let cacheKey = `Webpage.getAnonymousUserIDs.${this.primaryKeyValue}`
    let output = await Cache.get(cacheKey, async () => {
      let relation = User
              .query()
              .where('domain_id', this.domain_id)

      let groups = await this.groups().fetch()
      let usersInGroups = []
      groups.toJSON().forEach(group => {
        group.users.forEach(user => {
          usersInGroups.push(user.id)
        })
      })


      if (typeof(excludedUserID) === 'number') {
        usersInGroups.push(excludedUserID)
      }

      if (usersInGroups.length > 0) {
        relation.whereNotIn('id', usersInGroups)
      }

      let users = await relation.fetch()
      return users.toJSON().map(user => user.id)
    })
    
    if (typeof(excludedUserID) === 'number') {
      output = output.filter(id => (id !== excludedUserID)) 
    }
    return output
  }
  
  async getReadingProgresses () {
    let cacheKey = Cache.key('Webpage', 'getReadingProgresses', this)
    return await Cache.get(cacheKey, async () => {
      // 先看看自己有沒有
      let output
      
      if (this.config !== null
              && (typeof(this.config) === 'object')
              && Array.isArray(this.config.readingProgresses)) {
        output = this.config.readingProgresses
      }
      else {
        let domain = this.domain().fetch()
        if (domain.config !== undefined
                && (typeof(domain.config) === 'object')
                && Array.isArray(domain.config.readingProgresses)) {
          output = domain.config.readingProgresses
        }
        else {
          output = ReadingConfig.readingProgresses
        }
      }
      await Cache.forever(cacheKey, output)
      return output
    })
  }
  
  async getAgreement() {
    let cacheKey = Cache.key('Models.Webpage.getAgreement', this)
    return await Cache.get(cacheKey, async () => {
      let output
      if (typeof(this.agreement) === 'string') {
        output = this.agreement
      }
      else {
        let domain = await this.domain().fetch()
        if (typeof(domain.agreement) === 'string') {
          output = domain.agreement
        }
        else {
          const filepath = Helpers.publicPath('agreement.html')
          output = fs.readFileSync(filepath, 'utf8').toString()
        }
      }
      //console.log(output)
      //Cache.forever(cacheKey, output)
      return output
    })
  }
  
  async getConfig() {
    let cacheKey = Cache.key('Models.Webpage.getConfig', this)
    return await Cache.get(cacheKey, async () => {
      let output
      if (typeof(this.config) === 'string') {
        output = this.config
      }
      else {
        let domain = await this.domain().fetch()
        if (typeof(domain.config) === 'string') {
          output = domain.config
        }
        else {
          output = ReadingConfig
        }
      }
      //console.log(output)
      //Cache.forever(cacheKey, output)
      return output
    })
  }
}

module.exports = Webpage
