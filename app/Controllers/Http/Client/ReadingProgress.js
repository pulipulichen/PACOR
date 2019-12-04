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
 
  async end({request, webpage, user}) {
    let log = request.all()
    
    console.log('ReadingProgress.end', 1)
    await webpage.log(user, 'ReadingProgress.end', log)
    
    console.log('ReadingProgress.end', 2)
    if (typeof(log) === 'object' && JSON.stringify(log) !== '{}') {
      let currentStep = await user.startReadingProgress(webpage)
      currentStep.log = log
      await currentStep.save()
    }
    
    console.log('ReadingProgress.end', 3)
    
    //throw new HttpException('#TODO start')
    await user.endReadingProgress(webpage)
    
    console.log('ReadingProgress.end', 4)
    
    let nextStep = await user.startReadingProgress(webpage)
    
    console.log('ReadingProgress.end', 5)
    if (nextStep === null) {
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
    await webpage.log(user, 'ReadingProgress.setLog', log)
    
    await user.setReadingProgressLog(webpage, log)
    /*
    if (typeof(log) !== 'object' || JSON.stringify(log) === '{}') {
      throw new HttpException('No log' + JSON.stringify(log))
      return 0
    }
    
    let step = await user.startReadingProgress(webpage)
    //step.log = JSON.stringify(log)
    //step.fill({
    //  log: log
    //})
    step.log = log
    //step.activity_seconds = 2
    let result = await step.save()
    */
//    console.log(result)
//    console.log(step.step_name)
//    console.log(step.log)
//    console.log(typeof(step.log))
//    console.log(step.toJSON())
    return 1
  }
  
  async setLogAttr({request, webpage, user}) {
    let attrs = request.all()
    await webpage.log(user, 'ReadingProgress.setLogAttr', attrs)
    
    await user.setReadingProgressLogAttr(webpage, attrs)
    
//    console.log(result)
//    console.log(step.step_name)
//    console.log(step.log)
//    console.log(typeof(step.log))
//    console.log(step.toJSON())
    return 1
  }
  
  async getLog({request, webpage, user}) {
    return await user.getReadingProgressLog(webpage)
  }
  
  /**
   * 應該要改用本地端取得
   */
//  async getRemainingSeconds({request, webpage, user}) {
//    return await user.getRemainingSeconds(webpage)
//  }
}

module.exports = ReadingProgress
