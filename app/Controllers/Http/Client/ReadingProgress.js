'use strict'

const { HttpException } = use('@adonisjs/generic-exceptions') 
const ReadingActivityLog = use ('App/Models/ReadingActivityLog')

class ReadingProgress {
  /*
  async start({webpage, user}) {
    //throw new HttpException('#TODO start')
    let step = await user.startReadingProgress(webpage)
    //console.log(step.step_name)
    return step.step_name
  }
  */
  /**
   * 
   * @param {type} webpage
   * @param {type} user
   * @returns 下一個步驟
   */
  async end({webpage, user}) {
    //throw new HttpException('#TODO start')
    await user.endReadingProgress(webpage)
    
    let step = await user.startReadingProgress(webpage)
    if (step === null) {
      return 0
    }
    else {
      return 1
    }
  }
  
  async activityTimer({request, webpage, user}) {
    const { seconds } = request.all()
    //console.log(seconds)
    await user.addActivitySeconds(webpage, seconds)
    return 1
  }
  
  async setLog({request, webpage, user}) {
    let log = request.all()
    if (typeof(log) !== 'object' || JSON.stringify(log) === '{}') {
      return 0
    }
    
    let step = await user.startReadingProgress(webpage)
    step.log = log
    await step.save()
    
    return 1
  }
  
  async getLog({request, webpage, user}) {
    let step = await user.startReadingProgress(webpage)
    let log = step.log
    if (log === null || typeof(log) !== 'object') {
      log = {}
    }
    return log
  }
}

module.exports = ReadingProgress
