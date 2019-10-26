'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

const CrawlerHelper = use('App/Helpers/CrawlerHelper')

const OriginFilter = use('App/Helpers/OriginFilter')

class Domain extends Model {
  static boot () {
    super.boot()

    this.addHook('afterCreate', async (instance) => {
      //instance.title = await 
      await instance._crawlTitleFromURL(instance)
    })
    
    this.addTrait('JSONCase', 'config')
  }
  
  async _crawlTitleFromURL (instance) {
    if (typeof(instance.title) === 'string' 
            && instance.title !== '') {
      return false
    }

    let url = instance.domain
    if (url === '') {
      //return instance
      return false
    }

    instance.title = await CrawlerHelper.getTitle(url)
    //console.log(instance.title)
    await instance.save()
  }
  /*
  static boot () {
    super.boot()
  }
  */
  
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
  
  async changeAdmins (adminsData) {
    let adminsUsername = adminsData.map(admin => admin.username)
    let adminPasswordMapping = {}
    adminsData.forEach(admin => {
      adminPasswordMapping[admin.username] = admin.password
    })
    
    // 先把不是名單中的人變成讀者
    await this.admins()
            .whereNotIn('username', adminsUsername)
            .update({'role': 'reader'})
    
    await this.readers()
            .whereIn('username', adminsUsername)
            .update({'role': 'domain_admin'})
    
    let users = await this.users()
            .whereIn('username', adminsUsername)
            .fetch()
    
    let admins = await this.admins().fetch()
    for (let i in admins.rows) {
      let admin = admins.rows[i]
      admin.password = adminPasswordMapping[admin.username]
      await admin.save()
    }
    
    let existedUsernames = users.toJSON().map(user => user.username)
    let nonexistentUsernams = adminsUsername.filter(username => existedUsernames.indexOf(username) === -1)
    
    let usersData = nonexistentUsernams.map((username, i) => { return {
      username: username,
      password: adminsData[i].password,
      role: 'domain_admin'
    }})
    
    await this.users().createMany(usersData)
    
    return 1
  }
  
  readers () {
    return this.hasMany('App/Models/User')
            .where('role', 'reader')
  }
  
  webpages () {
    return this.hasMany('App/Models/Webpage')
  }
  
  w () {
    return this.hasOne('App/Models/Webpage')
  }
  
  assets () {
    return this.hasMany('App/Models/MaterialAsset')
  }
  
  static get hidden () {
    return ['created_at', 'updated_at']
  }
  
  static async findByURL (URL) {
    let origin = OriginFilter(URL)
    
    return await Domain.findOrCreate({
      domain: origin
    })
  }
  
//  getFullURL (webpagePath) {
//    return this.domain + webpagePath
//  }
}

module.exports = Domain
