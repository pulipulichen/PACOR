'use strict'

//const Cache = use('Cache')
//const { HttpException } = use('@adonisjs/generic-exceptions') 

class ReadingActivityLogSave {

  register(Model) {
    
    Model.log = async function (webpageID, userID, type, log) {
      if (typeof(webpageID) === 'object'
              && typeof(webpageID.primaryKeyValue) === 'number') {
        webpageID = webpageID.primaryKeyValue
      }

      if (typeof(userID) === 'object'
              && typeof(userID.primaryKeyValue) === 'number') {
        userID = userID.primaryKeyValue
      }

      let logInstance = new ReadingActivityLog

      logInstance.webpage_id = webpageID
      logInstance.user_id = userID
      logInstance.type = type
      if (typeof(log) !== 'undefined') {
        logInstance.log = log
      }
      await logInstance.save()
    }
    
  } // register (Model) {
}

module.exports = ReadingActivityLogSave
