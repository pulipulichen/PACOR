'use strict'

class UserConfig {

  register(Model) {
    Model.prototype.getCurrentReadingProgressStepConfig = async function (webpage) {
      let stepName = await this.getCurrentReadingProgressStepName(webpage)
      return webpage.getStepConfig(stepName)
    }

    Model.prototype.getCurrentReadingProgressStepAnnotationTypes = async function (webpage) {
      let config = await this.getCurrentReadingProgressStepConfig(webpage)
      let types = config.annotation.types
      return types
    }
  } // register (Model) {
}

module.exports = UserConfig
