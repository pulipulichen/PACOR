'use strict'

const Domain = use('App/Models/Domain')
const Webpage = use('App/Models/Webpage')
const Env = use('Env')
const URLFilter = use('App/Helpers/URLFilter')

const Sleep = use('Sleep')

class WebpageFind {

  register(Model) {
    
    Model.findByURL = async function (URL, options) {
      try {
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
      }
      catch (e) {
        //setTimeout(() => {
        await Sleep(0.1)
        return this.findByURL(URL, options)
        //}, 100)
      }
    } // Model.findByURL = async function (URL) {
    
  } // register (Model) {
}

module.exports = WebpageFind
