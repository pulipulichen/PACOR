'use strict'

const Profiler = use('Profiler')

class UserConfig {

  register(Model) {
    
    Model.prototype.getCurrentReadingProgressStepConfig = async function (webpage) {
      let profiler = new Profiler(0, 'User/UserConfig.getCurrentReadingProgressStepConfig()')
      
      let stepName = await this.getCurrentReadingProgressStepName(webpage)
      profiler.after('stepName', stepName)
      
      //console.log(stepName)
      let config = webpage.getStepConfig(stepName)
      profiler.finish()
      
      return config
    }
    
    Model.prototype.getCurrentReadingProgressStepAnnotationConfig = async function (webpage) {
      let config = await this.getCurrentReadingProgressStepConfig(webpage)
      if (!config || !config.annotation) {
        //throw new Error('config is undefined')
        let stepName = await this.getCurrentReadingProgressStepName(webpage)
        if (stepName !== 'PostRecall') {
          console.error('config is error: ' + stepName)
        }
        return undefined
      }
      return config.annotation
    }

    Model.prototype.getCurrentReadingProgressStepAnnotationTypes = async function (webpage) {
      let config = await this.getCurrentReadingProgressStepConfig(webpage)
      if (!config || !config.annotation) {
        //throw new Error('config is undefined')
        let stepName = await this.getCurrentReadingProgressStepName(webpage)
        if (stepName !== 'PostRecall') {
          console.error('config is error: ' + stepName)
        }
        return []
      }
      let types = config.annotation.types
      return types
    }
    
    Model.prototype.isEnableCollaboration = async function (webpage) {
      let config = await this.getCurrentReadingProgressStepConfig(webpage)
      //console.log(config)
      if (!config 
              || !config.annotation 
              || typeof(config.annotation.enableCollaboration) !== 'boolean') {
        return false
      }
      return config.annotation.enableCollaboration
    }
  } // register (Model) {
}

module.exports = UserConfig
