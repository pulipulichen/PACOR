'use strict'

//const Cache = use('Cache')
//const UserModel = use('App/Models/User')

const CrawlerHelper = use('App/Helpers/CrawlerHelper')

//const WebpageGroupModel = use('App/Models/WebpageGroup')

class DomainCrawler {

  register(Model) {

    Model.addHook('afterCreate', async (instance) => {
      if (typeof (instance.title) === 'string'
              && instance.title !== '') {
        return false
      }

      let url = instance.domain
      if (url === '') {
        //return instance
        return false
      }

      try {
        instance.title = await CrawlerHelper.getTitle(url)
        //console.log(instance.title)
        await instance.save()
      }
      catch (e) {
        console.log('URL get title error: ' + url)
      }
    })


    /*
     static boot () {
     super.boot()
     }
     */

  } // register (Model) {
}

module.exports = DomainCrawler
