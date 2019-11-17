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
      let types = config.annotation.types
      return types
    }
    
    Model.prototype.isEnableCollaboration = async function (webpage) {
      let config = await this.getCurrentReadingProgressStepConfig(webpage)
      //console.log(config)
      return config.annotation.enableCollaboration
    }
  } // register (Model) {
}

module.exports = UserConfig
