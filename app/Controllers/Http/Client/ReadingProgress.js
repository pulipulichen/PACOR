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
    let {log} = request.all()
    if (typeof(log) === 'object' && JSON.stringify(log) !== '{}') {
      let currentStep = await user.startReadingProgress(webpage)
      currentStep.log = log
      await currentStep.save()
    }
    
    //throw new HttpException('#TODO start')
    await user.endReadingProgress(webpage)
    
    let nextStep = await user.startReadingProgress(webpage)
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
    let result = await step.save()
    
    console.log(result)
    console.log(step.step_name)
    console.log(step.log)
    console.log(typeof(step.log))
    console.log(step.toJSON())
    return 1
  }
  
  async getLog({request, webpage, user}) {
    let step = await user.startReadingProgress(webpage)
    console.log(step.toJSON())
    console.log(step.step_name)
    console.log(step.log)
    
    let log = step.log
    if (log === null || typeof(log) !== 'object') {
      log = {}
    }
    return log
  }
}

module.exports = ReadingProgress
