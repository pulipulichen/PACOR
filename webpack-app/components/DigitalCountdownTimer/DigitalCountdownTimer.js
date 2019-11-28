let DigitalCountdownTimer = {
  props: ['lib', 'config'
    , 'remainingSeconds', 'pauseAtStart'],
  data() {
    console.log(this.remainingSeconds)
    this.$i18n.locale = this.config.locale
    return {
      dataRemainingSec: this.remainingSeconds,
      dataPause: this.pauseAtStart
    }
  },
  computed: {
    dataRemainingTime () {
      return this.lib.DayJSHelper.formatHHMMSS(this.dataRemainingSec)
    },
    dataMinutes () {
      if (this.dataRemainingSec < 60) {
        return 0
      }
      return Math.floor(this.dataRemainingSec / 60)
    },
    dataSeconds () {
      return this.dataRemainingSec % 60
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

export default DigitalCountdownTimer