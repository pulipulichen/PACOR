'use strict'

const { HttpException } = use('@adonisjs/generic-exceptions') 
const ReadingActivityLog = use ('App/Models/ReadingActivityLog')

class ReadingProgress {
  async start({webpage, user}) {
    //throw new HttpException('#TODO start')
    let step = await user.startReadingProgress(webpage)
    return step.step_name
  }
  
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
    return step.step_name
  }
  
  async activityTimer({request, webpage, user}) {
    const { second } = request.all()
    await user.addActivitySeconds(webpage, second)
    return 1
  }
}

module.exports = ReadingProgress
