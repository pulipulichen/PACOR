'use strict'

const Profiler = use('Profiler')

class UserConfig {

  register(Model) {
    
    Model.prototype.getCurrentReadingProgressStepConfig = async function (webpage) {
      let profiler = new Profiler(0, 'User/UserConfig.getCurrentReadingProgressStepConfig()')
      
      let stepName = await this.getCurrentReadingProgressStepName(webpage)
      if (stepName === true) {
        //console.trace('user.getCurrentReadingProgressStepConfig()')
        //throw new Error('Step name is null')
        //profiler.finish()
        //return true
        stepName = 'FreeReading'
      }
      
      profiler.after('stepName', stepName)
      
      //console.log(stepName)
      let config = webpage.getStepConfig(stepName)
      profiler.finish()
      
      return config
    }
    
    //Model.prototype.getCurrentReadingProgressStepAnnotationConfig = async function (webpage) {
    Model.prototype.getStepSectionAnnotationConfig = async function (webpage) {
      let config = await this.getCurrentReadingProgressStepConfig(webpage)
      if (!config || !config.sectionAnnotation) {
        //throw new Error('config is undefined')
        let stepName = await this.getCurrentReadingProgressStepName(webpage)
        if (stepName !== 'PostRecall') {
          console.error('[User.getStepSectionAnnotationConfig()] config is error: ' + stepName)
        }
        return undefined
      }
      return config.sectionAnnotation
    }
    
    Model.prototype.getStepHighlightAnnotationConfig = async function (webpage) {
      let config = await this.getCurrentReadingProgressStepConfig(webpage)
      if (!config || !config.highlightAnnotation) {
        //throw new Error('config is undefined')
        let stepName = await this.getCurrentReadingProgressStepName(webpage)
        if (stepName === true) {
          return undefined
        }
        else if (stepName !== 'PostRecall') {
          console.error('getStepHighlightAnnotationConfig config is error: ' + stepName)
        }
        return undefined
      }
      return config.highlightAnnotation
    }
    
    Model.prototype.getStepAnnotationTypes = async function (webpage) {
      let config = await this.getCurrentReadingProgressStepConfig(webpage)
      if (!config || !config.highlightAnnotation
              || !config.sectionAnnotation) {
        //throw new Error('config is undefined')
        let stepName = await this.getCurrentReadingProgressStepName(webpage)
        
        if (stepName === true 
                || stepName !== 'PostRecall') {
          console.error('[User.getStepAnnotationTypes()] config is error: ' + stepName)
        }
        return []
      }
      let highlightTypes = config.highlightAnnotation.types
      let sectionTypes = config.sectionAnnotation.types
      return highlightTypes.concat(sectionTypes)
    }

    //Model.prototype.getCurrentReadingProgressStepAnnotationTypes = async function (webpage) {
    Model.prototype.getStepHighlightAnnotationTypes = async function (webpage) {
      let config = await this.getCurrentReadingProgressStepConfig(webpage)
      if (!config || !config.highlightAnnotation) {
        //throw new Error('config is undefined')
        let stepName = await this.getCurrentReadingProgressStepName(webpage)
        if (stepName === true) {
          return []
        }
        else if (stepName !== 'PostRecall') {
          console.error('[User.getStepHighlightAnnotationTypes()] config is error: ' + stepName)
        }
        return []
      }
      let types = config.highlightAnnotation.types
      return types
    }
    
    Model.prototype.getStepSectionAnnotationTypes = async function (webpage) {
      let config = await this.getCurrentReadingProgressStepConfig(webpage)
      if (!config || !config.sectionAnnotation) {
        //throw new Error('config is undefined')
        let stepName = await this.getCurrentReadingProgressStepName(webpage)
        if (stepName === true) {
          return []
        }
        else if (stepName !== 'PostRecall') {
          console.error('[User.getStepSectionAnnotationTypes()] config is error: ' + stepName)
        }
        return []
      }
      let types = config.sectionAnnotation.types
      return types
    }
    
    Model.prototype.isEnableCollaboration = async function (webpage) {
      let config = await this.getCurrentReadingProgressStepConfig(webpage)
      if (config === true) {
        return true
      }
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
