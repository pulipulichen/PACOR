let CountdownTimer = {
  props: ['lib', 'config', 'remainingSeconds', 'pauseAtStart'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      dataRemainingSec: this.remainingSeconds,
      dataPause: this.pauseAtStart
    }
  },
  computed: {
    dataRemainingTime () {
      return this.lib.DayJSHelper.formatHHMMSS(this.dataRemainingSec)
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
    start () {
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
    }
  } // methods
}

export default CountdownTimer