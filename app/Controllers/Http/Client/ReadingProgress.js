'use strict'

const { HttpException } = use('@adonisjs/generic-exceptions') 
const ReadingActivityLog = use ('App/Models/ReadingActivityLog')

class ReadingProgress {
  async start({webpage, user}) {
    throw new HttpException('#TODO start')
  }
  
  /**
   * 
   * @param {type} webpage
   * @param {type} user
   * @returns 下一個步驟
   */
  async end({webpage, user}) {
    throw new HttpException('#TODO start')
  }
  
  async activityTimer({request, webpage, user}) {
    const { second } = request.all()
    await user.addActivityTime(second)
    return 1
  }
}

module.exports = ReadingProgress
