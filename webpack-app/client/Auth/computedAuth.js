export default function (Auth) {
    
  Auth.computed.currentStep = function () {
    if (this.isAdmin) {
      return 'FreeReading'
    }
    
    /**
     * 加上固定步驟的功能
     * @author Pulipuli Chen 20200224
     */
    //console.log(this.status.readingConfig.debug)
    if (typeof(this.status.readingConfig.debug.stayInReadingProgress) === 'string') {
      let stayIn = this.status.readingConfig.debug.stayInReadingProgress
      if (stayIn === 'FreeReading') {
        return stayIn
      }
      
      for (let i = 0; i < this.status.readingProgresses.length; i++) {
        let step = this.status.readingProgresses[i].step_name
        if (stayIn === step) {
          console.log('@TEST stayInReadingProgress: ' + stayIn)
          return stayIn
        }
      }
    }
    
    //console.log(JSON.stringify(this.status.readingProgresses, null, ' '))
    if (Array.isArray(this.status.readingProgresses)
            && this.status.readingProgresses.length > 0) {
      for (let i = 0; i < this.status.readingProgresses.length; i++) {
        let s = this.status.readingProgresses[i]
        if (s.isCompleted === true) {
          continue
        }

        if (typeof (s.start_timestamp) !== 'number') {
          s.start_timestamp = this.lib.DayJSHelper.time()
          return s.step_name
        }
        if (typeof (s.start_timestamp) === 'number'
                && typeof (s.end_timestamp) !== 'number') {
          return s.step_name
        }
      }
      let finishStep = this.status.readingConfig.readingProgressesFinish
      
      if (finishStep.startsWith('/') 
              || this.lib.ValidateHelper.isURL(finishStep)) {
        this._redirect(finishStep)
        return false
      }
      return finishStep
    }
    return 'not-yet-started'
  } // Auth.computed.currentStep = function () {
  
  Auth.computed.currentStepConfig = function () {
    if (typeof (this.currentStep) === 'string') {

      let config = this.status.readingConfig
      if (typeof (config) === 'object') {
        return config.readingProgressModules[this.currentStep]
      }
    }
    //console.log(modules)
    return null
  } // Auth.computed.currentStepConfig = function () {
    
  //Auth.computed.currentStepAnnotationConfig = function () {
  Auth.computed.stepHighlightAnnotationConfig = function () {
    let config = this.currentStepConfig
    if (config) {
      return config.highlightAnnotation
    }
    return null
  } // Auth.computed.stepHighlightAnnotationConfig = function () {
  
  Auth.computed.steps = function () {
    let steps = []
    for (let i = 0; i < this.status.readingProgresses.length; i++) {
      let step = this.status.readingProgresses[i].step_name
      steps.push(step)
    }
    return steps
  } // Auth.computed.stepHighlightAnnotationConfig = function () {
  
  Auth.computed.stepSectionAnnotationConfig = function () {
    let config = this.currentStepConfig
    if (config) {
      return config.sectionAnnotation
    }
    return null
  } // Auth.computed.stepHighlightAnnotationConfig = function () {
  
  Auth.computed.enableCollaboration = function () {
    let config = this.currentStepConfig
    if (config
            && config.permission) {
      return config.permission.collaboration
    }
    return false
  } // Auth.computed.enableCollaboration = function () {
  
  Auth.computed.isEnableCollaboration = function () {
    return this.enableCollaboration
  } // Auth.computed.isEnableCollaboration = function () {
  
  Auth.computed.hasCollaborationStep = function () {
    return (this.steps.indexOf('CollaborativeReading') > -1)
  } // Auth.computed.enableCollaboration = function () {
  
  Auth.computed.isEnableControlPermission = function () {
    let config = this.currentStepConfig
    if (config
            && config.permission) {
      return config.permission.control
    }
    return false
  } // Auth.computed.isEnableCollaboration = function () {
  
  Auth.computed.username = function () {
    if (this.status.displayName !== this.status.username) {
      return this.status.displayName
    } else {
      return this.status.username
    }
  }
  
  Auth.computed.defaultPremission = function () {
    if (this.currentStepConfig
            && this.currentStepConfig.permission
            && this.currentStepConfig.permission.defaultPermission) {
      return this.currentStepConfig.permission.defaultPermission
    }
    else {
      return 'public'
    }
  }
  
  Auth.computed.isAdmin = function () {
    let role = this.status.role
    
    return (role === 'domain_admin'
            || role === 'global_admin')
  }
  
//  Auth.computed.username = function () {
//    return this.getUsername(this.status)
//  }
  
  Auth.computed.annotationUserData = function () {
    return {
      display_name: this.status.displayName,
      username: this.status.username,
      id: this.status.userID,
      avatar_url: this.status.avatar,
      role: this.status.role
    }
  } // Auth.computed.annotationUserData = function () {
  
  Auth.computed.isCORS = function () {
    return (!location.href.startsWith(this.config.baseURL))
    //console.log(this.config.baseURL, location.href)
    //return true
  }
}