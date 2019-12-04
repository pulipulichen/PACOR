'use strict'

class UserConfig {

  register(Model) {
    
    Model.prototype.getCurrentReadingProgressStepConfig = async function (webpage) {
      let stepName = await this.getCurrentReadingProgressStepName(webpage)
      //console.log(stepName)
      return webpage.getStepConfig(stepName)
    }

    Model.prototype.getCurrentReadingProgressStepAnnotationTypes = async function (webpage) {
      let config = await this.getCurrentReadingProgressStepConfig(webpage)
      if (!config) {
        throw new Error('config is undefined')
      }
      let types = config.annotation.types
      return types
    }
    
    Model.prototype.isEnableCollaboration = async function (webpage) {
      let config = await this.getCurrentReadingProgressStepConfig(webpage)
      //console.log(config)
      if (!config || !config.annotation) {
        return false
      }
      return config.annotation.enableCollaboration
    }
  } // register (Model) {
}

module.exports = UserConfig
