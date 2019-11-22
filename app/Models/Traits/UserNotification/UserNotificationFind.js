'use strict'

const UserNotificationModel = use('App/Models/UserNotification')
const { HttpException } = use('@adonisjs/generic-exceptions') 

const Cache = use('Cache')
const Config = use('Config')

class UserNotificationFind {

  register(Model) {
    
    Model.getInit = async function (webpage, user, options) {
      
      let cacheKey = Cache.keys('getSummary')
      return await Cache.rememberWait([webpage, user, this], cacheKey, async () => {
        let query = UserNotificationModel
              .query()
              .where('webpage_id', webpage.primaryKeyValue)
              .where('user_id', user.primaryKeyValue)
              .where('deleted', false)
              .where('has_read', false)
              .orderBy('created_at_unixms', 'desc')

        let itemsPerPage = Config.get('view.itemsPerPage')
        query.limit(itemsPerPage)

        let notifications = await query.fetch()
        notifications = notifications.toJSON().reverse()

        let unreadCount = await this.getUnreadCount(webpage, user)

        return {
          notifications,
          unreadCount
        }
      })
    }
    
    Model.getOlderNotifications = async function (webpage, user, options) {
      let {
        basetime
      } = options
      
      let cacheKey = Cache.keys('getUnreadCount', basetime)
      return await Cache.rememberWait([webpage, user, this], cacheKey, async () => {
        let query = UserNotificationModel
              .query()
              .where('webpage_id', webpage.primaryKeyValue)
              .where('user_id', user.primaryKeyValue)
              .where('deleted', false)
              .where('has_read', false)

        let itemsPerPage = Config.get('view.itemsPerPage')
        query.limit(itemsPerPage)

        let notifications = await query.fetch()
        notifications = notifications.toJSON().reverse()

        return notifications
      })
    }
    
    Model.getUnreadCount = async function (webpage, user) {
      let cacheKey = Cache.keys('getUnreadCount')
      
      return await Cache.rememberWait([webpage, user, this], cacheKey, async () => {
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
