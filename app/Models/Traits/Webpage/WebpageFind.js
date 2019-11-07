'use strict'

const Domain = use('App/Models/Domain')
const Webpage = use('App/Models/Webpage')

class WebpageFind {

  register(Model) {
    Model.findByURL = async function (URL) {
      if (typeof (URL) !== 'string') {
        URL = '/'
      }

      let webpage = await Webpage.findBy('url', URL)

      if (webpage !== null) {
        return webpage
      }

      let domain = await Domain.findByURL(URL)
      webpage = new Webpage
      webpage.url = URL
      await domain.webpages().save(webpage)

      return webpage
    }
  } // register (Model) {
}

module.exports = WebpageFind
