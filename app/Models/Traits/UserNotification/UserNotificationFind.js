'use strict'

const UserNotificationModel = use('App/Models/UserNotification')
const { HttpException } = use('@adonisjs/generic-exceptions') 

const Cache = use('Cache')

class UserNotificationFind {

  register(Model) {
    
    Model.getUnreadCount = async function (webpage, user, options) {
      let cacheKey = Cache.keys('getUnreadCount')
      
      return await Cache.rememberWait([webpage, user, this], cacheKey, 2, async () => {
        return await UserNotificationModel
                .query()
                .where('webpage_id', webpage.primaryKeyValue)
                .where('user_id', user.primaryKeyValue)
                .where('deleted', false)
                .where('read', false)
                .count()
      })
    }
    
  } // register (Model) {
}

module.exports = UserNotificationFind
