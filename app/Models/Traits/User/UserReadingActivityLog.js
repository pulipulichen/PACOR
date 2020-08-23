'use strict'

const Cache = use('Cache')
const { HttpException } = use('@adonisjs/generic-exceptions') 

const ReadingActivityLogModel = use('App/Models/ReadingActivityLog')

class UserReadingActivityLog {

  register(Model) {
    
    Model.prototype.getLog = async function (webpage, type) {
      let cacheKey = Cache.key('getLog', type)
      return await Cache.rememberWait([webpage, this], cacheKey, async () => {
        return await ReadingActivityLogModel.findLog(webpage.primaryKeyValue, this.primaryKeyValue, type)
      })
    }
    
    Model.prototype.getLatestLogUnixMS = async function (webpage) {
      let cacheKey = Cache.key('getLatestLogUnixMS')
      return await Cache.rememberWait([webpage, this], cacheKey, async () => {
        let logs = await ReadingActivityLogModel.findLatestLog(webpage.primaryKeyValue, this.primaryKeyValue)
        if (logs.length > 0) {
          return logs[0].created_at_unixms
        }
        else {
          return 0
        }
      })  // return await Cache.rememberWait([webpage, this], cacheKey, async () => {
    }
    
    Model.prototype.getReadingActivities = async function (webpage) {
      let cacheKey = Cache.key('getReadingActivities')
      return await Cache.rememberWait([webpage, this, 'User'], cacheKey, async () => {
        let user_id = this.primaryKeyValue
        let logs = await ReadingActivityLogModel
                .query()
                .where('webpage_id', webpage.primaryKeyValue)
                .where('user_id', user_id)
                .orderBy('created_at')
                .fetch()
        
        let output = []
        for (let i = 0; i < logs.size(); i++) {
          let log = logs.nth(i)
          let code = await log.getCode()
          if (!code) {
            continue
          }
          
          if (!code) {
            code = ''
          }
          
          output.push({
            user: this.display_name,
            user_id,
            unixms: log.created_at_unixms,
            event: code,
            //type: log.type,
            //log: JSON.stringify(log.log)
          })
        }
        
        return output
      })  // return await Cache.rememberWait([webpage, this], cacheKey, async () => {
    }
    
  } // register (Model) {
}

module.exports = UserReadingActivityLog
