/* global use */

'use strict'

//const Cache = use('Cache')
const DomainModel = use('App/Models/Domain')
const OriginFilter = use('App/Helpers/OriginFilter')

class DomainAdmin {

  register(Model) {


    Model.findByURL = async function (URL) {
      let origin = OriginFilter(URL)

      return await DomainModel.findOrCreate({
        domain: origin
      })
    }
    
  } // register (Model) {
}

module.exports = DomainAdmin
