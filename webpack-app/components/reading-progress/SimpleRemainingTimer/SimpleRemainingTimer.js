let CountdownTimer = {
  props: ['lib', 'config', 'status'
    , 'remainingSeconds', 'pauseAtStart', 'showLabel', 'isStatic'],
  data() {    
    this.$i18n.locale = this.config.locale
    
    let dataPause = (this.pauseAtStart || (this.isStatic === true && this.status.progress.countdownPause === true ))
    //console.log(dataPause, this.pauseAtStart, this.isStatic , this.status.progress.countdownPause)
    return {
      dataRemainingSec: this.remainingSeconds,
      dataPause: dataPause
    }
  },
  computed: {
    dataRemainingTime () {
      //console.log(this.dataRemainingSec)
      let t = this.lib.DayJSHelper.formatHHMMSS(this.dataRemainingSec)
      //console.log(t, typeof(t))
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
    },
    dataMinutes () {
      return this.remainingSeconds / 60
    }
  },
  watch: {
    remainingSeconds (remainingSec) {
      this.dataRemainingSec = remainingSec
    },
    pauseAtStart (pause) {
      this.dataPause = pause
    },
    'status.progress.countdownPause' (countdownPause) {
      if (countdownPause === false) {
        this.dataPause = false
      }
    }
  },
  mounted() {
    if (this.isStatic) {
      return false
    }
    this.start()
  },
  methods: {
    start: function () {
      if (!this.dataRemainingSec) {
        //this.dataRemainingSec = await this.lib.AxiosHelper.get('/client/ReadingProgress/getRemainingSeconds')
        this.dataRemainingSec = this.lib.auth.getRemainingSeconds()
      }
      
      //console.log(this.pauseAtStart)
      //console.log(this.isStatic, this.dataPause)
      if (this.dataPause === true || (this.isStatic === true && this.status.progress.countdownPause === true )) {
        console.log(this.dataPause, this.isStatic, this.status.progress.countdownPause)
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
      //console.log('準備隨機切換數字')
      setTimeout(() => {
        this.dataRemainingSec = 10 + Math.floor(Math.random() * 150)
        //console.log(this.dataRemainingSec)
      }, 3000)
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