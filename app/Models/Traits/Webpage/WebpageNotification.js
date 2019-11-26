'use strict'

//const Cache = use('Cache')
//const { HttpException } = use('@adonisjs/generic-exceptions') 

const UserNotificationModel = use('App/Models/UserNotification')

class WebpageNotification {

  register(Model) {
    
    Model.prototype.addNotification = async function (triggerUser, instance, notifiedUserID, summary) {
      return UserNotificationModel.createFromModelInstance(this, triggerUser, instance, notifiedUserID, summary)
    }
    
  } // register (Model) {
}

module.exports = WebpageNotification
