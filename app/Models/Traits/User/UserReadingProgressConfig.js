'use strict'

const Cache = use('Cache')
const HttpException = use('HttpException')

const Profiler = use('Profiler')
const ReadingProgress = use('App/Models/ReadingProgress')
const DateHelper = use('App/Helpers/DateHelper')

class UserReadingProgressConfig {

  register(Model) {
    
    Model.prototype.getCurrentReadingProgressStepName = async function (webpage) {
      if (this.isAdmin()) {
        return 'FreeReading'
      }
      
      if (!webpage) {
        throw new HttpException('Webpage object is required.')
      }
      
      let config = await webpage.getConfig()
      
      if (config.debug && typeof(config.debug.stayInReadingProgress) === 'string') {
        return config.debug.stayInReadingProgress
      }
      
      let profiler = new Profiler(0, 'User/UserReadingProgressConfig.getCurrentReadingProgressStepName()')
      
      let doQuery = async () => {
        profiler.before('status User.getReadingProgressStatus()')
        let status = await this.getReadingProgressStatus(webpage)
        profiler.after('status', status)

        if (status === null || status.length === 0) {
          console.error('status is not found.')
          profiler.finish()
          return null
        }
        //let stepName = status[0].step_name

        profiler.before('for (let i = 0; i < status.length; i++) {')

        for (let i = 0; i < status.length; i++) {
          profiler.after('for', i)
          let step = status[i]
          if (step.isCompleted === true) {
            continue
          }

          if (typeof (step.start_timestamp) === 'number'
                  && typeof (step.end_timestamp) !== 'number') {
            //console.log('step.step_name', step.step_name)
            profiler.finish()
            return step.step_name
          }

          if (typeof (step.start_timestamp) !== 'number') {
            //console.log('step.step_name', step.step_name)
            profiler.finish()
            return step.step_name
          }
          /*
           if (typeof(step.start_timestamp) === 'number'
           && typeof(step.end_timestamp) !== 'number') {
           return step.step_name
           }
           */
        }
        
        //console.trace(this.id, this.username)
        //console.log(status)
        return true
      } // let doQuery = async () => {
      
      // -----------------------------------------------
      
      //profiler.before('await Cache.rememberWait()')
      //let cacheKey = Cache.key('User.getCurrentReadingProgressStepName')
      //let output = await Cache.rememberWait([webpage, this, 'ReadingProgress'], cacheKey, doQuery)
      let output = await doQuery()
      
      //console.log('null')
      profiler.finish()
      return output
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
      
      let profiler = new Profiler(3, 'User/UserReadingProgressConfig.getReadingProgressStatus()', showDetails)
      
      let doQuery = async () => {
        //console.log('getReadingProgressStatus', 'not from cache')
        
        profiler.before('check webpage')
        
        if (Array.isArray(webpage) === true
                || typeof (webpage.primaryKeyValue) !== 'number') {
          throw new Error('webpage is incorrect: \n' + JSON.stringify(webpage, null, 2))
        }
        
        profiler.before('await webpage.getReadingProgresses()')
        let readingProgresses = await webpage.getReadingProgresses()
        
        profiler.after('await webpage.getReadingProgresses()')
        
        if (Array.isArray(readingProgresses) === false) {
          profiler.finish()
          throw new Error('readingProgresses should be array')
        }
        
        let status = await this.readingProgresses(webpage).fetch()
        status = status.toJSON()
        //console.log(status)
        profiler.after('fetch status')
        
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
              output.activity_seconds = Number(s.activity_seconds)
              output.isCompleted = s.isCompleted
              if (showDetails === true) {
                output.activity_seconds = s.activity_seconds
                output.log = s.log
              }
            }
          }
          
          return output
        })
        profiler.after('readingProgresses = readingProgresses.map(stepName => {')

        profiler.finish()
        
        //Cache.forever(cacheKey, readingProgresses)
        return readingProgresses
      }
      
      //let cacheKey = Cache.key('getReadingProgressStatus', showDetails)
      //return await Cache.rememberWait([webpage, this, 'User'], cacheKey, doQuery)
      return await doQuery()
      
    } //  Model.prototype.getReadingProgressStatus = async function (webpage, showDetails) {
    
    Model.prototype.isReadingProgressCompleted = async function (webpage) {
      let cacheKey = Cache.key('isReadingProgressFinished')
      return await Cache.rememberWait([webpage, this, 'User'], cacheKey, async () => {
        let step = await this.getCurrentReadingProgressStepName(webpage)
        return (step === true)
      })
    } // Model.prototype.isReadingProgressFinished = async function () {
    
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
      if (step === null) {
        throw new Error('step is null')
      }
      
      if (!step.log) {
        step.log = {}
      }
      
      Object.keys(attrs).forEach(key => {
        step.log[key] = attrs[key]
      })
      //step.activity_seconds = 2
      await step.save()
      return this
    } // Model.prototype.setReadingProgressLogAttr = async function (webpage, log) {
    
    Model.prototype.getReadingProgress = async function (webpage, stepName) {
      return await ReadingProgress.findBy({
        'user_id': this.primaryKeyValue,
        'webpage_id': webpage.primaryKeyValue,
        'step_name': stepName
      })
    }
    
    Model.prototype.getReadingProgressLog = async function (webpage, step) {
      let stepName
      if (typeof(step) === 'string') {
        //console.log(step)
        stepName = step
        step = await this.getReadingProgress(webpage, step)
      }
      else {
        step = await this.startReadingProgress(webpage)
      }
      
      if (!step) {
        let config = await webpage.getConfig()
        if (typeof(config.debug.stayInReadingProgress) === 'string') {
          return {}
        }
        if (typeof(stepName) !== 'string') {
          console.error('Step is null: ' + await this.getCurrentReadingProgressStepName(webpage))
        }
        return {}
        //throw new Error('step is null')
      }
      
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
    
    Model.prototype.getReadingProgressTimestamp = async function (webpage, stepName) {
      let cacheKey = Cache.key('User.getReadingProgressTimestamp', stepName)
      
      return await Cache.rememberWait([webpage, this, 'User'], cacheKey, async () => {
        let step = await this.getReadingProgress(webpage, stepName)
        
        let startTimestamp, endTimestamp
        if (isNaN(step.start_timestamp) === false) {
          startTimestamp = Number(step.start_timestamp)
        }
        if (isNaN(step.end_timestamp) === false) {
          endTimestamp = Number(step.end_timestamp)
        }
        
        return {
          startTimestamp,
          endTimestamp
        }
      })
    }
    
    Model.prototype.getCurrentReadingProgressStepStartTime = async function (webpage) {
      let step = await this.getCurrentReadingProgressStep(webpage)
      //console.log(step)
      if (step === null) {
        return null
      }
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
      
      let nowMS = DateHelper.getTime()
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
