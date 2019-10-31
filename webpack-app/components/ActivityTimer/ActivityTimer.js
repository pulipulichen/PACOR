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
      lastTime: null
    }
  },
  created() {
    let document = window.document
    document.addEventListener('mousemove', checkActed)
    document.addEventListener('keyup', checkActed)
    document.addEventListener('touchend', checkActed)
    
    let seconds = this.config.detectActivitySeconds
    this.timer = setInterval(async () => {
      this.send()
    }, seconds * 1000)
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
      if (acted === true) {
        await this.lib.AxiosHelper.get('/client/ReadingProgress/activityTimer', {
          seconds: this.toNow()
        }, (error) => {
          console.error(error)
          this.lib.auth.logout()
        })
        acted = false
      }
    }
  }
}

export default ActivityTimer