'use strict'

const Cache = use('Cache')
const HttpException = use('HttpException')

class UserReadingProgressConfig {

  register(Model) {
    
    Model.prototype.getCurrentReadingProgressStepName = async function (webpage) {
      let status = await this.getReadingProgressStatus(webpage)
      if (status === null || status.length === 0) {
        return null
      }
      //let stepName = status[0].step_name
      for (let i = 0; i < status.length; i++) {
        let step = status[i]
        if (step.isCompleted === true) {
          continue
        }

        if (typeof (step.start_timestamp) === 'number'
                && typeof (step.end_timestamp) !== 'number') {
          //console.log('step.step_name', step.step_name)
          return step.step_name
        }

        if (typeof (step.start_timestamp) !== 'number') {
          //console.log('step.step_name', step.step_name)
          return step.step_name
        }
        /*
         if (typeof(step.start_timestamp) === 'number'
         && typeof(step.end_timestamp) !== 'number') {
         return step.step_name
         }
         */
      }
      //console.log('null')
      return null
    }
    
    Model.prototype.getCurrentReadingProgressStep = async function (webpage) {
      let status = await this.getReadingProgressStatus(webpage)
      if (status.length === 0) {
        return null
      }
      //let stepName = status[0].step_name
      for (let i = 0; i < status.length; i++) {
        let step = status[i]
        if (step.isCompleted === true) {
          continue
        }

        if (typeof (step.start_timestamp) === 'number'
                && typeof (step.end_timestamp) !== 'number') {
          //console.log('step.step_name', step.step_name)
          return step
        }

        if (typeof (step.start_timestamp) !== 'number') {
          //console.log('step.step_name', step.step_name)
          return step
        }
        /*
         if (typeof(step.start_timestamp) === 'number'
         && typeof(step.end_timestamp) !== 'number') {
         return step.step_name
         }
         */
      }
      //console.log('null')
      return null
    }

    Model.prototype.getReadingProgressStatus = async function (webpage, showDetails) {
      if (webpage === undefined) {
        throw new HttpException('Webpage object is required.')
      }
      let cacheKey = Cache.key('User', 'getReadingProgressStatus', webpage, this, showDetails)
      return await Cache.rememberWait([webpage, this, 'ReadingProgresses'], cacheKey, async () => {
        //console.log('getReadingProgressStatus', 'not from cache')
        let readingProgresses
        if (Array.isArray(webpage) === false
                && typeof (webpage.primaryKeyValue) === 'number') {
          readingProgresses = await webpage.getReadingProgresses()
        }
        let status = await this.readingProgresses(webpage).fetch()
        status = status.toJSON()
        //console.log(status)
        readingProgresses = readingProgresses.map(stepName => {
          let output = {
            'step_name': stepName
          }

          for (let i in status) {
            let s = status[i]
            if (s.step_name === stepName) {
              output.start_timestamp = s.start_timestamp
              output.end_timestamp = s.end_timestamp
              output.duration = s.duration
              output.isCompleted = s.isCompleted
              if (showDetails === true) {
                output.activity_seconds = s.activity_seconds
                output.log = s.log
              }
            }
          }

          return output
        })
        //Cache.forever(cacheKey, readingProgresses)
        return readingProgresses
      })
    } //  Model.prototype.getReadingProgressStatus = async function (webpage, showDetails) {
    
    Model.prototype.setReadingProgressLog = async function (webpage, log) {
      
      if (typeof(log) !== 'object' || JSON.stringify(log) === '{}') {
        throw new HttpException('No log' + JSON.stringify(log))
      }

      let step = await this.startReadingProgress(webpage)
      step.log = log
      
      await step.save()
      
      return this
    } // Model.prototype.setReadingProgressLog = async function (webpage, log) {
    
    Model.prototype.setReadingProgressLogAttr = async function (webpage, attrs) {
      if (typeof(attrs) !== 'object' || JSON.stringify(attrs) === '{}') {
        throw new HttpException('No attrs')
        //return 0
      }

      let step = await this.startReadingProgress(webpage)
      if (step.log === null) {
        step.log = {}
      }
      Object.keys(attrs).forEach(key => {
        step.log[key] = attrs[key]
      })
      //step.activity_seconds = 2
      await step.save()
      return this
    } // Model.prototype.setReadingProgressLogAttr = async function (webpage, log) {
    
    Model.prototype.getReadingProgressLog = async function (webpage) {
      let step = await this.startReadingProgress(webpage)
      //    console.log(step.toJSON())
      //    console.log(step.step_name)
      //    console.log(step.log)

      let log = step.log
      if (typeof(log) === 'string' && log.startsWith('{') && log.endsWith('}')) {
        try {
          log = JSON.parse(log)
        } catch (e) {}
      } 
      if (log === null || typeof(log) !== 'object') {
        log = {}
      }
      return log
    } // Model.prototype.getReadingProgressLog = async function (webpage) {
    
    Model.prototype.getCurrentReadingProgressStepStartTime = async function (webpage) {
      let step = await this.getCurrentReadingProgressStep(webpage)
      return step.start_timestamp
    }
    
    /**
     * 
     * @param {Webpage} webpage
     * @returns {Number}
     */
    Model.prototype.getRemainingSeconds = async function (webpage) {
      let status = await this.getReadingProgressStatus(webpage)
      let stepName = await this.getCurrentReadingProgressStepName(webpage)
      //console.log(status)
      let readingProgresses = await webpage.getReadingProgresses()
      let config = await webpage.getConfig()
      
      let limitMunites
      let start_time
      for (let i = 0; i < status.length; i++) {
        let step = status[i]
        if (step.step_name === 'IndividualReading') {
          start_time = step.start_timestamp
          break
        }
      }
      
      if (!start_time) {
        return 0
      }
      
      if (stepName === 'IndividualReading') {
        limitMunites = config.readingProgressModules['IndividualReading'].limitMinutes
      }
      else if (stepName === 'CollaborativeReading') {
        limitMunites = config.readingProgressModules['reading'].totalLimitMinutes
      }
      
      let nowMS = (new Date()).getTime()
      let limitMS = limitMunites * 60 * 1000
      let remainingMS = limitMS - (nowMS - start_time)
      //console.log(limitMS, start_time, nowMS)
      let remainingSeconds = Math.round(remainingMS / 1000)
      
      //console.log(stepName, remainingSeconds)
      //console.log(status)
      if (remainingSeconds < 0) {
        return 0
      }
      return remainingSeconds
    }
  } // register (Model) {
  
}

module.exports = UserReadingProgressConfig
