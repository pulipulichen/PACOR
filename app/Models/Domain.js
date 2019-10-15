'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

const CrawlerHelper = use('App/Helpers/CrawlerHelper')

class Domain extends Model {
  static boot () {
    super.boot()

    this.addHook('afterCreate', async (instance) => {
      //instance.title = await 
      await instance._crawlTitleFromURL(instance)
    })
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
    return this.hasMany('App/Models/User')
            .where('role', 'domain_admin')
  }
  
  async changeAdmins (adminsUsername) {
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
    
    let existedUsernames = users.toJSON().map(user => user.username)
    let nonexistentUsernams = adminsUsername.filter(username => existedUsernames.indexOf(username) === -1)
    
    let usersData = nonexistentUsernams.map((username) => { return {
      username: username,
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
  
  webpageCount () {
    return {
      eagerLoad: () => {
        return this.id
      }
    }
  }
  
  assets () {
    return this.hasMany('App/Models/MaterialAsset')
  }
}

module.exports = Domain
