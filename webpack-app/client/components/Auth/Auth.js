let Auth = {
  props: ['lib', 'status', 'config', 'progress', 'error'],
  data() {
    return {}
  },
  watch: {
    'status.needLogin': async function () {
      if (this.status.needLogin === false) {
        let view = this.currentStep
        if (this.lib.ValidateHelper.isURL(view)) {
          return await this._redirect(view)
        }
        //console.log(view)
        this.status.view = view
      }
    }
  },
  mounted: async function () {
    if (typeof(this.config.username) !== 'string' 
            && typeof(this.config.usernameQueryURL) === 'string') {
      this.config.username = await this.loadUsernameFromURL()
    }
    
    let result = false
    if (typeof(this.config.username) === 'string') {
      result = await this.attemptLoginViaUsername(this.config.username)
    }
    
    if (result === false) {
      await this.checkLogin()
    }
  },
  computed: {
    currentStep () {
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
    },
    currentStepConfig () {
      if (typeof(this.currentStep) === 'string') {
        
        let config = this.status.readingConfig
        if (typeof(config) === 'object') {
          return config.readingProgressModules[this.currentStep]
        }
      }
      //console.log(modules)
      return null
    },
    currentStepAnnotationConfig () {
      let config = this.currentStepConfig
      if (config !== null) {
        return config.annotation
      }
      return null
    },
    enableCollaboration () {
      let config = this.currentStepAnnotationConfig
      if (config !== null) {
        return config.enableCollaboration
      }
      return false
    },
    username () {
      if (this.status.displayName !== this.status.username) {
        return this.status.displayName
      }
      else {
        return this.status.username
      }
    }
  },
  methods: {
    loadUsernameFromURL: async function () {
      let result = await this.lib.AxiosHelper.getOther(this.config.usernameQueryURL)
      if (typeof(result) === 'string') {
        return result
      }
    },
    attemptLoginViaUsername: async function (username) {
      var result = await this.lib.AxiosHelper.get(`/client/user/attempt-login-via-username`, {
        username: username
      })
      if (typeof(result) === 'string') {
        this.status.username = result
        return true
      }
      else {
        return false
      }
    },
    checkLogin: async function () {
      var result = await this.lib.AxiosHelper.get(`/client/auth/checkLogin`)
      //console.log(result.preferenceAAA)
      if (typeof(result) === 'object') {
        for (let name in result) {
          this.status[name] = result[name]
        }
        this.status.needLogin = false
      }
      else {
        this.showLogin()
      }
      //this.status.username = result
    },
    getCurrentStep: function () {
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
    },
    _redirect: async function (url) {
      //await this.lib.AxiosHelper.get('/client/auth/logout')
      //return
      location.href = url
    },
    logout: function () {
      return this.showLogin()
    },
    showLogin: function () {
      this.status.needLogin = true
      this.status.view = 'Login'
    },
    nextStep: async function (sendEnd) {
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

        if (typeof(s.start_timestamp) === 'number' 
                && typeof(s.end_timestamp) !== 'number') {
          s.end_timestamp = time
          break;
        }
      }
      this.status.view = this.currentStep
    },
    getHighlightAnnotationType (annotation) {
      let type = annotation.type
      if (annotation.user_id === this.status.userID) {
        type = 'my-' + type
      }
      else {
        type = 'others-' + type
      }
      return type
    },
    isEditable (instance) {
      if (['domain_admin', 'global_admin'].indexOf(this.status.role) > -1) {
        return true
      }
      
      return (instance.user_id === this.status.userID)
    }
  } // methods
}

export default Auth