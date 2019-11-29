let PreImaginary = {
  props: ['lib', 'status', 'config', 'progress', 'error', 'view'],
  data() {    
    this.$i18n.locale = this.config.locale
    
    let key = 'PreImaginary'
    let data = {}
    if (typeof(this.status) === 'object' 
            && typeof(this.status.readingConfig) === 'object') {
      if (typeof(this.status.readingConfig.readingProgressModules) === 'object'
              && typeof(this.status.readingConfig.readingProgressModules[key]) === 'object') {
        for (let name in this.status.readingConfig.readingProgressModules[key]) {
          data[name] = this.status.readingConfig.readingProgressModules[key][name]
        }
      }
      data.readingConfig = this.status.readingConfig
    }
    data.log = {
      answer: '',
      start_timestamp: null
    }
    data.persistKey = key + '.log'
    data.remainingSeconds = null
    data.answer = ''
    data.header = this.$t('READING_PROGRESS.' + key)
    data.isTimeUp = false
    return data
  },
  //components: {
  //},
  computed: {
    buttonText: function () {
      //return this.$t('OK')
      if (typeof(this.log.start_timestamp) !== 'number') {
        return '(' + this.$t('Waiting') + ')'
      }
      else if (this.remainingSeconds > 0) {
        let remainingTime = this.lib.DayJSHelper.formatHHMMSS(this.remainingSeconds)
        return '(' + this.$t('Remaining Time: {0}', [remainingTime]) + ')'
      }
      else {
        return ''
      }
    },
    buttonClass: function () {
      //return 'disabled'
      return ''
    },
    wordCount: function () {
      if (typeof(this.log) !== 'object'
              || typeof(this.log.answer) !== 'string') {
        return 0
      }
      //console.log(this.log.answer)
      return this.lib.StringHelper.countWords(this.log.answer)
    },
    displayCharacterCounter: function () {
      if (typeof(this.log) !== 'object'
              || typeof(this.log.answer) !== 'string') {
        //console.log('err')
        return ''
      }
      
      let output = this.$t('{0} word', [this.wordCount])
      
      if (this.wordCount < this.minWords) {
        let needWordsCount = this.minWords - this.wordCount
        output = output + ' (' + this.$t('You still need to write {0} words more.', [needWordsCount]) + ')'
      }
      //console.log(output)
      return output
    },
    classWordCounter: function () {
      if (this.wordCount < this.minWords) {
        return 'red'
      }
      else {
        return 'green'
      }
    },
//    isTimeUp: function () {
//      console.log(this.remainingSeconds)
//      return (typeof(this.remainingSeconds) === 'number'
//              && this.remainingSeconds <= 0)
//    }
  },
  watch: {
//    'remainingSeconds': function () {
//      if (typeof(this.remainingSeconds) === 'number'
//              && this.remainingSeconds > 0) {
//        this.startCountdown()
//      }
//    },
    'answer' (answer) {
      //console.log(answer)
      if (answer !== this.log.answer) {
        this.log.answer = answer
      }
    }
  },
  mounted() {
    this.initLog()
    this.$refs.Modal.show()
  },
  methods: {
    initLog: function () {
      let cache = localStorage.getItem(this.persistKey)
      //console.log(cache)
      if (cache !== null) {
        try {
          this.log = JSON.parse(cache)
          this.answer = this.log.answer
          
          this.remainingSeconds = this.limitMinutes * 60 - Math.round((this.lib.DayJSHelper.time() - this.log.start_timestamp) / 1000)
          if (this.remainingSeconds <= 0) {
            this.isTimeUp = true
          }
          //console.log(this.remainingSeconds)
        }
        catch (e) {}
      }
    },
    persist: function () {
      if (typeof(this.log) === 'object') {
        if (typeof(this.log.start_timestamp) !== 'number') {
          this.log.start_timestamp = this.lib.DayJSHelper.time()
          this.remainingSeconds = this.limitMinutes * 60
        }
        
        localStorage.setItem(this.persistKey, JSON.stringify(this.log))
      }
    },
//    startCountdown: function () {
//      //return  // for test
//      setTimeout(() => {
//        if (this.remainingSeconds > 0) {
//          this.remainingSeconds--
//        }
//      }, 1000)
//    },
    onTimeup() {
      this.isTimeUp = true
    },
    nextStep: async function () {
      /*
      let data = {
        log: this.log,
        nextStep: true
      }
      */
      //console.log(data)
      
      await this.lib.AxiosHelper.post('/client/ReadingProgress/end', this.log)
      localStorage.removeItem(this.persistKey)
      this.$refs.Modal.hide()
      return await this.lib.auth.nextStep(false)
    }
  } // methods
}

export default PreImaginary