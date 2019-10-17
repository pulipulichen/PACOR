'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

const CrawlerHelper = use('App/Helpers/CrawlerHelper')
const Env = use('Env')
const baseURL = `${Env.get('PROTOCOL')}//${Env.get('HOST')}:${Env.get('PORT')}`

const WebpageGroup = use('App/Models/WebpageGroup')

class Webpage extends Model {
  
  static boot () {
    super.boot()

    this.addHook('afterCreate', async (instance) => {
      instance._crawlTitleFromURL(instance)
    })
  }
  
  async _crawlTitleFromURL (instance) {
    if (typeof(instance.title) === 'string' 
            && instance.title !== '') {
      return
    }

    //instance.title = await 
    let domain = await instance.domain().fetch
    if (typeof(domain.domain) === 'string' 
            && domain.domain !== '') {
      domain = domain.domain
    }
    else {
      domain = baseURL
    }
    let url = domain + instance.path

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
  
  async getGroup(group_seq_id) {
    let group = await this.groups(group_seq_id).fetch()
    if (group === null) {
      return null
    }
    return group.first()
  }
  
  async getGroupsList() {
    let groups = await this.groups().fetch()
    
    let list = groups.toJSON().map(group => {
      return group.users.map(user => user.username).join(' ')
    })
    
    return list.join('\n')
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
    let seqIDs = await this.groups().pluck('group_seq_id')
    for (currentSeqID = 0; currentSeqID < list.length; currentSeqID++) {
      let group = await this.getGroup(currentSeqID)
      
      if (group === null) {
        group = new WebpageGroup()
        group.group_seq_id = currentSeqID
        
        await this.groups().save(group)
      }
      
      // ----------------------
      
      let usersToAdd = list[currentSeqID]
      await group.setUsers(usersToAdd)
      
      // ----------------------
    }
    
    seqIDs.forEach(seqID => {
      let group = this.groups(seqID)
      
    })
  }
}

module.exports = Webpage
