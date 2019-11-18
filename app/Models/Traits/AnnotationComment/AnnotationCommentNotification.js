'use strict'

const UserNotification = use('App/Models/UserNotification')

class AnnotationCommentSave {

  register(Model) {
    Model.addHook('afterSave', async (instance) => {
      let notification = new UserNotification()
      
      notification.webpage_id = instance.webpage_id
      notification.user_id = instance.user_id
      notification.type = instance.anchorType + instance.actionType
      
      let description = instance.toJSON()
      
      notification.description = description
    })
  } // register (Model) {
}

module.exports = AnnotationCommentSave
