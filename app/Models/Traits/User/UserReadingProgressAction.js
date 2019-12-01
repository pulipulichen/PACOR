'use strict'

const ReadingProgress = use('App/Models/ReadingProgress')
const Cache = use('Cache')

class UserReadingProgressAction {

  register(Model) {
    
    Model.prototype.startReadingProgress = async function (webpage, stepName) {
      let time = (new Date()).getTime()
      if (typeof (stepName) !== 'string') {
        stepName = await this.getCurrentReadingProgressStepName(webpage)
        //console.log('current step name', this.username, stepName)
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
        
        let isEnableCollaboration = await this.isEnableCollaboration(webpage)
        if (isEnableCollaboration === true) {
          await webpage.addNotification(this, {
            triggerInstance: step
          })
        }
        
        //console.log('新增')
        //await step.save()
        //await Cache.forget(Cache.key('User', 'getReadingProgressStatus', webpage, this))
        await Cache.forgetWithTags([webpage, this, 'ReadingProgresses'])
      }
      //console.log('startReadingProgress AAA', step.start_timestamp)
      //console.log('startReadingProgress', step.toJSON())
      return step
    } // Model.prototype.startReadingProgress = async function (webpage, stepName) {

    /**
     * 結束某個階段
     * 
     * @param {Webpage} webpage
     * @param {String} stepName 可省略，省略的話，就會變成下一個階段
     * @returns {User}
     */
    Model.prototype.endReadingProgress = async function (webpage, stepName) {
      let time = (new Date()).getTime()

      let step
      if (typeof (stepName) === 'string') {
        step = await this.readingProgresses(webpage, stepName).fetch()
        step = step.first()
      } else {
        //console.log('AAAA')
        step = await this.startReadingProgress(webpage)
        if (step === null) {
          return null
        }
      }

//      console.log(step.toJSON())

      if (typeof (step.end_timestamp) !== 'number') {
        if (!step.start_timestamp) {
          step.start_timestamp = time
        }
        step.end_timestamp = time
        //console.log('step.end_timestamp AAA', time)
        
        //console.log(step)
        
        await step.save()
        //console.log('step.end_timestamp BBB', time)
        
        await Cache.forgetWithTags([webpage, this, 'ReadingProgresses'])
        
        //let status = await this.getReadingProgressStatus(webpage)
        //console.log('after update', status)
        //console.log('prev step', this.username, step.step_name)
        //console.log('prev step', this.username, step.step_name)
        //console.log('step.end_timestamp CCC', time)
        step = await this.startReadingProgress(webpage)
        
        //let status = await this.getReadingProgressStatus(webpage)
        //console.log('after update', status)
        //console.log('next step', this.username, step.step_name)
      }

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
