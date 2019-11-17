/* global use */

'use strict'

const Cache = use('Cache')
const ReadingConfig = use('Config').get('reading')

const fs = use('fs')
const Helpers = use('Helpers')

class WebpageConfig {

  register(Model) {

    Model.prototype.getReadingProgresses = async function () {
      let cacheKey = Cache.key('Webpage', 'getReadingProgresses', this)
      return await Cache.rememberWait(cacheKey, async () => {
        // 先看看自己有沒有
        let output

        if (this.config !== null
                && (typeof (this.config) === 'object')
                && Array.isArray(this.config.readingProgresses)) {
          output = this.config.readingProgresses
        } else {
          let domain = this.domain().fetch()
          if (domain.config !== undefined
                  && (typeof (domain.config) === 'object')
                  && Array.isArray(domain.config.readingProgresses)) {
            output = domain.config.readingProgresses
          } else {
            output = ReadingConfig.readingProgresses
          }
        }
        //await Cache.forever(cacheKey, output)
        return output
      })
    }

    Model.prototype.getAgreement = async function () {
      let cacheKey = Cache.key('Models.Webpage.getAgreement', this)
      return await Cache.rememberWait(cacheKey, async () => {
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
      let cacheKey = Cache.key('Models.Webpage.getConfig', this)
      return await Cache.rememberWait(cacheKey, async () => {
        let output
        if (typeof (this.config) === 'string') {
          output = this.config
        } else {
          let domain = await this.domain().fetch()
          if (typeof (domain.config) === 'string') {
            output = domain.config
          } else {
            output = ReadingConfig
          }
        }
        //console.log(output)
        //Cache.forever(cacheKey, output)
        return output
      })
    }

    Model.prototype.getStepConfig = async function (stepName) {
      let cacheKey = Cache.key('Models.Webpage.getStepConfig', stepName, this)
      return await Cache.rememberWait(cacheKey, async () => {
        let config = await this.getConfig()
        let output
        if (typeof (config.readingProgressModules[stepName]) === 'object') {
          output = config.readingProgressModules[stepName]
        }
        //Cache.forever(cacheKey, output)
        return output
      })  // return await Cache.get(cacheKey, async () => {
    } // Model.prototype.getStepConfig = async function (stepName) {

  } // register (Model) {
}

module.exports = WebpageConfig
