let debugDisable = false
if (debugDisable === true) {
  console.log('@test debugDisable')
}

let CountdownButton = {
  props: ['locale', 'lib', 'countdownSec'
    , 'minWordCount', 'maxWordCount', 'text', 'ignoreWordCount'
    , 'enableClassNames', 'enable'
    , 'autoClickSeconds', 'initRemainingSeconds'],
  data() {    
    this.$i18n.locale = this.locale
    
    let autoClickRemainingSeconds = 0
    if (this.autoClickSeconds) {
      autoClickRemainingSeconds = this.autoClickSeconds
    }
    
    return {
      remainingSeconds: 0,
      autoClickRemainingSeconds,
      awaitSubmit: false
    }
  },
  computed: {
    computedClassName () {
      if (this.isEnable === false 
              || this.awaitSubmit === true) {
        return 'disabled'
      }
      else if (typeof(this.enableClassNames) === 'string') {
        return this.enableClassNames
      }
    },
    wordCount () {
      let count
      if (typeof(this.text) === 'string') {
        count = this.lib.StringHelper.countWords(this.text)
      }
      else {
        count = this.text.length
      }
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
      //console.log(this.enable, this.ignoreWordCount, this.validWordCount, this.remainingSeconds, (this.remainingSeconds <= 0))
      if (this.enable === false) {
        return false
      }
      else if (this.ignoreWordCount === true) {
        return (this.remainingSeconds <= 0)
      }
      else {
        //console.log(this.remainingSeconds, this.validWordCount, this.wordCount)
        return (this.remainingSeconds <= 0 && this.validWordCount === true)
      }
    },
    disabledMessage () {
      let messages = []
      //console.log(this.remainingSeconds)
      if (this.remainingSeconds > 0) {
        let remainingTime = this.lib.DayJSHelper.formatHHMMSS(this.remainingSeconds)
        if (this.remainingSeconds <= 60) {
          let seconds = this.remainingSeconds
          seconds = Math.ceil(seconds * 100) / 100
          remainingTime = this.$t('{0} sec', [seconds])
        }
        //console.log(remainingTime)
        messages.push( this.$t('Remaining Time: {0}', [remainingTime]) )
      }
      
      let wordCount = this.wordCount
      if (typeof(this.minWordCount) === 'number'
              && wordCount < this.minWordCount) {
        let interval = this.minWordCount - wordCount
        messages.push( this.$t('You still need to write {0} keywords more', [interval]) )
      }
      else if (typeof(this.maxWordCount) === 'number'
              && wordCount > this.maxWordCount) {
        let interval = wordCount - this.maxWordCount
        messages.push( this.$t('You still need to delete {0} keywords more', [interval]) )
      }
      
      return messages.join(' / ')
    }
  },
  watch: {
    countdownSec (countdownSec) {
      if (typeof(countdownSec) === 'number') {
        this._initCountdown()
      }
    },
  },
  mounted () {
    if (typeof(this.countdownSec) === 'number') {
      this._initCountdown()
    }
  },
  methods: {
    _initCountdown() {
      if (typeof(this.countdownSec) !== 'number'
              || this.countdownSec <= 0) {
        return false
      }
      this.remainingSeconds = this.countdownSec
      //console.log(this.remainingSeconds)
      
      if (debugDisable === true) {
        return null
      }
      
      this.countdown()
    },
    countdown () {
      //console.log('AAA')
      setTimeout(() => {
        //console.log(this.remainingSeconds)
        this.remainingSeconds = this.remainingSeconds - 1
        if (this.remainingSeconds > 0) {
          this.countdown()
        }
        else {
          //console.log('等於0了')
          this.$emit('timeup')
          if (typeof(this.autoClickSeconds) === 'number') {
            this.autoClickCountdown()
          }
        }
      }, 1000)
    },
    autoClickCountdown () {
      setTimeout(() => {
        this.autoClickRemainingSeconds--
        
        if (this.autoClickRemainingSeconds > 0) {
          this.autoClickCountdown()
        }
        else {
          this.onClick()
        }
      }, 1000)
    },
    onClick () {
      if (!this.isEnable) {
        return null
      }
      this.awaitSubmit = true
      this.$emit('click')
      
      setTimeout(() => {
        this.awaitSubmit = false
      }, 3000)
    }
  }
}

export default CountdownButton