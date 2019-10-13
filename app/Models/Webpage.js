'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

const CrawlerHelper = use('App/Helpers/CrawlerHelper')

class Webpage extends Model {
  
  static boot () {
    super.boot()

    this.addHook('afterCreate', async (instance) => {
      //instance.title = await 
      let domain = await this.domain().fetch
      if (domain.domain === '::') {
        return false
      }
      
      let url = domain.domain + instance.path
      
      instance.title = await CrawlerHelper.getTitle(url)
      //console.log(instance.title)
      instance.save()
    })
  }
  
  domain () {
    return this.belongsTo('App/Models/Domain')
  }
  
  annotations () {
    return this.hasMany('App/Models/annotations')
  }
  
}

module.exports = Webpage
