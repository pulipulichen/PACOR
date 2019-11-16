'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

//const OriginFilter = use('App/Helpers/OriginFilter')

class Domain extends Model {
  static boot () {
    super.boot()

    this.addTrait('JSONCase', 'config')
    
    this.addTrait('Domain/DomainAdmin')
    this.addTrait('Domain/DomainCrawler')
    this.addTrait('Domain/DomainFind')
  }
  
  
  users () {
    return this.hasMany('App/Models/User')
  }
  
  admins () {
    return this.users()
            .where('role', 'domain_admin')
  }
  
  /*
  async adminNames () {
    let users = await this.hasMany('App/Models/User')
            .where('role', 'domain_admin')
            .pair('id', 'username')
    return users.map(user => user.username)
  }
   */
  /*
  async adminNames () {
    let admins = await this.admins()
    return admins.map(user => user.username)
  }
  */
  
  
  
  readers () {
    return this.hasMany('App/Models/User')
            .where('role', 'reader')
  }
  
  webpages () {
    return this.hasMany('App/Models/Webpage')
  }
  
//  w () {
//    return this.hasOne('App/Models/Webpage')
//  }
  
  assets () {
    return this.hasMany('App/Models/MaterialAsset')
  }
  
  static get hidden () {
    return ['created_at', 'updated_at']
  }

  
//  getFullURL (webpagePath) {
//    return this.domain + webpagePath
//  }
}

module.exports = Domain
