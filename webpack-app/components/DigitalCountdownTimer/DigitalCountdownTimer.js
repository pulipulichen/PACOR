import $ from 'jquery'

let DigitalCountdownTimer = {
  props: ['lib', 'config'
    , 'remainingSeconds', 'pauseAtStart'],
  data() {
    //console.log(this.remainingSeconds)
    this.$i18n.locale = this.config.locale
    return {
      dataRemainingSec: this.remainingSeconds,
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
      return Math.floor(this.dataRemainingSec / 60)
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
    start () {

      if (this.dataPause === true) {
        return null
      }
      
      if ((this.dataRemainingSec === 60
              || this.dataRemainingSec === 30
              || this.dataRemainingSec <= 10)) {
        this.isEnableGlow = true
        setTimeout(() => {
          this.isEnableGlow = false
        }, 700)
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