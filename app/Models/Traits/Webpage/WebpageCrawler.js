'use strict'
const CrawlerHelper = use('App/Helpers/CrawlerHelper')

class WebpageCrawler {

  register(Model) {
    Model.addHook('afterCreate', async (instance) => {
      if (typeof (instance.title) === 'string'
              && instance.title !== '') {
        return false
      }

      let url = instance.url

      try {
        instance.title = await CrawlerHelper.getTitle(url)
        //console.log(instance.title)
        instance.save()
      }
      catch (e) {
        console.log('URL get title error: ' + url)
      }
    })
  } // register (Model) {
}

module.exports = WebpageCrawler
