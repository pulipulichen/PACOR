'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
//const Model = use('App/Models/Prototype/Model')

const Database = use('Database')
const Domain = use('App/Models/Domain')
const User = use('App/Models/User')

const Cache = use('Cache')

/**
 * table.integer('webpage_id').notNullable().unsigned().references('id').inTable('webpages').onDelete('cascade')
 * table.integer('group_seq_id').notNullable()
 */
class WebpageGroup extends Model {
  static boot () {
    super.boot()
    this.addTrait('WebpageGroup/WebpageGroupUserFilter')
    this.addTrait('WebpageGroup/WebpageGroupTimestamp')
    this.addTrait('WebpageGroup/WebpageGroupIndicator')
    this.addTrait('WebpageGroup/WebpageGroupIndicatorAnnotation')
    this.addTrait('WebpageGroup/WebpageGroupIndicatorInteraction')
    this.addTrait('WebpageGroup/WebpageGroupIndicatorUserAttributes')
    this.addTrait('WebpageGroup/WebpageGroupIndicatorReadingActivityLog')
  } // static boot () {
  
  webpage () {
    return this.belongsTo('App/Models/Webpage')
  }
  
  users (excludedUser) {
    let relation = this.belongsToMany('App/Models/User')
            //.orderBy('username', 'asc')
            .pivotTable('group_user')
    
    if (typeof(excludedUser) === 'number') {
      relation.where('user_id', '!=', excludedUser)
    }
    else if (typeof(excludedUser) === 'object'
            && typeof(excludedUser.primaryKeyValue) === 'number') {
      relation.where('user_id', '!=', excludedUser.primaryKeyValue)
    }
    
    return relation
  }
  
  userIds (excludedUser) {
    return this.users(excludedUser).ids()
  } 
  
  async getUsernames() {
    let cacheKey = `WebpageGroup.getUsernames.${this.primaryKeyValue}`
    return await Cache.get(cacheKey, async () => {
      let users = await this.users().fetch()
      let output = users.toJSON().map(user => user.username)
      //await Cache.forever(cacheKey, output)
      return output
    })
  }
  
  async getDomain () {
    let webpage = await this.webpage().fetch()
    return await webpage.domain().fetch()
  }
  
  async getDomainUsers (names) {
    let domain = await this.getDomain()
    let users = domain.users()
    if (Array.isArray(names)) {
      users.whereIn('username', names)
    }
    return await users.fetch()
  }
  
  async getUsernamesInDomain() {
    let cacheKey = `WebpageGroup.getUsernamesInDomain.${this.primaryKeyValue}`
    //if (Array.isArray(names)) {
    //  cacheKey = cacheKey + '.' + names.join(',')
    //}
    
    return await Cache.get(cacheKey, async () => {
      let domain = await this.getDomain()
      let users = domain.users()
      //if (Array.isArray(names)) {
      //  users.whereIn('username', names)
      //}
      users = await users.fetch()
      let output =  users.toJSON().map(user => user.username)
      await Cache.forever(cacheKey, output)
      return output
    })
  }
  
  async setUsers(namesList) {
    
    if (typeof(namesList) === 'string') {
      if (namesList === '') {
        namesList = []
      }
      else {
        namesList = namesList.split(' ')
      }
    }
    
    // ------------------
    
    let namesInGroup = await this.getUsernames()
    let namesInDomain = await this.getUsernamesInDomain()
    
    let namesNeedToCreate = []
    let namesNeedToAsso = []
    namesList.forEach(username => {
      if (namesInGroup.indexOf(username) === -1) {
        if (namesInDomain.indexOf(username) === -1) {
          namesNeedToCreate.push(username)
        }
        namesNeedToAsso.push(username)
      }
    })
    
    let namesNeedToDisso = namesInGroup.filter(username => (namesList.indexOf(username) === -1))
    
    //console.log('======================')
    //console.log('namesNeedToCreate', namesNeedToCreate)
    //console.log('namesNeedToAsso', namesNeedToAsso)
    //console.log('namesNeedToDisso', namesNeedToDisso)
    //return
    
    // --------------------------
    // 先建立users
    await this.createDomainUserByNames(namesNeedToCreate)
    await this.associateUsersByName(namesNeedToAsso)
    await this.dissociateUsersByName(namesNeedToDisso)
    
    let usersCount = await this.users().getCount()
    if (usersCount === 0) {
      await this.delete()
    }
    
    
    await Cache.forget(`WebpageGroup.getUsernamesInDomain.${this.primaryKeyValue}`)
    await Cache.forget(`WebpageGroup.getUsernames.${this.primaryKeyValue}`)
    
    return 1
  }
  
  async createDomainUserByNames (namesNeedToCreate) {
    if (namesNeedToCreate.length === 0) {
      return
    }
    let userData = namesNeedToCreate.map(username => {
      return {
        username: username
      }
    })
    
    let domain = await this.getDomain()
    await domain.users().createMany(userData)
  }
  
  async associateUsersByName (namesNeedToAsso) {
    if (namesNeedToAsso.length === 0) {
      return
    }
    let users = await this.getDomainUsers(namesNeedToAsso)
    for (let i in users.rows) {
      await this.users().save(users.rows[i])
      //await users.rows[i].groups(this.id).attach()
    }
  }
  
  async dissociateUsersByName (namesNeedToDisso) {
    if (namesNeedToDisso.length === 0) {
      return
    }
    let users = await this.getDomainUsers(namesNeedToDisso)
    
    for (let i in users.rows) {
      //await this.users().dissociate(users.rows[i])
      let user = users.rows[i]
      await user.groups().detach(this.id)
    }
  }
  
  static get hidden () {
    //return ['password']
    return ['created_at', 'updated_at']
  }
  
}

module.exports = WebpageGroup
