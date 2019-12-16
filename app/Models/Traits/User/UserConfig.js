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
    
    Model.prototype.getStepAnnotationTypes = async function (webpage) {
      let config = await this.getCurrentReadingProgressStepConfig(webpage)
      if (!config || !config.annotation) {
        //throw new Error('config is undefined')
        let stepName = await this.getCurrentReadingProgressStepName(webpage)
        if (stepName !== 'PostRecall') {
          console.error('config is error: ' + stepName)
        }
        return []
      }
      let types = config.highlightAnnotation.types
      return types
    }

    //Model.prototype.getCurrentReadingProgressStepAnnotationTypes = async function (webpage) {
    Model.prototype.getStepHighlightAnnotationTypes = async function (webpage) {
      let config = await this.getCurrentReadingProgressStepConfig(webpage)
      if (!config || !config.annotation) {
        //throw new Error('config is undefined')
        let stepName = await this.getCurrentReadingProgressStepName(webpage)
        if (stepName !== 'PostRecall') {
          console.error('config is error: ' + stepName)
        }
        return []
      }
      let types = config.highlightAnnotation.types
      return types
    }
    
    Model.prototype.getStepSectionAnnotationTypes = async function (webpage) {
      let config = await this.getCurrentReadingProgressStepConfig(webpage)
      if (!config || !config.annotation) {
        //throw new Error('config is undefined')
        let stepName = await this.getCurrentReadingProgressStepName(webpage)
        if (stepName !== 'PostRecall') {
          console.error('config is error: ' + stepName)
        }
        return []
      }
      let types = config.sectionAnnotation.types
      return types
    }
    
    Model.prototype.isEnableCollaboration = async function (webpage) {
      let config = await this.getCurrentReadingProgressStepConfig(webpage)
      //console.log(config)
      if (!config 
              || !config.permission 
              || typeof(config.permission.collaboration) !== 'boolean') {
        return false
      }
      return config.permission.collaboration
    }
    
    Model.prototype.isAdmin = function () {
      return (this.role === 'domain_admin' || this.role === 'global_admin')
    }
    
  } // register (Model) {
  
  
}

module.exports = UserConfig
