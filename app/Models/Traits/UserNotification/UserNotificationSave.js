'use strict'

const UserModel = use('App/Models/User')
const UserNotificationModel = use('App/Models/UserNotification')

const AnnotationModel = use('App/Models/Annotation')
const AnnotationCommentModel = use('App/Models/AnnotationComment')

const { HttpException } = use('@adonisjs/generic-exceptions') 

const Cache = use('Cache')

class UserNotificationSave {

  register(Model) {
    
    Model.createFromModelInstance = async function (webpage, triggerUser, instance, notifiedUserID, summary) {
      let anchorModel = instance.constructor.name
      let anchorModelID = instance.primaryKeyValue
      
      return await this.createFromJSON(webpage, triggerUser, {
        anchorModel,
        anchorModelID,
        notifiedUserID,
        summary
      })
    }
    
    Model.createFromJSON = async function (webpage, triggerUser, data) {
      let {
        anchorModel,
        anchorModelID,
        notifiedUserID,
        summary
      } = data
      
      if (typeof(anchorModel) !== 'string'
              || typeof(anchorModelID) !== 'number'
              || typeof(notifiedUserID) !== 'number') {
        throw new HttpException('Anchor model, anchor model ID and notified user ID are required.')
      }
      
      // -------------------------------------
      let findData = {
        webpage_id: webpage.primaryKeyValue,
        user_id: notifiedUserID,
        model: anchorModel,
        model_id: anchorModelID
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
      
      if (notification.read === false) {
        notification.read = true
        await notification.save()
      }
      
      await Cache.forgetWithTags([webpage, user, this])
      
      return notification
    } // Model.setRead = async function (webpage, user, notificationID) {
    
    
    
  } // register (Model) {
}

module.exports = UserNotificationSave
