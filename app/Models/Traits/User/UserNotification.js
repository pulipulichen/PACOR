'use strict'

const Cache = use('Cache')
const UserNotificationModel = use('App/Models/UserNotification')
const Config = use('Config')

class UserNotification {

  register(Model) {
    Model.prototype.getNotifications = async function (webpage, page) {
      let cacheKey = 'getNotifications'
      return await Cache.rememberWait([webpage, this, 'UserNotification'], cacheKey, async () => {
        let query = UserNotification
                .query()
                .where('webpage_id', webpage.primaryKeyValue)
                .where('user_id', this.primaryKeyValue)
                .where('deleted', false)
                .orderBy('created_at_unixms', 'desc')
        
        if (page === undefined) {
          page = 0
        }
        
        if (typeof(page) === 'number') {
          let itemsPerPage = Config.get('view.itemsPerPage')
          query.limit(itemsPerPage)
          query.offset(itemsPerPage * page)
        }
        
        let notifications = await query.fetch()
        return notifications
      })
    }
    
    Model.prototype.getNotificationUnreadCount = async function () {
      let count = await this.notifications()
              .where('has_read', false)
              .count()
      return parseInt(count[0].count, 10)
    }
    /*
    Model.prototype.getNotificationSummary = async function (webpage) {
      let cacheKey = 'getNotificationSummary'
      return await Cache.rememberWait([webpage, this, 'UserNotification'], cacheKey, async () => {
        let notifications = await this.getNotifications(webpage, 0)
        let count = await this.getNotificationCount()
        
        return {
          notifications,
          count
        }
      })
    }
    */
    /*
    Model.prototype.getNotificationNext = async function (webpage, page) {
      let cacheKey = Cache.key('getNotificationNext', page)
      return await Cache.rememberWait([webpage, this, 'UserNotification'], cacheKey, async () => {
        return await this.getNotifications(webpage, page)
      })
    }
     * 
     */
    
    Model.prototype.setNotificationRead = async function (id) {
      let n = await this.notifications()
              .where('id', id)
              .where('has_read', false)
              .fetch()
      
      if (n.size() === 0) {
        return false  // 表示已經讀取了，或是權限不對
      }
      
      n.has_read = true
      await n.save()
      
      return true
    }
  } // register (Model) {
}

module.exports = UserNotification
