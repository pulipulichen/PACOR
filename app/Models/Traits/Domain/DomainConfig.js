/* global use */

'use strict'

const Cache = use('Cache')
const TypeHelper = use('App/Helpers/TypeHelper')

const Profiler = use('Profiler')

class DomainConfig {

  register(Model) {

    Model.prototype.getConfig = async function () {
      let profiler = new Profiler(1, 'Domain/DomainConfig.getConfig()')
      
      let cacheKey = Cache.key('getConfig')
      let doQuery = async () => {
        let output = {}
        
        profiler.before('get baseConfig')
        
        let baseConfig = use('Config').get('reading')
        
        profiler.after('get baseConfig')
        
        if (this.config && typeof(this.config) === 'object') {
          profiler.before('mergeDeep')
          
          console.log('before TypeHelper.mergeDeep()')
          console.log(baseConfig)
          console.log(this.config)
          output = TypeHelper.mergeDeep(baseConfig, this.config)
          console.log(output)
          
          profiler.after('mergeDeep')
        }
        else {
          output = baseConfig
        }
        
        
        profiler.before('check config')
        
        if (!output) {
          throw new Error('config is null: Domain ' + this.primaryKeyValue)
        }
        
        profiler.finish()
        
        return output
      }
      
      profiler.finish()
      
      //return await Cache.rememberWait([this, 'Domain'], cacheKey, doQuery)
      return doQuery()
      
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
