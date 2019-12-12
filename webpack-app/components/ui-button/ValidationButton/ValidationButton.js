let ValidationButton = {
  props: ['locale', 'lib', 'countdownSec'
    , 'minWordCount', 'maxWordCount', 'text', 'ignoreWordCount'
    , 'color', 'enable'
    , 'rightLabeledIcon', 'leftLabeledIcon'],
  data() {    
    this.$i18n.locale = this.locale
    return {
      remainingSeconds: 0,
      awaitSubmit: false
    }
  },
  computed: {
    computedClassName () {
      //return 'await disabled' // for test
      
      if (this.isEnable === false
              || this.awaitSubmit === true) {
        return 'disabled'
      }
      
      let classList = []
      if (typeof(this.color) === 'string') {
        classList.push(this.color)
      }
      if (this.leftLabeledIcon) {
        classList.push('labeled icon button')
      }
      if (this.rightLabeledIcon) {
        classList.push('right labeled icon button')
      }
      if (this.awaitSubmit) {
        classList.push('await-submit disabled')
      }
      
      return classList.join(' ')
    },
    wordCount () {
      let text = this.text
      
      //console.log('before htmlToText', text)
      text = this.lib.StringHelper.htmlToText(text, true)
      //console.log('before removePunctuations', text)
      text = this.lib.StringHelper.removePunctuations(text)
      //text = this.lib.StringHelper.removeSpaces(text)
      //console.log('countWords', text)
      let count = this.lib.StringHelper.countWords(text)
      //console.log({count})
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
      if (this.enable === false) {
        return false
      }
      if (this.ignoreWordCount === true) {
        return (this.remainingSeconds === 0)
      }
      else {
        //console.log(this.remainingSeconds, this.validWordCount, this.wordCount)
        return (this.remainingSeconds === 0 && this.validWordCount === true)
      }
    },
    disabledMessage () {
      let messages = []
      //console.log(this.remainingSeconds)
      if (this.remainingSeconds > 0) {
        let remainingTime = this.lib.DayJSHelper.formatHHMMSS(this.remainingSeconds)
        if (this.remainingSeconds <= 60) {
          remainingTime = this.$t('{0} sec', [this.remainingSeconds])
        }
        //console.log(remainingTime)
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
    },
    hasLabeledIcon () {
      return !(this.leftLabeledIcon === null 
              && this.rightLabeledIcon === null)
    },
    computedLeftLabeledIcon () {
      if (this.awaitSubmit === true) {
        return 'hourglass icon'
      }
      else {
        return this.leftLabeledIcon
      }
    },
    computedRightLabeledIcon () {
      if (this.awaitSubmit === true) {
        return 'hourglass icon'
      }
      else {
        return this.rightLabeledIcon
      }
    }
  },
  watch: {
    countdownSec (countdownSec) {
      if (typeof(countdownSec) === 'number') {
        this._initCountdown()
      }
    },
    text () {
      this.awaitSubmit = false
    }
  },
//  mounted () {
//    
//    //console.log(this.countdownSec)
//    
//  },
  methods: {
    _initCountdown() {
      if (typeof(this.countdownSec) !== 'number'
              || this.countdownSec <= 0) {
        return false
      }
      this.remainingSeconds = this.countdownSec
      //console.log(this.remainingSeconds)
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
      }, 1000)
    },
    onclick: function () {
      this.awaitSubmit = true
      //return  // for test
      this.$emit('click')
      
      setTimeout(() => {
        this.awaitSubmit = false
      }, 3000)
    }
  }
}

export default ValidationButton