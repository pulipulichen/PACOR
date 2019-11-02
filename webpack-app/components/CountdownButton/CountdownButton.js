let CountdownButton = {
  props: ['locale', 'lib', 'countdownSec', 'minWordCount', 'maxWordCount', 'text'],
  data() {    
    this.$i18n.locale = this.locale
    return {
      remainingSeconds: 0
    }
  },
  computed: {
    wordCount () {
      let count = this.lib.StringHelper.countWords(this.text)
      //console.log(count)
      return count
    },
    validWordCount () {
      if (typeof(this.minWordCount) !== 'number'
              && typeof(this.maxWordCount) !== 'number') {
        return true
      }
      
      let wordCount = this.wordCount
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
      let messages = []
      if (this.remainingSeconds > 0) {
        let remainingTime = this.lib.DayJSHelper.formatHHMMSS(this.remainingSeconds)
        messages.push( this.$t('Remaining Time: {0}', [remainingTime]) )
      }
      
      let wordCount = this.wordCount
      if (typeof(this.minWordCount) === 'number'
              && wordCount < this.minWordCount) {
        let interval = this.minWordCount - wordCount
        messages.push( this.$t('You still need to write {0} words more', [interval]) )
      }
      else if (typeof(this.maxWordCount) === 'number'
              && wordCount > this.maxWordCount) {
        let interval = wordCount - this.maxWordCount
        messages.push( this.$t('You still need to delete {0} words more', [interval]) )
      }
      
      return messages.join(' / ')
    }
  },
  mounted () {
    
      console.log(this.minWordCount)
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