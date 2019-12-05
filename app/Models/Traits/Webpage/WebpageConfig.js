/* global use */

'use strict'

const Cache = use('Cache')
const ReadingConfig = use('Config').get('reading')
const TypeHelper = use('App/Helpers/TypeHelper')

const fs = use('fs')
const Helpers = use('Helpers')


class WebpageConfig {

  register(Model) {

    Model.prototype.getReadingProgresses = async function () {
      let cacheKey = Cache.key('getReadingProgresses')
      return await Cache.rememberWait([this, 'Webpage'], cacheKey, async () => {
        // 先看看自己有沒有
        let config = await this.getConfig()
        
        if (!config || Array.isArray(config.readingProgresses) === false) {
          throw new Error('config is wrong!' , config)
        }
        
        return config.readingProgresses
      })
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
      let cacheKey = Cache.key('getConfig')
      let doQuery = async () => {
        let output
        
        let domain = await this.domain().fetch()
        let baseConfig = await domain.getConfig()
        
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
          throw new Error('config is null: Webpage ' + this.primaryKeyValue)
        }
        
        return output
      }
      
      return await doQuery()  // 捨棄快取，反正就是給我資料就對了
      
      //return await Cache.rememberWait([this, 'Webpage'], cacheKey, doQuery)
      
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
