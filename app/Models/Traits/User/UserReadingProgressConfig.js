'use strict'

const Cache = use('Cache')
const HttpException = use('HttpException')

class UserReadingProgressConfig {

  register(Model) {
    Model.prototype.getCurrentReadingProgressStepName = async function (webpage) {
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

    Model.prototype.getReadingProgressStatus = async function (webpage, showDetails) {
      if (webpage === undefined) {
        throw new HttpException('Webpage object is required.')
      }
      let cacheKey = Cache.key('User', 'getReadingProgressStatus', webpage, this, showDetails)
      return await Cache.rememberWait([webpage, this, 'ReadingProgresses'], cacheKey, async () => {
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
    }
  } // register (Model) {
}

module.exports = UserReadingProgressConfig
