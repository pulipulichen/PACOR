import PostRecall from './../PreImaginary/PreImaginary.js'

PostRecall.data = function () {
  /*
  this.$i18n.locale = this.config.locale
  let key = 'PostRecall'
  let data = {}
  if (typeof (this.status) === 'object'
          && typeof (this.status.readingConfig) === 'object') {
    if (typeof (this.status.readingConfig.readingProgressModules) === 'object'
            && typeof (this.status.readingConfig.readingProgressModules[key]) === 'object') {
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
  return data
  */
  
  this.$i18n.locale = this.config.locale
    
    let key = 'PostRecall'
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
    data.header = this.$t(key)
    return data
}

export default PostRecall