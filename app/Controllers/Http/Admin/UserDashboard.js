'use strict'

const DomainModel = use('App/Models/Domain')
const WebpageModel = use('App/Models/Webpage')
const WebpageGroupModel = use('App/Models/WebpageGroup')
const UserModel = use('App/Models/User')

const Config = use('Config')
const Cache = use('Cache')

const { HttpException } = use('@adonisjs/generic-exceptions') 

class UserDashboard {
  async info ({request, auth}) {
    let {webpageID, userID} = request.all()
    let cacheKey = Cache.key('UserDashboard', 'info', webpageID, userID)
    
    return await Cache.get(cacheKey, async () => {
      let webpage = await WebpageModel
              .query()
              .with('domain')
              .where('id', webpageID)
              .pick(1)

      let user = await UserModel
              .query()
              .with('domain')
              .where('id', userID)
              .pick(1)

      user = user.first()
      let userJSON = user.toJSON()
      
      userJSON.readingProgresses = await user.getReadingProgressStatus(webpage)

      await auth.checkDomainAdmin(user.domain_id)

      let webpageURL = webpage.first().url
      let output = {
        user: userJSON,
        webpageURL: webpageURL
      }
      //Cache.put(cacheKey, output, 3)
      return output
    })
  }
}

module.exports = UserDashboard
