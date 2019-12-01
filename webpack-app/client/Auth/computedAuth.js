export default function (Auth) {
  Auth.computed.currentStep = function () {
    if (this.isAdmin) {
      return 'FreeReading'
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
      if (this.lib.ValidateHelper.isURL(finishStep)) {
        this._redirect(finishStep)
        return false
      }
      return finishStep
    }
    return 'not-yet-started'
  }
  Auth.computed.currentStepConfig = function () {
    if (typeof (this.currentStep) === 'string') {

      let config = this.status.readingConfig
      if (typeof (config) === 'object') {
        return config.readingProgressModules[this.currentStep]
      }
    }
    //console.log(modules)
    return null
  }
  Auth.computed.currentStepAnnotationConfig = function () {
    let config = this.currentStepConfig
    if (config) {
      return config.annotation
    }
    return null
  }
  Auth.computed.enableCollaboration = function () {
    let config = this.currentStepAnnotationConfig
    if (config) {
      return config.enableCollaboration
    }
    return false
  }
  Auth.computed.isEnableCollaboration = function () {
    return this.enableCollaboration
  }
  
  Auth.computed.username = function () {
    if (this.status.displayName !== this.status.username) {
      return this.status.displayName
    } else {
      return this.status.username
    }
  }
  
  Auth.computed.defaultPremission = function () {
    return this.currentStepAnnotationConfig.defaultPermission
  }
  
  Auth.computed.isAdmin = function () {
    let role = this.status.role
    
    return (role === 'domain_admin'
            || role === 'global_admin')
  }
  
  Auth.computed.username = function () {
    return this.getUsername(this.status)
  }
  
  Auth.computed.annotationUserData = function () {
    return {
      display_name: this.status.displayName,
      username: this.status.username,
      id: this.status.userID,
      avatar_url: this.status.avatar,
      role: this.status.role
    }
  }
}