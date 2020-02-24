import $ from 'jquery'

export default function (Questionnaire) {
  Questionnaire.methods.initLog = function () {
      let cache = localStorage.getItem(this.persistKey)
      //console.log(cache)
      if (cache !== null) {
        try {
          this.log = JSON.parse(cache)
          this.answer = this.log.answer
          
          let start_timestamp = this.log.start_timestamp
          start_timestamp = parseInt(start_timestamp, 10)
          this.remainingSeconds = this.limitMinutes * 60 - Math.round((this.lib.DayJSHelper.time() - start_timestamp) / 1000)
          if (this.remainingSeconds <= 0) {
            this.isTimeUp = true
          }
          this.page = 'Answer'
          //console.log(this.remainingSeconds)
        }
        catch (e) {}
      }
    }
  Questionnaire.methods.persist = function () {
      if (typeof(this.log) === 'object') {
        //console.log(this.log)
        if (typeof(this.log.start_timestamp) !== 'number') {
          this.log.start_timestamp = this.lib.DayJSHelper.time()
          this.remainingSeconds = this.limitMinutes * 60
        }
        
        localStorage.setItem(this.persistKey, JSON.stringify(this.log))
      }
    }
  Questionnaire.methods.onTimeup = function () {
      this.isTimeUp = true
  }
  Questionnaire.methods.nextStep = async function () {
      if (typeof(this.status.readingConfig.debug.stayInReadingProgress) === 'string') {
        console.log(`Stay in ${this.status.readingConfig.debug.stayInReadingProgress} for debug.`)
        return false
      }
      
      /*
      let data = {
        log: this.log,
        nextStep: true
      }
      */
      //console.log(data)
      this.isWaitingLoading = true
      
      await this.lib.AxiosHelper.post('/client/ReadingProgress/end', this.log)
      localStorage.removeItem(this.persistKey)
      if (this.$refs.Modal) {
        this.$refs.Modal.hide()
      }
      return await this.lib.auth.nextStep(false)
    }
  Questionnaire.methods.logout = function () {
      localStorage.removeItem(this.persistKey)
      this.lib.auth.logoutWithoutForget()
    }
}