'use strict'

const UserNotificationModel = use('App/Models/UserNotification')
const { HttpException } = use('@adonisjs/generic-exceptions') 

const Cache = use('Cache')
const Config = use('Config')

const TypeHelper = use('App/Helpers/TypeHelper')

class UserNotificationFind {

  register(Model) {
    
    let triggerQueryBuilder = (builder) => {
      builder.setHidden(['avatar', 'domain_id', 'email', 'id', 'password', 'preference', 'role', 'created_at', 'updated_at'])
    }
    
    Model.getInit = async function (webpage, user, options) {
      let {
        afterTime
      } = options
      
      let doQuery = async () => {
        let query = UserNotificationModel
              .query()
              .where('webpage_id', webpage.primaryKeyValue)
              .where('user_id', user.primaryKeyValue)
              .where('deleted', false)
              //.where('has_read', false)
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
        
        notifications = notifications.toJSON().reverse()

        let unreadCount = await this.getUnreadCount(webpage, user)

        return {
          notifications,
          unreadCount
        }
      }
      
      // ----------------------------
      if (afterTime) {
        return await doQuery()
      }
      
      let cacheKey = Cache.key('getSummary')
      return await Cache.rememberWait([webpage, user, this], cacheKey, async () => {
        return await doQuery()
      })
    }
    
    Model.getOlderNotifications = async function (webpage, user, options) {
      let {
        basetime
      } = options
      
      let cacheKey = Cache.key('getOlderNotifications', basetime)
      return await Cache.rememberWait([webpage, user, this], cacheKey, async () => {
        let query = UserNotificationModel
              .query()
              .where('webpage_id', webpage.primaryKeyValue)
              .where('user_id', user.primaryKeyValue)
              .with('triggerUser', triggerQueryBuilder)
              .where('deleted', false)
              //.where('has_read', false)
              .orderBy('created_at_unixms', 'desc')

        let itemsPerPage = Config.get('view.itemsPerPage')
        query.limit(itemsPerPage)
        
        basetime = TypeHelper.parseInt(basetime)
        if (basetime) {
          query.where('created_at_unixms', '<' , basetime)
        }

        let notifications = await query.fetch()
        notifications = notifications.toJSON().reverse()

        return notifications
      })
    }
    
    Model.getUnreadCount = async function (webpage, user) {
      let cacheKey = Cache.key('getUnreadCount')
      
      return await Cache.rememberWait([webpage, user, this], cacheKey, async () => {
        let result = await UserNotificationModel
                .query()
                .where('webpage_id', webpage.primaryKeyValue)
                .where('user_id', user.primaryKeyValue)
                .where('deleted', false)
                .where('has_read', false)
                .count()
        
        if (result === null) {
          return 0
        }
        //console.log(TypeHelper.parseInt(result[0].count))
        return TypeHelper.parseInt(result[0].count)
      })
    }
    
    
    
  } // register (Model) {
}

module.exports = UserNotificationFind
