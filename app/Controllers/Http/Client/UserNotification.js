'use strict'

const Annotation = use('App/Controllers/Http/Client/Annotation')

const ReadingActivityLog = use ('App/Models/ReadingActivityLog')

const UserNotificationModel = use('App/Models/UserNotification')
//const Cache = use('Cache')
//const Config = use('Config')

//const { HttpException } = use('@adonisjs/generic-exceptions') 

class UserNotification extends Annotation {
  
  async unreadCount({request, webpage, user}) {
    const data = request.all()
    return await UserNotificationModel.getUnreadCount(webpage, user, data)
    //throw new Error('@TODO UserNotification.count()')
  }
  
  async read({request, webpage, user}) {
    const {notificationID} = request.all()
    return await UserNotificationModel.setRead(webpage, user, notificationID)
  }
  
}

module.exports = UserNotification