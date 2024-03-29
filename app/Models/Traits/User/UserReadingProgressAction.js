'use strict'

const ReadingProgress = use('App/Models/ReadingProgress')
const Cache = use('Cache')

const dayjs = use('dayjs')
const ExceptionHelper = use('App/Helpers/ExceptionHelper')

const Profiler = use('Profiler')
const DateHelper = use('App/Helpers/DateHelper')

class UserReadingProgressAction {

  register(Model) {
    
    Model.prototype.startReadingProgress = async function (webpage, stepName) {
      let profiler = new Profiler(1, 'User/UserReadingProgressAction.startReadingProgress()', this, stepName)
      
      let time = DateHelper.getTime()
      //console.log('startReadingProgress', 1, dayjs().format('mm:ss'), ExceptionHelper.getStackTraceString())
      if (typeof (stepName) !== 'string') {
        //console.log('startReadingProgress', 2, dayjs().format('mm:ss'))
        
        profiler.before('await this.getCurrentReadingProgressStepName(webpage)')
        stepName = await this.getCurrentReadingProgressStepName(webpage)
        profiler.after('await this.getCurrentReadingProgressStepName(webpage)')
        //console.log('startReadingProgress', 2.2, dayjs().format('mm:ss'), stepName)
        //console.log('current step name', this.username, stepName)
      }
      if (stepName === null) {
        //console.log('startReadingProgress', 3, dayjs().format('mm:ss'))
        profiler.finish()
        return null
      }
      //console.log('startReadingProgress', stepName, time)
      
      //console.log('startReadingProgress', 4, dayjs().format('mm:ss'))
      
      profiler.before('await ReadingProgress.findOrCreate()')
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
      profiler.after('await ReadingProgress.findOrCreate()')
      
      //console.log('startReadingProgress', 5, dayjs().format('mm:ss'))
      if (step.start_timestamp === time) {
        // 表示這是新增的資料
        //console.log('startReadingProgress', 6, dayjs().format('mm:ss'))
        
        profiler.before('await this.isEnableCollaboration(webpage)')
        let isEnableCollaboration = await this.isEnableCollaboration(webpage)
        
        if (this.isAdmin() === false) {
          profiler.before('await this.isInAnonymousGroup(webpage)')
          let isInAnonymousGroup = await this.isInAnonymousGroup(webpage)
          //console.log('startReadingProgress', 7, dayjs().format('mm:ss'), isEnableCollaboration)
          if (isEnableCollaboration === true && isInAnonymousGroup === false) {
          //if (isEnableCollaboration === true) {
            //console.log('startReadingProgress', 8, dayjs().format('mm:ss'), ExceptionHelper.getStackTraceString())
            profiler.before('webpage.addNotification()')
            webpage.addNotification(this, {
              triggerInstance: step
            })
          }
        }
        //console.log('startReadingProgress', 9, dayjs().format('mm:ss'), ExceptionHelper.getStackTraceString())
        //console.log('新增')
        //await step.save()
        
        //profiler.before(`await Cache.forgetWithTags([this])`)
        //await Cache.forgetWithTags([webpage, this, 'ReadingProgress'])
        
        //await Cache.forgetWithTags([this])
        //console.log('startReadingProgress', 10, dayjs().format('mm:ss'))
      }
      //console.log('startReadingProgress', 11, dayjs().format('mm:ss'), ExceptionHelper.getStackTraceString())
      //console.log('startReadingProgress AAA', step.start_timestamp)
      //console.log('startReadingProgress', step.toJSON())
      
      profiler.finish()
      
      return step
    } // Model.prototype.startReadingProgress = async function (webpage, stepName) {

    Model.prototype.getPreviousReadingProgress = async function (webpage) {
      let result = await ReadingProgress.query()
            .where('webpage_id', webpage.primaryKeyValue)
            .where('user_id', this.primaryKeyValue)
            .orderBy('id', 'desc')
            .limit(2)
            .fetch()
    
      if (result.size() < 2) {
        return undefined
      }
      else {
        return result.last()
      }
        
      //console.log(result.size())
      
      //await result.first().delete()
      
    }

    /**
     * 結束某個階段
     * 
     * @param {Webpage} webpage
     * @param {String} stepName 可省略，省略的話，就會變成下一個階段
     * @returns {User}
     */
    Model.prototype.endReadingProgress = async function (webpage, stepName) {
      let profiler = new Profiler(0, 'User/UserReadingProgressAction.endReadingProgress()', this, stepName)
      
      let time = DateHelper.getTime()

      let step
      if (typeof (stepName) === 'string') {
        //console.log('endReadingProgress', 1, stepName)
        
        profiler.before('await this.readingProgresses(webpage, stepName).fetch()')
        step = await this.readingProgresses(webpage, stepName).fetch()
        step = step.first()
        profiler.after('step.first()')
        //console.log('endReadingProgress', 2)
      } else {
        //console.log('AAAA')
        //console.log('endReadingProgress', 3)
        profiler.before('await this.startReadingProgress(webpage)')
        step = await this.startReadingProgress(webpage)
        if (step === null) {
          profiler.finish()
          return null
        }
        profiler.after('await this.startReadingProgress(webpage)')
        //console.log('endReadingProgress', 4)
      }

      //console.log('endReadingProgress', 4.5)
//      console.log(step.toJSON())
      
      //console.log('endReadingProgress', stepName, time)

      if (typeof (step.end_timestamp) !== 'number') {
        if (!step.start_timestamp) {
          step.start_timestamp = time
        }
        step.end_timestamp = time
        //console.log('step.end_timestamp AAA', time)
        
        //console.log('endReadingProgress', 5, step.start_timestamp, step.end_timestamp)
        
        //console.log(step)
        profiler.before('await step.save()')
        await step.save()
        
        //console.log('endReadingProgress', 6)
        //console.log('step.end_timestamp BBB', time)
        
        //await Cache.forgetWithTags([webpage, this, 'ReadingProgresses'])
        //profiler.before('await Cache.forgetWithTags([this])')
        //await Cache.forgetWithTags([this])
        
        
        //console.log('endReadingProgress', 7, dayjs().format('mm:ss'))
        //let status = await this.getReadingProgressStatus(webpage)
        //console.log('after update', status)
        //console.log('prev step', this.username, step.step_name)
        //console.log('prev step', this.username, step.step_name)
        //console.log('step.end_timestamp CCC', time)
        profiler.before('await this.startReadingProgress(webpage)')
        step = await this.startReadingProgress(webpage)
        profiler.after('await this.startReadingProgress(webpage)')
        
        //console.log('endReadingProgress', 8, dayjs().format('mm:ss'))
        
        //let status = await this.getReadingProgressStatus(webpage)
        //console.log('after update', status)
        //console.log('next step', this.username, step.step_name)
      }
      
      //console.log('endReadingProgress', 9)
      profiler.finish()

      return step
    } // Model.prototype.endReadingProgress = async function (webpage, stepName) {
    
    Model.prototype.goToCollaborativeReadingProgress = async function (webpage) {
      let isEnableCollaboration = await this.isEnableCollaboration(webpage)
      //console.log(isEnableCollaboration)
      if (isEnableCollaboration === true) {
        return true
      }
      
      let readingProgresses = await webpage.getReadingProgresses(webpage)
      let currentStepName = await this.getCurrentReadingProgressStepName(webpage)
      //console.log(readingProgresses)
      //console.log(currentStepName, readingProgresses.indexOf(currentStepName), readingProgresses.length)
      while (readingProgresses.indexOf(currentStepName) < readingProgresses.length - 1) {
        await this.endReadingProgress(webpage)
        currentStepName = await this.getCurrentReadingProgressStepName(webpage)
        isEnableCollaboration = await this.isEnableCollaboration(webpage)
        if (isEnableCollaboration === true) {
          return true
        }
      }
      
      return true
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
      
      // ------------------------------
      // 偵查現在的時間
      
      let start_timestamp = step.start_timestamp
      if (isNaN(start_timestamp) === false) {
        start_timestamp = Number(start_timestamp)
      }
      //console.log([start_timestamp, seconds * 1000, (DateHelper.getTime() - start_timestamp)])
      if (start_timestamp 
              && (seconds * 1000 > DateHelper.getTime() - start_timestamp )) {
        step = await this.getPreviousReadingProgress(webpage)
        //console.log(['step_name', step.step_name])
      }
      
      // ------------------------------

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
    
    Model.prototype.addActivitySecondsLastStep = async function (webpage, seconds) {
      //console.log('addActivitySeconds', seconds, typeof(seconds))
      if (isNaN(seconds) === false) {
        seconds = parseInt(seconds, 10)
      }
      if (typeof (seconds) !== 'number') {
        return false
      }

      let step = await this.getPreviousReadingProgress(webpage)
      //console.log(activity_seconds)
      if (!step) {
        step = await this.startReadingProgress(webpage)
      }
      
      // ------------------------------

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
