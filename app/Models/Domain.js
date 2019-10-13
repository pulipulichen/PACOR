'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

const CrawlerHelper = use('App/Helpers/CrawlerHelper')

class Domain extends Model {
  static boot () {
    super.boot()

    this.addHook('afterCreate', async (instance) => {
      //instance.title = await 
      let url = instance.domain
      if (url === '::') {
        //return instance
        return false
      }
      
      instance.title = await CrawlerHelper.getTitle(url)
      //console.log(instance.title)
      instance.save()
    })
  }
  /*
  static boot () {
    super.boot()
  }
  */
  
  users () {
    return this.hasMany('App/Models/User')
  }
  
  webpages () {
    return this.hasMany('App/Models/Webpage')
  }
  
  assets () {
    return this.hasMany('App/Models/MaterialAsset')
  }
}

module.exports = Domain
