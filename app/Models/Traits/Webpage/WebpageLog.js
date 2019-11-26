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
      let logInstance = new ReadingActivityLog()
      //console.log({log})
      logInstance.webpage_id = this.primaryKeyValue
      logInstance.user_id = user.primaryKeyValue
      logInstance.type = type
      if (typeof(log) !== 'undefined') {
        logInstance.log = log
      }
      //console.log('log 1', user.primaryKeyValue, user.username)
      //console.log('log 2', withUsers.primaryKeyValue, withUsers.username)
      await logInstance.save()
      
      // ----------------------------------
      
      if (withUsers) {
        //console.log({withUsers})
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
        
        if (withUsers.length > 0) {
          await logInstance.withUsers().createMany(withUsers)
        }
      }
    }
    
  } // register (Model) {
}

module.exports = WebpageLog
