let CountdownButton = {
  props: ['lib', 'countdownSec', 'minWordCount', 'maxWordCount', 'word'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      remainingSeconds: 0
    }
  },
  computed: {
    validWordCount () {
      if (typeof(this.minWordCount) !== 'number'
              && typeof(this.maxWordCount) !== 'number') {
        return true
      }
      
      let wordCount = this.lib.StringHelper.countWords(this.word)
      if (typeof(this.minWordCount) === 'number'
              && wordCount < this.minWordCount) {
        return false
      }
      if (typeof(this.maxWordCount) === 'number'
              && wordCount > this.maxWordCount) {
        return false
      }
      return true
    },
    isEnable () {
      return (this.remainingSeconds === 0 && this.validWordCount === true)
    },
    disabledMessage () {
      
    }
  },
  mounted () {
    this._initCountdown()
  },
  methods: {
    _initCountdown() {
      if (typeof(this.countdownSec) !== 'number') {
        return false
      }
      
      this.remainingSeconds = this.countdownSec
      this.countdown()
    },
    countdown () {
      setTimeout(() => {
        this.remainingSeconds--
        this.countdown()
      }, 1000)
    }
  }
}

export default CountdownButton