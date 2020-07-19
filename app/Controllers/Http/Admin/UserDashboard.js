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

class UserDashboard {
  
  async info ({request, auth}) {
    let {webpageID, userID} = request.all()
    let webpage = await AuthHelper.checkDomainAdmin(auth, webpageID)
    
    let cacheKey = Cache.key('UserDashboard', 'info', webpageID, userID)
    
    return await Cache.get(cacheKey, async () => {
      let user = await UserModel
              .query()
              .with('domain')
              .where('id', userID)
              .pick(1)

      user = user.first()
      let userJSON = user.toJSON()
      
      userJSON.readingProgresses = await user.getReadingProgressStatus(webpage, true)
      
      for (let i = 0; i < userJSON.readingProgresses.length; i++) {
        let step = userJSON.readingProgresses[i]
        let stepName = step.step_name
        //console.log(userJSON.readingProgresses[i].log)
        if (stepName === 'IndividualReading'
                || stepName === 'CollaborativeReading') {
          let stat = await this._getAnnotationStatistic(webpage, user, step)
          
          Object.keys(stat).forEach((key) => {
            //console.log(key, stat[key])
            if (!userJSON.readingProgresses[i].log) {
              userJSON.readingProgresses[i].log = {}
            }
            
            userJSON.readingProgresses[i].log[key] = stat[key]
          })
        }
        
        //console.log(stepName)
      }
      
      // -----------------------------
      
      let group = {
        group_seq_id: await user.getGroupSeqID(webpage),
        users: await this._getGroupReaderCard(webpage, user)
      }
      
      //console.log(group.group_seq_id)
      
      // -----------------------------

      let webpageURL = webpage.url
      let output = {
        user: userJSON,
        webpageURL: webpageURL,
        group
      }
      Cache.put(cacheKey, output, 0.5)
      return output
    })
  }
  
  async _getGroupReaderCard (webpage, anchorUser) {
    let output = []
    let users = await anchorUser.getUsersInGroup(webpage, false)
    for (let u = 0; u < users.length; u++) {
      let userJSON = users[u]
      let user = await UserModel.find(userJSON.id)
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
  
  async _getAnnotationStatistic(webpage, user, step) {
    let {start_timestamp, end_timestamp} = step
    
    let annotation_count = await user.countAnnotations(webpage, start_timestamp, end_timestamp)
    let word_count = await user.countAnnotationNoteWords(webpage, start_timestamp, end_timestamp)
    let type_count = await user.countAnnotationTypes(webpage, start_timestamp, end_timestamp)
    let section_notes = await user.getSectionNotes(webpage, start_timestamp, end_timestamp)
    let comments = await user.getComments(webpage, start_timestamp, end_timestamp)
    let commented = await user.getCommented(webpage, start_timestamp, end_timestamp)
    let rates = await user.getRates(webpage, start_timestamp, end_timestamp)
    let rated = await user.getRated(webpage, start_timestamp, end_timestamp)
    
    //console.log(user.primaryKeyValue)
    //console.log(commented)
    return {
      annotation_count,
      type_count,
      word_count,
      section_notes,
      comments,
      commented,
      rates,
      rated
    }
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
  
  async step ({request, auth}) {
    let {webpageID, userID, stepName} = request.all()
    await this._checkDomainAdmin(auth, webpageID)
    
    let cacheKey = Cache.key('UserDashboard', stepName, webpageID, userID)
    return await Cache.get(cacheKey, async () => {
      let step = await ReadingProgressModel
              .query()
              .where('step_name', stepName)
              .where('user_id', userID)
              .where('webpage_id', webpageID)
              .pick(1)
      
      if (step.size() === 0) {
        return ''
      }
      step = step.first().toJSON()
      let output = step
      //console.log(output)
      //Cache.put(cacheKey, output, 0.5)
      return output
    })
  }
}

module.exports = UserDashboard
