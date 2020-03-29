import $ from 'jquery'

let debugDisable = false
if (debugDisable === true) {
  console.log('@test degubDisable')
}

let DigitalCountdownTimer = {
  props: ['lib', 'config'
    , 'remainingSeconds', 'pauseAtStart'],
  data() {
    //console.log(this.remainingSeconds)
    this.$i18n.locale = this.config.locale
    let dataRemainingSec = 0
    if (this.remainingSeconds) {
      dataRemainingSec = this.remainingSeconds
    }
    
    return {
      dataRemainingSec: dataRemainingSec,
      dataPause: this.pauseAtStart,
      timerEle: null,
      isEnableGlow: false
    }
  },
  computed: {
    dataRemainingTime () {
      return this.lib.DayJSHelper.formatHHMMSS(this.dataRemainingSec)
    },
    dataMinutes () {
      if (this.dataRemainingSec < 60) {
        return null
      }
      let minutes = Math.floor(this.dataRemainingSec / 60)
      if (minutes > 99) {
        minutes = 99
      }
      return minutes
    },
    dataSeconds () {
      let sec = this.dataRemainingSec % 60
      if (this.dataRemainingSec > 10 && sec < 10) {
        sec = '0' + sec
      }
      else {
        sec = '' + sec
      }
      return sec
    },
    computedMinutesClassList () {
      let classList = []
      if (this.dataMinutes === null) {
        classList.push('hidden')
      }
      else if (this.dataMinutes >= 10) {
        classList.push('two')
      }
      
      if (this.isEnableGlow) {
        classList.push('glow')
      }
      
      return classList.join(' ')
    },
    computedSecondsClassList () {
      let classList = []
      
      if (this.dataSeconds.length === 2) {
        classList.push('two')
      }
      
      if (this.isEnableGlow) {
        classList.push('glow')
      }
      
      return classList.join(' ')
    },
//    isEnableGlow () {
//      return (this.dataRemainingSec === 60
//              || this.dataRemainingSec === 30
//              || this.dataRemainingSec <= 10)
//    },
    computedMinutesColonClassList () {
      if (this.dataMinutes === null) {
        return 'colon-hidden'
      }
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
    if (!this.timerEle) {
      this.timerEle = $(this.$refs.timer).find('.minutes,.seconds')
    }
    
    this.start()
  },
  methods: {
    start: function () {
      
      if (!this.dataRemainingSec) {
        //this.dataRemainingSec = await this.lib.AxiosHelper.get('/client/ReadingProgress/getRemainingSeconds')
        this.dataRemainingSec = this.lib.auth.getRemainingSeconds()
      }
      
      if ((this.dataRemainingSec === 60
              || this.dataRemainingSec === 30
              || this.dataRemainingSec <= 10)) {
        this.isEnableGlow = true
        setTimeout(() => {
          this.isEnableGlow = false
        }, 700)
      }
      
      if (debugDisable === true) {
        return null
      }
      
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
      this.$emit('timeup')
      
      // 在結束之後，切換一個隨機的數字
      setTimeout(() => {
        this.dataRemainingSec = 10 + Math.floor(Math.random() * 150)
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

export default DigitalCountdownTimer