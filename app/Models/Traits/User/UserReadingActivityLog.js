'use strict'

const Cache = use('Cache')
const { HttpException } = use('@adonisjs/generic-exceptions') 

const ReadingActivityLog = use('App/Models/ReadingActivityLog')

class UserReadingActivityLog {

  register(Model) {
    
    Model.prototype.getLog = async function (webpage, type) {
      let cacheKey = Cache.key('getLog', type)
      return await Cache.rememberWait([webpage, this], cacheKey, async () => {
        return await ReadingActivityLog.findLog(webpage.primaryKeyValue, this.primaryKeyValue, type)
      })
    }
    
  } // register (Model) {
}

module.exports = UserReadingActivityLog
