export default function (Auth) {
  Auth.methods.loadUsernameFromURL = async function () {
    let result = await this.lib.AxiosHelper.getOther(this.config.usernameQueryURL)
    if (typeof (result) === 'string') {
      return result
    }
  }
  Auth.methods.attemptLoginViaUsername = async function (username) {
    var result = await this.lib.AxiosHelper.get(`/client/user/attempt-login-via-username`, {
      username: username
    })
    if (typeof (result) === 'string') {
      this.status.username = result
      return true
    } else {
      return false
    }
  }
  Auth.methods.checkLogin = async function () {
    var result = await this.lib.AxiosHelper.get(`/client/auth/checkLogin`)
    //console.log(result.preferenceAAA)
//      if (typeof(result) === 'object') {
//        for (let name in result) {
//          this.status[name] = result[name]
//        }
//        this.status.needLogin = false
//      }
//      else {
//        this.showLogin()
//      }
    //console.log(result)
    for (let name in result.status) {
//console.log(name)
      this.status[name] = result.status[name]
    }

    if (result.needLogin === false) {
      this.status.needLogin = false
    } else {
      this.showLogin()
    }
//this.status.username = result
  }
//  Auth.methods.getCurrentStep = function () {
//    //console.log(JSON.stringify(this.status.readingProgresses, null, ' '))
//    if (Array.isArray(this.status.readingProgresses)
//            && this.status.readingProgresses.length > 0) {
//      for (let i = 0; i < this.status.readingProgresses.length; i++) {
//        let s = this.status.readingProgresses[i]
//        if (s.isCompleted === true) {
//          continue
//        }
//
//        if (typeof (s.start_timestamp) !== 'number') {
//          s.start_timestamp = this.lib.DayJSHelper.time()
//          return s.step_name
//        }
//        if (typeof (s.start_timestamp) === 'number'
//                && typeof (s.end_timestamp) !== 'number') {
//          return s.step_name
//        }
//      }
//      let finishStep = this.status.readingConfig.readingProgressesFinish
//      if (this.lib.ValidateHelper.isURL(finishStep)) {
//        this._redirect(finishStep)
//        return false
//      }
//      return finishStep
//    }
//    return 'not-yet-started'
//  }

  Auth.methods._redirect = async function (url) {
//await this.lib.AxiosHelper.get('/client/auth/logout')
//return
    location.href = url
  }
  Auth.methods.logout = async function () {
    await this.lib.AxiosHelper.get('/client/auth/logout')
    localStorage.removeItem('PACOR.client.components.Login.login.username')
    return this.showLogin()
  }
  Auth.methods.showLogin = function () {
    this.status.needLogin = true
    this.status.view = 'Login'
  }
  Auth.methods.nextStep = async function (sendEnd) {
    //throw 'nextStep'
    if (sendEnd !== false) {
      await this.lib.AxiosHelper.get('/client/ReadingProgress/end')
    }

    let time = this.lib.DayJSHelper.time()
    for (let i = 0; i < this.status.readingProgresses.length; i++) {
      let s = this.status.readingProgresses[i]
      if (s.isCompleted === true) {
        continue
      }

      if (typeof (s.start_timestamp) === 'number'
              && typeof (s.end_timestamp) !== 'number') {
        this.status.readingProgresses[i].end_timestamp = time
        break
      }
    }
    
    this.status.readingProgresses = this.status.readingProgresses.slice(0, this.status.readingProgresses.length)
    
    //this.$forceUpdate()

    //setTimeout(() => {
      //console.log([this.currentStep, this.getCurrentStep()])
      //console.log(this.status.readingProgresses)
      this.status.view = this.currentStep
    //}, 0)
    
  }
  Auth.methodsgetHighlightAnnotationType = function (annotation) {
    let type = annotation.type
    if (annotation.user_id === this.status.userID) {
      type = 'my-' + type
    } else {
      type = 'others-' + type
    }
    return type
  }
  Auth.methods.isEditable = function (instance) {
    if (!instance || typeof (instance.id) !== 'number') {
      return true
    }

    if (['domain_admin', 'global_admin'].indexOf(this.status.role) > -1) {
      return true
    }

    return (instance.user_id === this.status.userID)
  }
  
  Auth.methods.getUsername = function (user) {
    if (user.displayName) {
      return user.displayName
    }
    else if (user.display_name) {
      return user.display_name
    }
    else {
      return user.username
    }
  }
  
  Auth.method.getRemainingSeconds = function () {
    if (Array.isArray(this.status.readingProgresses) === false) {
      return 0
    }
    
    let start_timestamp
    for (let i = 0; i < this.status.readingProgresses.length; i++) {
      let s = this.status.readingProgresses[i]
      if (s.step_name === 'IndividualReading') {
        start_timestamp = s.start_timestamp
        break
      }
    }
    
    if (!start_timestamp) {
      return 0
    }
    
    let config = this.status.readingConfig
    let limit_minutes
    if (this.currentStep === 'IndividualReading') {
      limit_minutes = config.readingProgressModules.IndividualReading.limitMinutes
    }
    else if (this.currentStep === 'CollaborativeReading') {
      limit_minutes = config.readingProgressModules.reading.totalLimitMinutes
    }
    
    if (!limit_minutes) {
      return 0
    }
    
    let limit_ms = limit_minutes * 60 * 1000
    let remaining_ms = limit_ms - ( (new Date()).getTime() -  start_timestamp)
    if (remaining_ms < 0) {
      return 0
    }
    return Math.ceil(remaining_ms / 1000)
  }
}