export default function (Questionnaire) {
  Questionnaire.data = function () {
    this.$i18n.locale = this.config.locale
    
    let key = this.lib.auth.currentStep
    
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
    
    data.answeredList = []
    data.removedList = []
    
    // 測試用
    for (let i = 0; i < 100; i++) {
      data.answeredList.push('AAA')
      data.removedList.push('AAA')
    }
    
    data.header = this.$t('READING_PROGRESS.' + key)
    data.isTimeUp = false
    
    data.isWaitingLoading = false
    
    data.instuctionComponent = null
    if (!data.instuction) {
      //data.instuctionComponent = key + 'Instruction'
      //console.log(data.instuctionComponent)
      data.instuctionComponent = 'pre-imaginary-instruction'
      //console.log(data.instuctionComponent)
    }
    
    data.page = 'Instruction'
    
    data.minWords = data.minKeywords
    
    return data
  }
}