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
  
  readers () {
    return this.hasMany('App/Models/User')
            .where('role', 'reader')
  }
  
  webpages () {
    return this.hasMany('App/Models/Webpage')
  }
  
  async webpageCount () {
    return await this.hasMany('App/Models/Webpage').getCount()
  }
  
  assets () {
    return this.hasMany('App/Models/MaterialAsset')
  }
}

module.exports = Domain
