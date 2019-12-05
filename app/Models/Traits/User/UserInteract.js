'use strict'

const Cache = use('Cache')
const { HttpException } = use('@adonisjs/generic-exceptions') 
const ReadingActivityLog = use('App/Models/ReadingActivityLog')

class UserInteract {

  register(Model) {
    
    Model.prototype.getRecentInteractTime = async function (webpage, options) {
      let {
        userIDList
      } = options
      
      let cacheKey = Cache.key('getRecentInteractTime', userIDList)
      return await Cache.rememberWait([webpage, this], cacheKey, async () => {
        let query = ReadingActivityLog
                .query()
                .where('reading_activity_logs.user_id', this.primaryKeyValue)
                .where('webpage_id', webpage.primaryKeyValue)
                .innerJoin('reading_activity_with_users', 'reading_activity_logs.id', 'reading_activity_with_users.reading_activity_log_id')
                .groupBy('reading_activity_with_users.user_id')
                .select('reading_activity_with_users.user_id as user_id')
                //.select('max(reading_activity_logs.created_at_unixms) as last_unixms')

        
        //console.log(query.toSQL())
        
        let logs = await query.max('reading_activity_logs.created_at_unixms as last_unixms')
        //console.log(logs)
        
        let logsMap = {}
        let currentTime = (new Date()).getTime()
        logs.forEach(row => {
          logsMap[row.user_id] = currentTime - row.last_unixms
        })
        //console.log(logsMap)
        
        return userIDList.map(id => {
          //id = id + ''
          if (typeof(logsMap[id]) === 'number') {
            return logsMap[id]
          }
          else {
            return null
          }
        })
        
      })
    }
    
  } // register (Model) {
}

module.exports = UserInteract
