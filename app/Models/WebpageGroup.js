'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
//const Model = use('App/Models/Prototype/Model')

const Database = use('Database')
const Domain = use('App/Models/Domain')

class WebpageGroup extends Model {
  webpage () {
    return this.belongsTo('App/Models/Webpage')
  }
  
  users () {
    return this.belongsToMany('App/Models/User')
            //.orderBy('username', 'asc')
            .pivotTable('group_user')
  }
  
  async getUsernames() {
    let users = await this.users().fetch()
    return users.toJSON().map(user => user.username)
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
  
  async getUsernamesInDomain(names) {
    let domain = await this.getDomain()
    let users = domain.users()
    if (Array.isArray(names)) {
      users.whereIn('username', names)
    }
    users = await users.fetch()
    return users.toJSON().map(user => user.username)
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
    
    // --------------------------
    // 先建立users
    await this.createDomainUserByNames(namesNeedToCreate)
    await this.associateUsersByName(namesNeedToAsso)
    await this.dissociateUsersByName(namesNeedToDisso)
    
    let usersCount = await this.users().getCount()
    if (usersCount === 0) {
      await this.delete()
    }
    
    return 1
  }
  
  async createDomainUserByNames (namesNeedToCreate) {
    let userData = namesNeedToCreate.map(username => {
      return {
        username: username
      }
    })
    
    let domain = await this.getDomain()
    await domain.users().createMany(userData)
  }
  
  async associateUsersByName (namesNeedToAsso) {
    let users = await this.getDomainUsers(namesNeedToAsso)
    for (let i in users.rows) {
      await this.users().save(users.rows[i])
    }
  }
  
  async dissociateUsersByName (namesNeedToDisso) {
    let users = await this.getDomainUsers(namesNeedToDisso)
    for (let i in users.rows) {
      //await this.users().dissociate(users.rows[i])
      await users.rows[i].groups(this.id).detach()
    }
  }
}

module.exports = WebpageGroup
