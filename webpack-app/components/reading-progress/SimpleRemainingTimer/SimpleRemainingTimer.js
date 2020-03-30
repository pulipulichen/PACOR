let CountdownTimer = {
  props: ['lib', 'config'
    , 'remainingSeconds', 'pauseAtStart'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      dataRemainingSec: this.remainingSeconds,
      dataPause: this.pauseAtStart
    }
  },
  computed: {
    dataRemainingTime () {
      let t = this.lib.DayJSHelper.formatHHMMSS(this.dataRemainingSec)
      
      if (t === -1) {
        t = '00:00'
      }
      else if (this.dataRemainingSec < 10) {
        t = '00:0' + t
      }
      else if (this.dataRemainingSec < 60) {
        t = '00:' + t
      }
      
      return t
    }
  },
  watch: {
    remainingSeconds (remainingSec) {
      this.dataRemainingSec = remainingSec
    },
    pauseAtStart (pause) {
      this.dataPause = pause
    }
  },
  mounted() {
    this.start()
  },
  methods: {
    start: function () {
      if (!this.dataRemainingSec) {
        //this.dataRemainingSec = await this.lib.AxiosHelper.get('/client/ReadingProgress/getRemainingSeconds')
        this.dataRemainingSec = this.lib.auth.getRemainingSeconds()
      }
      
      //console.log(this.pauseAtStart)
      if (this.dataPause === true) {
        return null
      }
      setTimeout(() => {
        this.dataRemainingSec--
        
        if (this.dataRemainingSec > 0) {
          this.start()
        }
        else {
          this.timeup()
        }
      }, 1000)
    },
    timeup () {
      //console.log('timeup')
      this.$emit('timeup')
      
      // 在結束之後，切換一個隨機的數字
      setTimeout(() => {
        this.dataRemainingSec = 10 + Math.floor(Math.random() * 150)
      }, 1000)
    },
    pause () {
      this.dataPause = true
    },
    resume () {
      this.dataPause = false
      this.start()
    }
  } // methods
}

export default CountdownTimer