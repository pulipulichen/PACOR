let acted = false
let firstTime
let lastTime
let checkActed = function () {
  //if (acted === false) {
    acted = true
    
    let d = (new Date())
    let currentTime = d.getTime() + (d.getTimezoneOffset() * 60 * 1000)
    if (!firstTime) {
      firstTime = currentTime
    }
    lastTime = currentTime
  //}
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
      if (!firstTime) {
        return 0
      }
      /*
      let currentMS
      if (this.lib.DayJSHelper) {
        currentMS = this.lib.DayJSHelper.time()
      }
      else {
        let d = (new Date())
        currentMS =  d.getTime() + (d.getTimezoneOffset() * 60 * 1000)
      }
      */
      //console.log(lastTime, firstTime)
      let toNow = Math.ceil((lastTime - firstTime) / 1000)
      firstTime = null
      lastTime = null
      return toNow
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
      
      if (seconds > this.seconds) {
        seconds = this.seconds
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