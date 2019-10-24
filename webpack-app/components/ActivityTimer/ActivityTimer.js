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
    
    let seconds = this.config.detectActivitySeconds
    this.timer = setInterval(async () => {
      await this.lib.AxiosHelper.get('/client/ReadingProgress/activityTimer', {
        seconds: this.toNow()
      })
      this.lastTime = this.getCurrentTime()
    }, seconds * 1000)
  },
  destroyed: async function () {
    clearInterval(this.timer)
    
    await this.lib.AxiosHelper.get('/client/ReadingProgress/activityTimer', {
      seconds: this.toNow()
    })
  },
  methods: {
    getCurrentTime: function () {
      return (new Date()).getTime()
    },
    toNow: function () {
      return Math.round((this.getCurrentTime() - this.lastTime) / 1000)
    }
  }
}

export default ActivityTimer