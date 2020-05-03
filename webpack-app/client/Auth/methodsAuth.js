export default function (Auth) {
  Auth.methods.init = async function () {
    if (typeof (this.config.username) !== 'string'
            && typeof (this.config.usernameQueryURL) === 'string') {
      this.config.username = await this.loadUsernameFromURL()
    }

    let result = false
    if (typeof (this.config.username) === 'string') {
      result = await this.attemptLoginViaUsername(this.config.username)
    }

    if (result === false) {
      await this.checkLogin()
    }
  }
    
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
    //console.log(result)
    
    for (let name in result.status) {
      //console.log(name)
      this.status[name] = result.status[name]
    }
    //return

    //console.log(result)
    //console.log(result.needLogin)
    console.log(this.status.readingProgresses)
    
    if (result.needLogin === false) {
      this.status.needLogin = false
    } else {
      //console.log('Prepare this.showLogin()')
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
    this.clearLocalStorage()
    return this.showLogin()
  }
  Auth.methods.logoutWithoutForget = async function () {
    await this.lib.AxiosHelper.get('/client/auth/logout')
    this.reload()
    return true
  }
  Auth.methods.logoutAndReload = async function () {
    await this.lib.AxiosHelper.get('/client/auth/logout')
    this.clearLocalStorage()
    this.reload()
    return true
  }
  
  Auth.methods.clearLocalStorage = async function () {
    localStorage.removeItem('PACOR.client.components.Login.login.username')
    localStorage.removeItem('PostRecall.' + this.status.userID + '.log')
    localStorage.removeItem('PostRecallKeyword.' + this.status.userID + '.log')
    localStorage.removeItem('PreImaginary.' + this.status.userID + '.log')
    localStorage.removeItem('PreImaginaryKeyword.' + this.status.userID + '.log')
    
    localStorage.clear()
  }
  
  Auth.methods.showLogin = function () {
    //if (this.status.needLogin === true) {
    //  return undefined
    //}
    
    //console.log('@LOG showLogin')
    //return
    this.status.view = 'Login'
//    return
//    this.status.needLogin = true
  }
  Auth.methods.nextStep = async function (sendEnd) {
    if (typeof(this.status.readingConfig.debug.stayInReadingProgress) === 'string') {
      console.log(`Stay in ${this.status.readingConfig.debug.stayInReadingProgress} for debug.`)
      return false
    }
    
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
    console.log(this.status.readingProgresses)
    
    //this.$forceUpdate()

    //setTimeout(() => {
      //console.log([this.currentStep, this.getCurrentStep()])
      //console.log(this.status.readingProgresses)
      
      this.lib.style.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
      
      this.status.view = this.currentStep
    //}, 0)
    
  }
  
  Auth.methods.backToFirstStep = async function () {
    await this.lib.AxiosHelper.get('/client/ReadingProgress/backToFirstStep')
    this.clearLocalStorage()
    this.reload()
    return false
  }
  
  Auth.methods.reload = function () {
    this.forceExit = true
    setTimeout(() => {
      location.reload()
    }, 0)
  }
  
  Auth.methods.backToPreviousStep = async function () {
    await this.lib.AxiosHelper.get('/client/ReadingProgress/backToPreviousStep')
    this.clearLocalStorage()
    this.reload()
    return false
  }
  
  Auth.methods.getHighlightAnnotationType = function (annotation) {
    let type = annotation.type
    if (annotation.user_id === this.status.userID) {
      type = 'my-' + type
    } else {
      type = 'others-' + type
    }
    return type
  }
  
  Auth.methods.getAnnotationTypeModulesConfig = function (type) {
    return this.status.readingConfig.annotationTypeModules[type]
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
  
  Auth.methods.getRemainingSeconds = function () {
    if (!this.status 
            || Array.isArray(this.status.readingProgresses) === false) {
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
    
    let d = (new Date())
    let currentMS = d.getTime() + (d.getTimezoneOffset() * 1000)
    
    let remaining_ms = limit_ms - ( currentMS -  start_timestamp)
    if (remaining_ms < 0) {
      return 0
    }
    
    remaining_ms = Math.ceil(remaining_ms / 1000)
    //console.log(remaining_ms)
    return remaining_ms
  }
  
  Auth.methods.getPausedRemainingSeconds = function () {
    if (!this.status 
            || Array.isArray(this.status.readingProgresses) === false) {
      return 0
    }
    
    let start_timestamp
    let last_start_timestamp
    let last_end_timestamp
    for (let i = 0; i < this.status.readingProgresses.length; i++) {
      let s = this.status.readingProgresses[i]
      if (s.step_name === 'IndividualReading') {
        start_timestamp = s.start_timestamp
        last_end_timestamp = s.end_timestamp
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
    
    if (!last_end_timestamp) {
      return limit_ms
    }
    
    let remaining_ms = limit_ms - ( last_end_timestamp - start_timestamp)
    //console.log(remaining_ms, limit_ms, last_end_timestamp, start_timestamp, ( last_end_timestamp - start_timestamp), this.status.readingProgresses)
    if (remaining_ms < 0) {
      return 0
    }
    
    remaining_ms = Math.ceil(remaining_ms / 1000)
    //console.log(remaining_ms, limit_ms, this.status.readingProgresses)
    return remaining_ms
  }
  
  Auth.methods.resetRemainingSeconds = async function () {
    // 先給伺服器設定重置時間，回傳整個流程的重置時間
    this.status.readingProgresses = await await this.lib.AxiosHelper.get('/client/ReadingProgress/resetRemainingSeconds')
    return this.getRemainingSeconds()
  }
  
  Auth.methods.filterURL = function (url) {
//    console.log(url, this.lib.ValidateHelper.isURL(url))
//    if (this.lib.ValidateHelper.isURL(url) === false) {
//      return url
//    }
    
    let replacePairs = [
      {
        key: 'username',
        value: encodeURIComponent(this.status.username)
      },
      {
        key: 'id',
        value: this.status.userID
      },
      {
        key: 'user_id',
        value: this.status.userID
      },
      {
        key: 'display_name',
        value: encodeURIComponent(this.status.displayName)
      },
      {
        key: 'referrer',
        value: location.href
      },
    ]
    
    replacePairs.forEach(({key, value}) => {
      if (url.indexOf('{' + key + '}') > -1) {
        url = url.split('{' + key + '}').join(value)
      }
    })
    //console.log(url, replacePairs)
    return url
  }
}