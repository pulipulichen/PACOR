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
      timerEle: null
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
      return sec
    },
    computedMinutesClassList () {
      if (this.dataMinutes === null) {
        return 'hidden'
      }
      else if (this.dataMinutes >= 10) {
        return 'two'
      }
    },
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
      
      if (this.dataRemainingSec === 60
              || this.dataRemainingSec === 30
              || this.dataRemainingSec <= 10) {
        this.glow(true)
      }
//      else {
        //this.glow(false)
//      }

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
    },
    pause () {
      this.dataPause = true
    },
    resume () {
      this.dataPause = false
      this.start()
    },
    glow () {
      
      
      //console.log(this.dataRemainingSec)
      this.timerEle.addClass('glow')
        
      setTimeout(() => {
        this.timerEle.removeClass('glow')
      }, 700)
    }
  } // methods
}

export default DigitalCountdownTimer