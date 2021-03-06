'use strict'

const WebpageUserBaseController = use('App/Controllers/Http/Client/WebpageUserBaseController')
const ReadingActivityLog = use ('App/Models/ReadingActivityLog')

const Cache = use('Cache')
const Config = use('Config')

const UserNotificationModel = use('App/Models/UserNotification')
//const Cache = use('Cache')
//const Config = use('Config')

//const { HttpException } = use('@adonisjs/generic-exceptions') 

class UserNotification extends WebpageUserBaseController {
  
  constructor () {
    super('UserNotification')
  }
  
  async getNotification ({ request, webpage, user }) {
    let options = request.all()
    return await UserNotificationModel.getInit(webpage, user, options)
  }
  
  async fullInit ({ request, webpage, user }) {
    let options = request.all()
    return await UserNotificationModel.getFullInit(webpage, user, options)
  }
  
  async older ({request, webpage, user}) {
    let options = request.all()
    return await UserNotificationModel.getOlderNotifications(webpage, user, options)
  }
  
  async unreadOlder ({request, webpage, user}) {
    let options = request.all()
    return await UserNotificationModel.getUnreadOlderNotifications(webpage, user, options)
  }
  
  async read ({request, webpage, user}) {
    let { id } = request.all()
    webpage.log(user, 'UserNotification.read', {id})
    UserNotificationModel.setRead(webpage, user, id)
    return 1  // 順利完成
  }
  
}

module.exports = UserNotification