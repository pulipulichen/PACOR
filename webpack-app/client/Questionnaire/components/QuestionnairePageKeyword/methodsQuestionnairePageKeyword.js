import $ from 'jquery'

export default function (Questionnaire) {
  Questionnaire.methods.initLog = function () {
    let cache = localStorage.getItem(this.persistKey)
    //console.log(cache)
    if (cache !== null) {
      try {
        this.log = JSON.parse(cache)
        if (Array.isArray(this.log.answeredList)) {
          this.answeredList = this.log.answeredList
        }
        if (Array.isArray(this.log.removedList)) {
          this.removedList = this.log.removedList
        }

        let start_timestamp = this.log.start_timestamp
        start_timestamp = parseInt(start_timestamp, 10)
        this.remainingSeconds = this.limitMinutes * 60 - Math.round((this.lib.DayJSHelper.time() - start_timestamp) / 1000)
        if (this.remainingSeconds <= 0) {
          this.isTimeUp = true
        }
        //console.log([this.remainingSeconds, (this.remainingSeconds <= 0), this.isTimeUp])
        this.page = 'Answer'
        //console.log(this.remainingSeconds)
      } catch (e) {
      }
    }
  }
  Questionnaire.methods.persist = function (preventBeforeStart) {
    
    if (typeof (this.log) === 'object') {
      //console.log(this.log)
      if (typeof (this.log.start_timestamp) !== 'number') {
        if (preventBeforeStart === true) {
          return false
        }
        
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
    if (typeof (this.status.readingConfig.debug.stayInReadingProgress) === 'string') {
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
  
  Questionnaire.methods.startAnswer = function () {
    this.page = 'Answer'
    this.persist()
  }
  
  Questionnaire.methods.detectNextStep = function () {
    this.nextStepClickCounter++
    if (this.nextStepClickCounter > 2) {
      return this.nextStep()
    }

    if (this.nextStepClickTimer) {
      clearTimeout(this.nextStepClickTimer)
    }
    this.nextStepClickTimer = setTimeout(() => {
      this.nextStepClickCounter = 0
      clearTimeout(this.nextStepClickTimer)
    }, 3000)
  }
  
}