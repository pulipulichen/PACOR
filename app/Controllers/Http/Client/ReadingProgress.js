'use strict'

const { HttpException } = use('@adonisjs/generic-exceptions') 
const ReadingActivityLog = use ('App/Models/ReadingActivityLog')
const ReadingProgressModel = use ('App/Models/ReadingProgress')

const Profiler = use('Profiler')

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
    
    let profiler = new Profiler(0, 'Client/ReadingProgress.end()', log)
    
    //console.log('ReadingProgress.end', 1)
    webpage.log(user, 'ReadingProgress.end', log)
    profiler.after('webpage.log()')
    
    //console.log('ReadingProgress.end', 2)
    if (typeof(log) === 'object' && JSON.stringify(log) !== '{}') {
      profiler.before('await user.startReadingProgress(webpage)')
      let currentStep = await user.startReadingProgress(webpage)
      if (currentStep !== null) {
        profiler.before('currentStep.log = log')
        currentStep.log = log
        await currentStep.save()
      }
    }
    
    //console.log('ReadingProgress.end', 3)
    
    //throw new HttpException('#TODO start')
    profiler.before('await user.endReadingProgress(webpage)')
    let nextStep = await user.endReadingProgress(webpage)
    
    //console.log('ReadingProgress.end', 4)
    
    //let nextStep = await user.startReadingProgress(webpage)
    
    profiler.finish()
    
    //console.log('ReadingProgress.end', 5)
    if (nextStep === null) {
      return 0
    }
    else {
      return 1
    }
  }
  
  async activityTimer({request, webpage, user}) {
    //throw new HttpException('For Test', 403)
    
    const { seconds } = request.all()
    //console.log(seconds)
    await user.addActivitySeconds(webpage, seconds)
    return 1
  }
  
  async setLog({request, webpage, user}) {
    let log = request.all()
    webpage.log(user, 'ReadingProgress.setLog', log)
    
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
    webpage.log(user, 'ReadingProgress.setLogAttr', attrs)
    
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

  async backToFirstStep({request, webpage, user}) {
    webpage.log(user, 'ReadingProgress.backToFirstStep')
    await ReadingProgressModel.query()
            .where('webpage_id', webpage.primaryKeyValue)
            .where('user_id', user.primaryKeyValue)
            .delete()
    return 1
  }
  
  async backToPreviousStep({request, webpage, user}) {
    webpage.log(user, 'ReadingProgress.backToPreviousStep')
    await ReadingProgressModel.query()
            .where('webpage_id', webpage.primaryKeyValue)
            .where('user_id', user.primaryKeyValue)
            .orderBy('start_timestamp', 'desc')
            .limit(1)
            .delete()
    return 1
  }
}

module.exports = ReadingProgress
