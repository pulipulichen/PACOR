let acted = false
let lastTime
let checkActed = function () {
  if (acted === false) {
    acted = true
    let d = (new Date())
    lastTime = d.getTime() + (d.getTimezoneOffset() * 60 * 1000)
  }
}

let ActivityTimer = {
  props: ['config', 'lib', 'status'],
  data() {
    return {
      timer: null,
      lastTime: null,
      enable: true
    }
  },
  created() {
    let document = window.document
    document.addEventListener('mousemove', checkActed)
    document.addEventListener('keyup', checkActed)
    document.addEventListener('touchend', checkActed)
    
    this.timer = setTimeout(() => {
      this.send()
    }, this.seconds * 1000)
  },
  computed: {
    seconds () {
      if (this.timer) {
        return this.config.detectActivitySeconds
      }
      else {
        return 3
      }
    }
  },
  destroyed: async function () {
    clearInterval(this.timer)
    this.sendLastStep()
  },
  watch: {
    'status.status.progress.countdownPause': function (countdownPause) {
      this.enable = (countdownPause === false)
    }
  },
  methods: {
    toNow: function () {
      let currentMS = this.lib.DayJSHelepr.time()
      return Math.round((currentMS - lastTime) / 1000)
    },
    send: async function () {
      if (this.enable === false) {
        // 已經發生錯誤了，就不要再送出了
        return null
      }
      //this.lib.auth.logout()
      //return
      
      if (acted === true) {
        let seconds = this.toNow()
        if (seconds > 0) {
          await this.lib.AxiosHelper.get('/client/ReadingProgress/activityTimer', {
            seconds: this.toNow()
          }, (error) => {
            this.enable = false
            if (this.lib.TestManager.isTesting === true) {
              console.error('Get error from server: ' + error)
              return null
            }

            //console.error('Get error from server, force logout: ' + error)
            //this.lib.auth.logout()
          })
          
          acted = false
        }
        
        this.timer = setTimeout(() => {
          this.send()
        }, this.seconds * 1000)
      }
    },
    sendLastStep: async function () {
      let seconds = this.toNow()
      if (seconds === 0) {
        return false
      }
      
      if (acted === true) {
        await this.lib.AxiosHelper.get('/client/ReadingProgress/activityTimerLastStep', {
          seconds: seconds
        }, (error) => {
          this.enable = false
          if (this.lib.TestManager.isTesting === true) {
            console.error('Get error from server: ' + error)
            return null
          }
          
          //console.error('Get error from server, force logout: ' + error)
          //this.lib.auth.logout()
        })
        acted = false
      }
    }
  }
}

export default ActivityTimer