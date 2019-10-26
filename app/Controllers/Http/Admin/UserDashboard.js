'use strict'

const DomainModel = use('App/Models/Domain')
const WebpageModel = use('App/Models/Webpage')
const WebpageGroupModel = use('App/Models/WebpageGroup')
const ReadingProgressModel = use('App/Models/ReadingProgress')
const UserModel = use('App/Models/User')

const Config = use('Config')
const Cache = use('Cache')

const { HttpException } = use('@adonisjs/generic-exceptions') 

class UserDashboard {
  async info ({request, auth}) {
    let {webpageID, userID} = request.all()
    let webpage = await this._checkDomainAdmin(auth, webpageID)
    
    let cacheKey = Cache.key('UserDashboard', 'info', webpageID, userID)
    
    return await Cache.get(cacheKey, async () => {
      let user = await UserModel
              .query()
              .with('domain')
              .where('id', userID)
              .pick(1)

      user = user.first()
      let userJSON = user.toJSON()
      
      userJSON.readingProgresses = await user.getReadingProgressStatus(webpage)

      let webpageURL = webpage.url
      let output = {
        user: userJSON,
        webpageURL: webpageURL
      }
      Cache.put(cacheKey, output, 0.5)
      return output
    })
  }
  
  async _checkDomainAdmin(auth, webpageID) {
    let webpage = await WebpageModel
              .query()
              .where('id', webpageID)
              .pick(1)
    webpage = webpage.first()
    await auth.checkDomainAdmin(webpage.domain_id)
    return webpage
  }
  
  async PreImaginary ({request, auth}) {
    let {webpageID, userID} = request.all()
    await this._checkDomainAdmin(auth, webpageID)
    
    let cacheKey = Cache.key('UserDashboard', 'PreImaginary', webpageID, userID)
    //return await Cache.get(cacheKey, async () => {
      let step = await ReadingProgressModel
              .query()
              .where('user_id', userID)
              .where('webpage_id', webpageID)
              .fetch()
      
      step = step.first().toJSON()
      
      let output = step
      //console.log(output)
      //Cache.put(cacheKey, output, 0.5)
      return output
    //})
  }
}

module.exports = UserDashboard
