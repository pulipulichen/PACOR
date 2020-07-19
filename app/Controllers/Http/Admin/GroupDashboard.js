'use strict'

const DomainModel = use('App/Models/Domain')
const WebpageModel = use('App/Models/Webpage')
const WebpageGroupModel = use('App/Models/WebpageGroup')
const ReadingProgressModel = use('App/Models/ReadingProgress')
const UserModel = use('App/Models/User')

const AuthHelper = use('App/Helpers/AuthHelper')

const Config = use('Config')
const Cache = use('Cache')

const { HttpException } = use('@adonisjs/generic-exceptions') 
const dayjs = use('dayjs')

class GroupDashboard {
  
  async info ({request, auth}) {
    let {webpageID, groupID} = request.all()
    let webpage = await AuthHelper.checkDomainAdmin(auth, webpageID)
    
    let cacheKey = Cache.key('GroupDashboard', 'info', webpageID, groupID)
    
    return await Cache.get(cacheKey, async () => {
      
      let users = await this._getGroupReaderCard(webpage, groupID)
      let collaborativeReadingTimes = this._calcCollaborativeReadingTimes(users)
      let group = {
        users,
        collaborativeReadingTimes
      }
      
      //console.log(group.group_seq_id)
      
      // -----------------------------

      let webpageURL = webpage.url
      let output = {
        webpageURL: webpageURL,
        group
      }
      Cache.put(cacheKey, output, 0.5)
      return output
    })
  }
  
  async _getGroupReaderCard (webpage, groupID) {
    let output = []
    let group = await webpage.getGroup(groupID)
    let users = await group.users().fetch()
    let usersJSON = users.toJSON()
    for (let u = 0; u < usersJSON.length; u++) {
      let user = users.nth(u)
      let userJSON = usersJSON[u]
      //let userJSON = user.toJSON()
      userJSON.readingProgresses = await user.getReadingProgressStatus(webpage)

      userJSON.created_at = dayjs(user.created_at).unix()
      userJSON.latest_log_unixms = await user.getLatestLogUnixMS(webpage)

      // For test
      //userJSON.readingProgresses[0].isCompleted = true
      //userJSON.readingProgresses[0].start_timestamp = 1
      //userJSON.readingProgresses[0].end_timestamp = 10000
      //userJSON.readingProgresses[1].start_timestamp = 10001

      output.push(userJSON)
    }
    
    return output
  }
  
  _calcCollaborativeReadingTimes (users) {
    let firstTimestamp, lastTimestamp
    
    users.forEach(user => {
      if (Array.isArray(user.readingProgresses) === false) {
        return false
      }
      
      for (let i = 0; i < user.readingProgresses.length; i++) {
        let step = user.readingProgresses[i]
        
        if (step.step_name !== "CollaborativeReading") {
          continue
        }
        
        let {start_timestamp, end_timestamp} = step
        if (!firstTimestamp || firstTimestamp > start_timestamp) {
          firstTimestamp = start_timestamp
        }
        if (!lastTimestamp || lastTimestamp < end_timestamp) {
          lastTimestamp = end_timestamp
        }
        break
      }
    })
    
    let middleTimestamp = Math.round((firstTimestamp + lastTimestamp) / 2)
    
    return [
      firstTimestamp,
      middleTimestamp,
      lastTimestamp
    ]
  }
}

module.exports = GroupDashboard
