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
    
    Model.prototype.getLatestLogUnixMS = async function (webpage) {
      let cacheKey = Cache.key('getLatestLogUnixMS')
      return await Cache.rememberWait([webpage, this], cacheKey, async () => {
        let logs = await ReadingActivityLog.findLatestLog(webpage.primaryKeyValue, this.primaryKeyValue)
        if (logs.length > 0) {
          return logs[0].created_at_unixms
        }
        else {
          return 0
        }
      })
    }
    
  } // register (Model) {
}

module.exports = UserReadingActivityLog
