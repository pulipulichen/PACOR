/* global use */

'use strict'

//const Cache = use('Cache')
const DomainModel = use('App/Models/Domain')
const OriginFilter = use('App/Helpers/OriginFilter')

const Cache = use('Cache')
const ReadingConfig = use('Config').get('reading')
const TypeHelper = use('App/Helpers/TypeHelper')

class DomainAdmin {

  register(Model) {


    Model.findByURL = async function (URL) {
      let origin = OriginFilter(URL)

      return await DomainModel.findOrCreate({
        domain: origin
      })
    }
    
    Model.prototype.getConfig = async function () {
      let cacheKey = Cache.key('getConfig')
      let doQuery = async () => {
        let output
        
        let baseConfig = ReadingConfig
        
        if (this.config) {
          output = TypeHelper.mergeDeep(baseConfig, this.config)
        }
        else {
          output = baseConfig
        }
        
        if (!output) {
          throw new Error('config is null: Domain ' + this.primaryKeyValue)
        }
        
        return output
      }
      
      let o = await Cache.rememberWait([this], cacheKey, doQuery)
      if (!o) {
        await Cache.forgetWithTags([this], cacheKey)
        return await this.getConfig()
      }
      else {
        return o
      }
    }

  } // register (Model) {
}

module.exports = DomainAdmin
