'use strict'

const ReadingActivityLog = use('App/Models/ReadingActivityLog')

class WebpageLog {

  register(Model) {
    
    /**
     * 
     * @param {type} user
     * @param {type} type
     * @param {type} log
     * @param {Array} withUsers
     * [{
     *  user_id: 1
     * }, {
     *  user_id: 2
     * }]
     * @returns {undefined}
     */
    Model.prototype.log = async function (user, type, log, withUsers) {
      let logInstance = new ReadingActivityLog

      logInstance.webpage_id = this.primaryKeyValue
      logInstance.user_id = user.primaryKeyValue
      logInstance.type = type
      if (typeof(log) !== 'undefined') {
        logInstance.log = log
      }
      await logInstance.save()
      
      // ----------------------------------
      
      if (withUsers) {
        if (Array.isArray(withUsers) === false) {
          withUsers = [withUsers]
        }
        
        withUsers = withUsers.map(u => {
          let user_id
          if (typeof(u.user_id) === 'number') {
            user_id = u.user_id
          }
          else if (typeof(u.primaryKeyValue) === 'number') {
            user_id = u.primaryKeyValue
          }
          return {
            user_id
          }
        })
        
        withUsers = withUsers.filter(u => u.user_id !== user.primaryKeyValue)
        
        await logInstance.withUsers().createMany(withUsers)
      }
    }
    
  } // register (Model) {
}

module.exports = WebpageLog
