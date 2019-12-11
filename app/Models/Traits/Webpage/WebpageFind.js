'use strict'

const Domain = use('App/Models/Domain')
const Webpage = use('App/Models/Webpage')
const Env = use('Env')
const URLFilter = use('App/Helpers/URLFilter')

class WebpageFind {

  register(Model) {
    
    Model.findByURL = async function (URL, options) {
      URL = URLFilter(URL)
      //console.log({URL})
      let webpage = await Webpage.findBy('url', URL)

      if (webpage !== null) {
        return webpage
      }

      let domain = await Domain.findByURL(URL)
      webpage = new Webpage
      webpage.url = URL
      await domain.webpages().save(webpage)

      return webpage
    } // Model.findByURL = async function (URL) {
    
  } // register (Model) {
}

module.exports = WebpageFind
