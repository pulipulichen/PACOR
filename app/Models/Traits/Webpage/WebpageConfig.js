/* global use */

'use strict'

const Cache = use('Cache')
const Config = use('Config')

const Env = use('Env')
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
      let profiler = new Profiler(3, 'Webpage/WebpageConfig.getConfig()')
      
      let doQuery = async () => {
        //console.log('getConfig, reloaded')
        
        let output = Config.get('reading')
        output = this._pretestConfig(output)
        
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
          //console.log(this.config)
          output = TypeHelper.mergeDeep(output, domainConfig)
          //console.log(output)
        }
        
        //profiler.before('get config from domain')
        //let baseConfig = await domain.getConfig()
        
        profiler.before('this.config')
        
        if (this.config && typeof(this.config) === 'object') {
          profiler.before('mergeDeep')
          
          //if (domainConfig) {
          //  output = TypeHelper.mergeDeep(output, domainConfig)
          //}
          
//          console.log('before TypeHelper.mergeDeep()')
//          console.log(domainConfig)
//          console.log(this.config)
          //console.log('a', output.readingProgressModules.CollaborativeReading)
          //console.log('b', this.config.readingProgressModules.CollaborativeReading)
          output = TypeHelper.mergeDeep(output, this.config)
          //console.log('c', output.readingProgressModules.CollaborativeReading)
//          console.log(output)
          
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
      //console.log(cacheKey)
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
    
    Model.prototype._pretestConfig = function (output) {
      // For pre-test
      let pretestConfig
      
      let baseDomain = Env.get('PROTOCOL') + '//' 
              + Env.get('PUBLIC_HOST') + ':' + Env.get('PORT')
      
      let pretestPrefixAlpha = baseDomain + '/pretest/alpha/'
      
      let pretestPrefixBetaCollaborative = baseDomain + '/pretest/beta/collaborative/'
      let pretestPrefixBetaIndividual = baseDomain + '/pretest/beta/individual/'
      
      if (this.url.startsWith(pretestPrefixAlpha)) {
        let parts = this.url.split('/')
        let seq = parts[(parts.length - 3)]
        
        pretestConfig = Config.get('readingPretestAlpha' + seq)
      }
      else if (this.url.startsWith(pretestPrefixBetaCollaborative)) {
        pretestConfig = Config.get('readingPretestBetaCollaborative')
      }
      else if (this.url.startsWith(pretestPrefixBetaIndividual)) {
        pretestConfig = Config.get('readingPretestBetaIndividual')
      }

      if (pretestConfig) {
        //console.log(output)
        output = TypeHelper.mergeDeep(output, pretestConfig)
        //console.log(output)
      }
      
      return output
    }

    Model.prototype.getStepConfig = async function (stepName) {
      if (!stepName) {
        console.trace('webpage.getStepConfig()')
        throw new Error('Step name is null')
      }
      
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
