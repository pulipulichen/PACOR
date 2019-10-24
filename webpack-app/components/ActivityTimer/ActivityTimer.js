let acted = false
let checkActed = function () {
  acted = true
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
    this.lastTime = this.getCurrentTime()
    
    let document = window.document
    document.addEventListener('mousemove', checkActed)
    document.addEventListener('keypress', checkActed)
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
    getCurrentTime: function () {
      return (new Date()).getTime()
    },
    toNow: function () {
      return Math.round((this.getCurrentTime() - this.lastTime) / 1000)
    },
    send: async function () {
      if (acted === true) {
        await this.lib.AxiosHelper.get('/client/ReadingProgress/activityTimer', {
          seconds: this.toNow()
        })
        acted = false
      }
      this.lastTime = this.getCurrentTime()
    }
  }
}

export default ActivityTimer