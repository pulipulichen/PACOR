let CountdownTimer = {
  props: ['lib', 'config', 'status'
    , 'remainingSeconds', 'pauseAtStart', 'showLabel', 'isStatic'],
  data() {    
    this.$i18n.locale = this.config.locale
    
    let dataPause = (this.pauseAtStart || (this.isStatic === true && this.status.progress.countdownPause === true ))
    //console.log(dataPause, this.pauseAtStart, this.isStatic , this.status.progress.countdownPause)
    return {
      dataRemainingSec: this.remainingSeconds,
      dataPause: dataPause,
      timer: null
    }
  },
  computed: {
    dataRemainingTime () {
      //console.log(this.dataRemainingSec)
      let t = this.lib.DayJSHelper.formatHHMMSS(this.dataRemainingSec)
      //console.log(this.dataRemainingSec, t, typeof(t))
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
      if (this.dataPause === false) {
        this.dataRemainingSec = undefined
        this.start()
      }
      else {
        clearTimeout(this.timer)
      }
    },
    'status.progress.countdownPause' (countdownPause) {
      if (countdownPause === false) {
        this.dataPause = false
        this.dataRemainingSec = undefined
        this.start()
      }
      else {
        clearTimeout(this.timer)
      }
    }
  },
  mounted() {
    if (this.isStatic || this.pauseAtStart === true) {
      return false
    }
    this.start()
  },
  methods: {
    start: function () {
      if (!this.dataRemainingSec) {
        //this.dataRemainingSec = await this.lib.AxiosHelper.get('/client/ReadingProgress/getRemainingSeconds')
        //console.log(this.status.progress.countdownPause)
        //console.log(this.status.progress.countdownPause, this.pauseAtStart)
        if (this.status.progress.countdownPause === false) {
          this.dataRemainingSec = this.lib.auth.getRemainingSeconds()
//          if (this.dataRemainingSec === 0) {
//            throw new Error('dataRemainingSec is 0')
//          }
          //console.log('getRemainingSeconds', this.dataRemainingSec)
        }
        else {
          this.dataRemainingSec = this.lib.auth.getPausedRemainingSeconds()
          //console.log('getPausedRemainingSeconds', this.dataRemainingSec)
        }
      }
      
      //console.log(this.pauseAtStart)
      //console.log(this.isStatic, this.dataPause)
      if (this.dataPause === true || (this.isStatic === true && this.status.progress.countdownPause === true )) {
        //console.log(this.dataPause, this.isStatic, this.status.progress.countdownPause)
        return null
      }
      //else {
        //console.log(this.dataPause, this.isStatic, this.status.progress.countdownPause)
      //}
      
      this.timer = setTimeout(() => {
        if (this.dataPause === true || (this.isStatic === true && this.status.progress.countdownPause === true )) {
          //console.log(this.dataPause, this.isStatic, this.status.progress.countdownPause)
          return null
        }
        //else {
        //  console.log(this.dataPause, this.isStatic, this.status.progress.countdownPause)
        //}
        
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