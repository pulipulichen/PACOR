'use strict'

//const Cache = use('Cache')
//const { HttpException } = use('@adonisjs/generic-exceptions') 

const UserNotificationModel = use('App/Models/UserNotification')

class WebpageNotification {

  register(Model) {
    
    Model.prototype.addNotification = async function (triggerUser, data) {
      return UserNotificationModel.createFromJSON(this, triggerUser, data)
    }
    
  } // register (Model) {
}

module.exports = WebpageNotification
