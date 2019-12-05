/* global use */

'use strict'

const Cache = use('Cache')
const ReadingConfig = use('Config').get('reading')
const TypeHelper = use('App/Helpers/TypeHelper')

const DomainModel = use('App/Models/Domain')

const fs = use('fs')
const Helpers = use('Helpers')

const Profiler = use('Profiler')

//const ReadingConfig = use('Config').get('reading')

class WebpageConfig {

  register(Model) {

    Model.prototype.getReadingProgresses = async function () {
      let profiler = new Profiler(0, 'Webpage/WebpageConfig.getReadingProgresses()')
      
      //let cacheKey = Cache.key('getReadingProgresses')
      //return await Cache.rememberWait([this, 'Webpage'], cacheKey, async () => {
        profiler.before('await this.getConfig()')
        // 先看看自己有沒有
        let config = await this.getConfig()
        profiler.after('await this.getConfig()')
        
        if (!config || Array.isArray(config.readingProgresses) === false) {
          throw new Error('config is wrong!' , config)
        }
        
        profiler.after('check readingProgresses')
        profiler.finish()
        
        return config.readingProgresses
      //})
    }

    Model.prototype.getAgreement = async function () {
      let cacheKey = Cache.key('getAgreement')
      return await Cache.rememberWait([this, 'Webpage'], cacheKey, async () => {
        let output
        if (typeof (this.agreement) === 'string') {
          output = this.agreement
        } else {
          let domain = await this.domain().fetch()
          if (typeof (domain.agreement) === 'string') {
            output = domain.agreement
          } else {
            const filepath = Helpers.publicPath('agreement.html')
            output = fs.readFileSync(filepath, 'utf8').toString()
          }
        }
        //console.log(output)
        //Cache.forever(cacheKey, output)
        return output
      })
    }

    Model.prototype.getConfig = async function () {
      let profiler = new Profiler(5, 'Webpage/WebpageConfig.getConfig()')
      
      let doQuery = async () => {
        let output = ReadingConfig
        
        profiler.before('get domain')
        let query = DomainModel
                .query()
                .where('id', this.domain_id)
                .select('config')
                
        profiler.before('get domain pick', query.toSQL())
        
        let domains = await query.pick(1)
        let domainConfig = domains.config
        
        profiler.before('mergeDeep')
        
        if (domainConfig && 
                typeof(domainConfig) === 'object') {
          output = TypeHelper.mergeDeep(output, this.config)
        }
        
        //profiler.before('get config from domain')
        //let baseConfig = await domain.getConfig()
        
        profiler.before('this.config')
        
        if (this.config && typeof(this.config) === 'object') {
          profiler.before('mergeDeep')
          
          console.log('before TypeHelper.mergeDeep()')
          console.log(baseConfig)
          console.log(this.config)
          output = TypeHelper.mergeDeep(baseConfig, this.config)
          console.log(output)
          
          profiler.after('mergeDeep')
        }
        //else {
        //  output = baseConfig
        //}
        
        profiler.before('check output')
        
        if (!output) {
          throw new Error('config is null: Webpage ' + this.primaryKeyValue)
        }
        return output
      }
      
      //profiler.finish()
      
      //let output = await doQuery()  // 捨棄快取，反正就是給我資料就對了
      //let tags = Cache.filterTags(tags)
      let cacheKey = Cache.key('Webpage.getConfig', this)
      let output = await Cache.rememberForever(cacheKey, doQuery)
      
      profiler.finish()
      return output
        
      
      /*
      let o = await Cache.rememberWait([this, 'Config'], cacheKey, doQuery)
      if (!o) {
        await Cache.forgetWithTags([this], cacheKey)
        return await this.getConfig()
      }
      else {
        return o
      }
       */
    }

    Model.prototype.getStepConfig = async function (stepName) {
      //let cacheKey = Cache.key('getStepConfig', stepName)
      //return await Cache.rememberWait([this, 'Webpage'], cacheKey, async () => {
        let config = await this.getConfig()
        
        if (!config) {
          throw new Error('config is null. Wepbage ' + this.primaryKeyValue)
        }
        
        //console.log({config})
        let output = {}
        if (typeof (config.readingProgressModules[stepName]) === 'object') {
          output = config.readingProgressModules[stepName]
        }
        else {
          console.error(config)
          throw new Error('config has no readingProgressModules: ' + stepName)
        }
        //Cache.forever(cacheKey, output)
        return output
      //})  // return await Cache.get(cacheKey, async () => {
    } // Model.prototype.getStepConfig = async function (stepName) {

  } // register (Model) {
}

module.exports = WebpageConfig
