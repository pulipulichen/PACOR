'use strict'

const UserNotificationModel = use('App/Models/UserNotification')
const UserModel = use('App/Models/User')

const { HttpException } = use('@adonisjs/generic-exceptions') 

const Cache = use('Cache')
const Config = use('Config')

const TypeHelper = use('App/Helpers/TypeHelper')
const DatabaseHelper = use('App/Helpers/DatabaseHelper')

// -------------------------------

class UserNotificationFind {

  register(Model) {
    
    let triggerQueryBuilder = (builder) => {
      builder.setHidden(['avatar', 'domain_id', 'email', 'password', 'preference', 'role', 'created_at', 'updated_at'])
    }
    
    Model.getInit = async function (webpage, user, options) {
      let {
        afterTime
      } = options
      
      let cacheKey = Cache.key('UserNotification.getInit')
      
      let doQuery = async () => {
        let query = UserNotificationModel
              .query()
              .where('webpage_id', webpage.primaryKeyValue)
              .where('user_id', user.primaryKeyValue)
              .where('deleted', false)
              .where('has_read', false)
              .with('triggerUser', triggerQueryBuilder)
              .orderBy('created_at_unixms', 'desc')

        let itemsPerPage = Config.get('view.itemsPerPage')
        query.limit(itemsPerPage)
        
        //console.log(query.toSQL())
        
        if (afterTime) {
          query.where('created_at_unixms', '>' , TypeHelper.parseInt(afterTime))
        }
        
        let unreadNotifications = await query.fetch()
        //console.log(unreadNotifications.size())
        if (afterTime 
                && (unreadNotifications === null || unreadNotifications.size() === 0)) {
          return 0
        }
        
        unreadNotifications = unreadNotifications.toJSON().reverse()

        let unreadCount = await this.getUnreadCount(webpage, user)
        let hasNotification = await this.hasNotification(webpage, user)

        return {
          unreadNotifications,
          unreadCount,
          hasNotification
        }
      }
      
      // ----------------------------
      //console.log({afterTime})
      if (afterTime) {
        return await doQuery()
      }
      
      return await Cache.rememberWait([webpage, user], cacheKey, 0.5, async () => {
        return await doQuery()
      })
    } // Model.getInit = async function (webpage, user, options) {
    
    // -------------------------------------------
    
    Model.getFullInit = async function (webpage, user, options) {
      let {
        afterTime
      } = options
      
      let cacheKey = Cache.key('getFullInit')
      
      let doQuery = async () => {
        let query = UserNotificationModel
              .query()
              .where('webpage_id', webpage.primaryKeyValue)
              .where('user_id', user.primaryKeyValue)
              .where('deleted', false)
              .with('triggerUser', triggerQueryBuilder)
              .orderBy('created_at_unixms', 'desc')

        let itemsPerPage = Config.get('view.itemsPerPage')
        query.limit(itemsPerPage)
        
        //console.log(query.toSQL())
        
        if (afterTime) {
          query.where('created_at_unixms', '>' , TypeHelper.parseInt(afterTime))
        }
        
        let notifications = await query.fetch()
        if (afterTime 
                && (notifications === null || notifications.size() === 0)) {
          return 0
        }
        
        notifications = notifications.toJSON()

        let triggerUsers = await this.getTriggerUsers(webpage, user)

        return {
          notifications,
          triggerUsers
        }
      }
      
      // ----------------------------
      if (afterTime) {
        return await doQuery()
      }
      
      return await Cache.rememberWait([webpage, user], cacheKey, async () => {
        return await doQuery()
      })
    } // Model.getFullInit = async function (webpage, user, options) {
    
    Model.getUnreadOlderNotifications = async function (webpage, user, options = {}) {
      options.unread = true
      options.reverse = true
      //options.reverse = false
      return await this.getOlderNotifications(webpage, user, options)
    } // Model.getUnreadOlderNotifications = async function (webpage, user, options) {
    
    Model.getOlderNotifications = async function (webpage, user, options) {
      let {
        basetime,
        unread,
        focusUserID,
        reverse
      } = options
      
      let cacheKey = Cache.key('getOlderNotifications', basetime)
      return await Cache.rememberWait([webpage, user], cacheKey, async () => {
        let query = UserNotificationModel
              .query()
              .where('webpage_id', webpage.primaryKeyValue)
              .where('user_id', user.primaryKeyValue)
              .with('triggerUser', triggerQueryBuilder)
              .where('deleted', false)
              .orderBy('created_at_unixms', 'desc')

        if (unread) {
          query.where('has_read', false)
        }
        
        if (focusUserID) {
          query.where('trigger_user_id', focusUserID)
        }

        let itemsPerPage = Config.get('view.itemsPerPage')
        query.limit(itemsPerPage)
        
        basetime = TypeHelper.parseInt(basetime)
        if (basetime) {
          query.where('created_at_unixms', '<' , basetime)
        }

        //console.log(DatabaseHelper.toSQL(query))

        let notifications = await query.fetch()
        notifications = notifications.toJSON()

        if (reverse === true) {
          notifications.reverse()
        }

        return notifications
      })
    } // Model.getOlderNotifications = async function (webpage, user, options) {
    
    Model.getUnreadCount = async function (webpage, user) {
      let cacheKey = Cache.key('getUnreadCount')
      
      return await Cache.rememberWait([webpage, user], cacheKey, async () => {
        let result = await UserNotificationModel
                .query()
                .where('webpage_id', webpage.primaryKeyValue)
                .where('user_id', user.primaryKeyValue)
                .where('deleted', false)
                .where('has_read', false)
                .getCount()
        
        if (result === null) {
          return 0
        }
        //console.log(TypeHelper.parseInt(result[0].count))
        return result
      })
    } // Model.getUnreadCount = async function (webpage, user) {
    
    Model.hasNotification = async function (webpage, user) {
      let cacheKey = Cache.key('hasNotification')
      
      return await Cache.rememberWait([webpage, user], cacheKey, async () => {
        let result = await UserNotificationModel
                .query()
                .where('webpage_id', webpage.primaryKeyValue)
                .where('user_id', user.primaryKeyValue)
                .where('deleted', false)
                .getCount()
        
        if (result === null) {
          return false
        }
        //console.log(TypeHelper.parseInt(result[0].count))
        return (result > 0)
      })
    } // Model.hasNotification = async function (webpage, user) {
    
    Model.getTriggerUsers = async function (webpage, user) {
      let cacheKey = Cache.key('getTriggerUsers')
      
      return await Cache.rememberWait([webpage, user], cacheKey, async () => {
        let users = await UserModel
                .query()
                .whereHas('notifies', (builder) => {
                  builder.where('webpage_id', webpage.primaryKeyValue)
                         .where('user_id', user.primaryKeyValue)
                         .where('deleted', false)
                })
                .setVisible(['avatar_url', 'display_name', 'id', 'role', 'username'])
                .fetch()
        
        //users.setVisible(['avatar_url', 'display_name', 'id', 'role', 'username'])
        return users
      })
    }
    
    
  } // register (Model) {
}

module.exports = UserNotificationFind
