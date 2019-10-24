let Auth = {
  props: ['lib', 'status', 'config', 'progress', 'error'],
  data() {
    return {}
  },
  watch: {
    'status.needLogin': function () {
      if (this.status.needLogin === false) {
        let view = this.getCurrentStep()
        console.log(view)
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
      var result = await this.lib.AxiosHelper.get(`/client/user/check-login`)
      this.status.username = result
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
            return s.step_name
          }
          if (typeof (s.start_timestamp) === 'number'
                  && typeof (s.end_timestamp) !== 'number') {
            return s.step_name
          }
        }
        return this.status.readingProgressesFinish
      }
      return 'not-yet-started'
    },
    nextStep: function () {
      //throw 'nextStep'
      let time = (new Date()).getTime()
      for (let i = 0; i < this.status.readingProgresses.length; i++) {
        let s = this.status.readingProgresses[i]
        if (s.isCompleted === true) {
          continue
        }

        if (typeof(s.start_timestamp) !== 'number') {
          s.start_timestamp = time
          s.end_timestamp = time
          break
        }
        if (typeof(s.start_timestamp) === 'number' 
                && typeof(s.end_timestamp) !== 'number') {
          s.start_timestamp = time
          s.end_timestamp = time
          break;
        }
      }
      this.status.view = this.getCurrentStep()
    }
  } // methods
}

export default Auth