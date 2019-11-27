'use strict'

const UserModel = use('App/Models/User')
const UserNotificationModel = use('App/Models/UserNotification')

const AnnotationModel = use('App/Models/Annotation')
const AnnotationCommentModel = use('App/Models/AnnotationComment')

const { HttpException } = use('@adonisjs/generic-exceptions') 

const Cache = use('Cache')

class UserNotificationSave {

  register(Model) {
    
//    Model.createFromModelInstance = async function (webpage, triggerUser, data = {}) {
//      let {
//        triggerInstance,
//        anchorModel,
//        anchorID,
//        notifiedUserID, 
//        summary
//      } = data
//      
//      let anchorModel = triggerInstance.constructor.name
//      let anchorModelID = triggerInstance.primaryKeyValue
//      
//      if (Array.isArray(notifiedUserID) === false) {
//        notifiedUserID = [notifiedUserID]
//      }
//      
//      for (let i = 0; i < notifiedUserID.length; i++) {
//        let nID = notifiedUserID[i]
//        
//        await this.createFromJSON(webpage, triggerUser, {
//          anchorModel,
//          anchorModelID,
//          notifiedUserID: nID,
//          summary
//        })
//      }
//      return 1
//    }
    
    Model.createFromJSON = async function (webpage, triggerUser, data) {
      let {
        triggerInstance,
        triggerModel,
        triggerModelID,
        
        anchorInstance,
        anchorModel,
        anchorModelID,
        
        notifiedUserID,
        summary
      } = data
      //console.log(data)
      
      // 如果沒有設對象，表示全域廣播
      if (notifiedUserID === undefined) {
        notifiedUserID = await triggerUser.getUserIDsInGroup(webpage)
      }
      
      
      if (Array.isArray(notifiedUserID)) {
        let d = {
          ...data
        }
        for (let i = 0; i < notifiedUserID.length; i++) {
          d.notifiedUserID = notifiedUserID[i]
          await this.createFromJSON(webpage, triggerUser, d)
        }
        return null
      }
      
      // -------------------------------------------
      
      if (!triggerModel && !triggerModelID && triggerInstance) {
        triggerModel = triggerInstance.constructor.name
        triggerModelID = triggerInstance.primaryKeyValue
      }
      
      if (!anchorModel && !anchorModelID && anchorInstance) {
        anchorModel = anchorInstance.constructor.name
        anchorModelID = anchorInstance.primaryKeyValue
      }
      
      if (notifiedUserID === triggerUser.primaryKeyValue) {
        return null // 這個表示不增加通知
      }
      
      if (typeof(triggerModel) !== 'string'
              || typeof(triggerModel) !== 'number'
              || typeof(notifiedUserID) !== 'number') {
        throw new HttpException('Anchor model, anchor model ID and notified user ID are required.')
      }
      
      // -------------------------------------
      
      await Cache.forgetWithTags([webpage, triggerUser, this])
      
      // -------------------------------------
      // 排除重複的
      
      let checkQueryData = {
        webpage_id: webpage.primaryKeyValue,
        trigger_user_id: triggerUser.primaryKeyValue,
        user_id: notifiedUserID,
        trigger_model: triggerModel,
        anchor_model: anchorModel,
        anchor_model_id: anchorModelID,
        has_read: false,
        deleted: false
      }
      
      let sameTypeNotification = await UserNotificationModel
              .query()
              .where({
                webpage_id: webpage.primaryKeyValue,
                trigger_user_id: triggerUser.primaryKeyValue,
                user_id: notifiedUserID,
                trigger_model: triggerModel,
                anchor_model: anchorModel,
                anchor_model_id: anchorModelID,
                has_read: false,
                deleted: false
              })
              .limit(1)
              .getCount()
      
      if (sameTypeNotification > 0) {
        console.log('有同類型的通知了')
        return null
      }
      
      // -------------------------------------
      // 真正開始新增
      
      let findData = {
        webpage_id: webpage.primaryKeyValue,
        trigger_user_id: triggerUser.primaryKeyValue,
        user_id: notifiedUserID,
        trigger_model: triggerModel,
        trigger_model_id: triggerModelID,
        anchor_model: anchorModel,
        anchor_model_id: anchorModelID,
      }
      
      let createData = {
        ...findData
      }
      
      //console.log(queryData)
      
      if (summary) {
        if (typeof(summary) !== 'object') {
          summary = {
            summary
          }
        }
        
        createData.summary = summary
      }
      
      let notification = await UserNotificationModel.findOrCreate(findData, createData)
      
      // --------------------------------------
      
      let user = await notification.user().fetch()
      await Cache.forgetWithTags([webpage, user, this])
      
      
      return notification
    }
    
    Model.setRead = async function (webpage, user, notificationID) {
      
      // 先檢查權限
      if (typeof(notificationID) === 'string'
              && isNaN(notificationID) === false) {
        notificationID = parseInt(notificationID, 10)
      }
      if (typeof(notificationID) !== 'number') {
        throw new HttpException('Notification ID is required')
      }
      
      // --------------------------------
      
      let notification = await UserNotificationModel.find(notificationID)
      
      if (!notification
              || notification.webpage_id !== webpage.primaryKeyValue
              || notification.user_id !== user.primaryKeyValue) {
        throw new HttpException('Forbidden', 403)
      }
      
      if (notification.has_read === false) {
        notification.has_read = true
        await notification.save()
      }
      
      await Cache.forgetWithTags([webpage, user, this])
      
      return notification
    } // Model.setRead = async function (webpage, user, notificationID) {
    
    
    
  } // register (Model) {
}

module.exports = UserNotificationSave
