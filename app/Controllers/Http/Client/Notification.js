'use strict'

const WebpageUserBaseController = use('App/Controllers/Http/Client/WebpageUserBaseController')
const ReadingActivityLog = use ('App/Models/ReadingActivityLog')

const Cache = use('Cache')
const Config = use('Config')

class Notification extends WebpageUserBaseController {
  constructor () {
    super('UserNotification')
  }
  
  async summary ({request, webpage, user}) {
    return await user.getNotificationSummary(webpage)
  }
  
  async next ({request, webpage, user}) {
    let { page } = request.all()
    return await user.getNotificationNext(webpage, page)
  }
  
  async read ({request, webpage, user}) {
    let { id } = request.all()
    await user.setNotificationRead(id)
    return 1  // 順利完成
  }
}

module.exports = Notification