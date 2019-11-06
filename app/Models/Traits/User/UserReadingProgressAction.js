'use strict'

const ReadingProgress = use('App/Models/ReadingProgress')
const Cache = use('Cache')

class UserReadingProgressAction {

  register(Model) {
    Model.prototype.startReadingProgress = async function (webpage, stepName) {
      let time = (new Date()).getTime()
      if (typeof (stepName) !== 'string') {
        stepName = await this.getCurrentReadingProgressStepName(webpage)
      }
      if (stepName === null) {
        return null
      }
      //console.log('startReadingProgress', stepName)
      let step = await ReadingProgress.findOrCreate({
        'user_id': this.primaryKeyValue,
        'webpage_id': webpage.primaryKeyValue,
        'step_name': stepName
      }, {
        'user_id': this.primaryKeyValue,
        'webpage_id': webpage.primaryKeyValue,
        'step_name': stepName,
        'start_timestamp': time
      })
      if (step.start_timestamp === time) {
        // 表示這是新增的資料
        await Cache.forget(Cache.key('User', 'getReadingProgressStatus', webpage, this))
      }
      //console.log('startReadingProgress AAA', step.start_timestamp)
      //console.log('startReadingProgress', step.toJSON())
      return step
    }

    Model.prototype.endReadingProgress = async function (webpage, stepName) {
      let time = (new Date()).getTime()

      let step
      if (typeof (stepName) === 'string') {
        step = await this.readingProgresses(webpage, stepName).fetch()
      } else {
        //console.log('AAAA')
        step = await this.startReadingProgress(webpage)
        if (step === null) {
          return null
        }
      }

      //console.log(step.toJSON())

      if (typeof (step.end_timestamp) !== 'number') {
        if (typeof (step.start_timestamp) !== 'number') {
          step.start_timestamp = time
        }
        step.end_timestamp = time
        //console.log('step.end_timestamp AAA', time)
        await step.save()
        //console.log('step.end_timestamp BBB', time)
        Cache.forget(Cache.key('User', 'getReadingProgressStatus', webpage, this))
        //console.log('step.end_timestamp CCC', time)
      }

      return step
    }

    Model.prototype.addActivitySeconds = async function (webpage, seconds) {
      //console.log('addActivitySeconds', seconds, typeof(seconds))
      if (isNaN(seconds) === false) {
        seconds = parseInt(seconds, 10)
      }
      if (typeof (seconds) !== 'number') {
        return false
      }

      let step = await this.startReadingProgress(webpage)
      //console.log(activity_seconds)
      if (step === null) {
        return null
      }

      //console.log(step.activity_seconds, typeof(step.activity_seconds))
      if (isNaN(step.activity_seconds) === false) {
        step.activity_seconds = parseInt(step.activity_seconds, 10)
      }
      if (typeof (step.activity_seconds) !== 'number') {
        step.activity_seconds = 0
      }
      step.activity_seconds = step.activity_seconds + seconds
      await step.save()
      return step
    }

  } // register (Model) {
}

module.exports = UserReadingProgressAction
