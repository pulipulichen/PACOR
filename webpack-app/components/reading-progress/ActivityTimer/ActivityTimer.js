let acted = false
let lastTime
let checkActed = function () {
  if (acted === false) {
    acted = true
    lastTime = (new Date()).getTime()
  }
}

let ActivityTimer = {
  props: ['config', 'lib'],
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
      return this.config.detectActivitySeconds
    }
  },
  destroyed: async function () {
    clearInterval(this.timer)
    this.send()
  },
  methods: {
    toNow: function () {
      return Math.round(((new Date()).getTime() - lastTime) / 1000)
    },
    send: async function () {
      if (this.enable === false) {
        // 已經發生錯誤了，就不要再送出了
        return null
      }
      //this.lib.auth.logout()
      //return
      
      if (acted === true) {
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
        this.timer = setTimeout(() => {
          this.send()
        }, this.seconds * 1000)
      }
    }
  }
}

export default ActivityTimer