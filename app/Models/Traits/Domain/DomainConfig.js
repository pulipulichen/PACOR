/* global use */

'use strict'

const Cache = use('Cache')
const TypeHelper = use('App/Helpers/TypeHelper')

class DomainConfig {

  register(Model) {

    Model.prototype.getConfig = async function () {
      let cacheKey = Cache.key('getConfig')
      let doQuery = async () => {
        let output = {}
        
        let baseConfig = use('Config').get('reading')
        
        if (this.config && typeof(this.config) === 'object') {
          console.log('before TypeHelper.mergeDeep()')
          console.log(baseConfig)
          console.log(this.config)
          output = TypeHelper.mergeDeep(baseConfig, this.config)
          console.log(output)
        }
        else {
          output = baseConfig
        }
        
        if (!output) {
          throw new Error('config is null: Domain ' + this.primaryKeyValue)
        }
        
        return output
      }
      
      return await Cache.rememberWait([this, 'Domain'], cacheKey, doQuery)
      /*
      let o = await Cache.rememberWait([this, 'config'], cacheKey, doQuery)
      if (!o) {
        await Cache.forgetWithTags([this], cacheKey)
        return await this.getConfig()
      }
      else {
        return o
      }
       */
    }

  } // register (Model) {
}

module.exports = DomainConfig
