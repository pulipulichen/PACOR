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
      let user = await UserModel
              .query()
              .with('domain')
              .where('id', userID)
              .pick(1)

      user = user.first().toJSON()

      await auth.checkDomainAdmin(user.domain_id)

      let webpage = await WebpageModel
              .query()
              .with('domain')
              .where('id', webpageID)
              .pick(1)

      let webpageURL = webpage.first().url
      let output = {
        user,
        webpageURL
      }
      //Cache.put(cacheKey, output, 3)
      return output
    })
  }
}

module.exports = UserDashboard
