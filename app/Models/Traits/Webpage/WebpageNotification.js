'use strict'

//const Cache = use('Cache')
//const { HttpException } = use('@adonisjs/generic-exceptions') 

const UserNotificationModel = use('App/Models/UserNotification')

class WebpageNotification {

  register(Model) {
    
    Model.prototype.addNotification = async function (triggerUser, data) {
      //console.log('addNotification', 1)
      await UserNotificationModel.createFromJSON(this, triggerUser, data)
      //console.log('addNotification', 2, 'end')
    }
    
  } // register (Model) {
}

module.exports = WebpageNotification
