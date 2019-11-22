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
  
  async summary ({ request, webpage, user }) {
    let options = request.all()
    return await UserNotificationModel.getSummary(webpage, options)
  }
  
  async older ({request, webpage, user}) {
    let options = request.all()
    return await UserNotificationModel.getOlderNotifications(webpage, user, options)
  }
  
  async read ({request, webpage, user}) {
    let { id } = request.all()
    await UserNotificationModel.setRead(webpage, user, id)
    return 1  // 順利完成
  }
  
}

module.exports = UserNotification