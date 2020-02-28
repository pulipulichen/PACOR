'use strict'

const DomainModel = use('App/Models/Domain')
const WebpageModel = use('App/Models/Webpage')
const WebpageGroupModel = use('App/Models/WebpageGroup')
const UserModel = use('App/Models/User')

const Config = use('Config')
const Cache = use('Cache')

const { HttpException } = use('@adonisjs/generic-exceptions') 
const dayjs = use('dayjs')

class WebpageDashboard {
  async info ({request, auth}) {
    let {webpageID, referer} = request.all()
    let webpageInstance
    
    if (!webpageID && referer) {
      webpageInstance = await WebpageModel.findByURL(referer)
      webpageID = webpageInstance.primaryKey
    }
    
    let cacheKey = Cache.key('WebpageDashboard', 'info', webpageID)
    
    return await Cache.rememberWait(['Webpage_' + webpageID], cacheKey, 3, async () => {
      
      if (!webpageInstance) {
        webpageInstance = await WebpageModel
                .query()
                .with('domain')
                .with('groups')
                .where('id', webpageID)
                .pick(1)

        if (webpageInstance === null || webpageInstance.size() === 0) {
          return 0
        }

        webpageInstance = webpageInstance.first()
      }
      else {
        await webpageInstance.load('domain')
        await webpageInstance.load('groups')
      }
      let webpage = webpageInstance.toJSON()

      await auth.checkDomainAdmin(webpage.domain_id)
      webpage.config = webpageInstance.config
      
      await WebpageModel.parseUsersGroupsCount(webpageInstance, webpage)

      let webpageURL = webpage.url
      let output = {
        webpageURL,
        webpage,
        domainID: webpage.domain_id
      }
      //Cache.put(cacheKey, output, 3)
      return output
    })
  }
  
  async groups ({request, auth}) {
    let {webpageID} = request.all()
    let cacheKey = Cache.key('WebpageDashboard', 'group', webpageID)
    
    let webpage = await WebpageModel.find(webpageID)
    await auth.checkDomainAdmin(webpage.domain_id)
    
    return await Cache.get(cacheKey, async () => {
      let outputGroups = await this._getReadersInGroup(webpage)
      let outputNotInGroups = await this._getUsersNotInGroup(webpage, true)
      
      let output = {
        groups: outputGroups,
        notInGroup: outputNotInGroups
      }
      
      //Cache.put(cacheKey, output, 3)
      return output
    })
  }
  
  async _getReadersInGroup (webpage) {
    let groups = await webpage.groups()
            .with('users')
            .fetch()

    //console.log(webpage.groups)
    let outputGroups = []
    for (let i = 0; i < groups.rows.length; i++) {
      let group = groups.rows[i]
      //console.log(group)
      let g = {
        'group_seq_id': group.group_seq_id,
        'users': []
      }

      let users = group.$relations.users.rows
      for (let u = 0; u < users.length; u++) {
        let user = users[u]
        let userJSON = user.toJSON()
        userJSON.readingProgresses = await user.getReadingProgressStatus(webpage)

        userJSON.created_at = dayjs(user.created_at).unix()
        userJSON.latest_log_unixms = await user.getLatestLogUnixMS(webpage)

        // For test
        //userJSON.readingProgresses[0].isCompleted = true
        //userJSON.readingProgresses[0].start_timestamp = 1
        //userJSON.readingProgresses[0].end_timestamp = 10000
        //userJSON.readingProgresses[1].start_timestamp = 10001

        g.users.push(userJSON)
      }
      
      g.users.sort((a, b) => {
        if (b.latest_log_unixms === 0
                && a.latest_log_unixms === 0) {
          return b.created_at - a.created_at
        }
        else {
          return b.latest_log_unixms - a.latest_log_unixms
        }
      })

      outputGroups.push(g)
    }
    return outputGroups
  }
  
  async _getUsersNotInGroup (webpage, excludeNotStartedYet) {
    let readers = await webpage.getUsersNotInGroup(true)

    //console.log(webpage.groups)
    let output = []
    for (let i = 0; i < readers.rows.length; i++) {
      let user = readers.rows[i]
      
      let userJSON = user.toJSON()
      
      userJSON.readingProgresses = await user.getReadingProgressStatus(webpage)
      
      if (excludeNotStartedYet === true) {
        if (typeof(userJSON.readingProgresses[0].start_timestamp) !== 'number') {
          continue
        }
      }
      
      userJSON.created_at = dayjs(user.created_at).unix()
      userJSON.latest_log_unixms = 0
      if (userJSON.latestLog.length > 0) {
        userJSON.latest_log_unixms = parseInt(userJSON.latestLog[0].created_at_unixms, 10)
      }

      output.push(userJSON)
    }
    
    // 排序
    output.sort((a, b) => {
      if (b.latest_log_unixms === 0
              && a.latest_log_unixms === 0) {
        return b.created_at - a.created_at
      }
      else {
        return b.latest_log_unixms - a.latest_log_unixms
      }
    })
    
    return {
      'group_seq_id': -1,
      'users': output
    }
  }
  
  async getIdeaUnits ({request, auth}) {
    let { webpageID } = request.all()
    
    let webpage = await WebpageModel.find(webpageID)
    let article = await webpage.article().fetch()
    if (article) {
      return article.idea_units_note
    }
    else {
      return ''
    }
  }
  
  async setIdeaUnits ({request, auth}) {
    let { webpageID, ideaUnits } = request.all()
    
    let webpage = await WebpageModel.find(webpageID)
    let article = await webpage.article().fetch()
    if (article) {
      article.idea_units_note = ideaUnits
      await article.save()
    }
    else {
      await webpage.article().create({
        idea_units_note: ideaUnits
      })
    }
    
    return true
  }
  
  async exportAllData ({request, auth}) {
    let { webpageID, ideaUnits } = request.all()
    
    let webpage = await WebpageModel.find(webpageID)
    
    return webpageID
  }
  
//  async t () {
//    return 1
//    let webpage = await WebpageModel.find(1)
//    console.log(webpage.primaryKey, webpage.primaryKeyValue)
//    return DomainModel
//            .query()
//            .with('w', webpage)
//            .where('id', 2)
//            .fetch()
//  }
}

module.exports = WebpageDashboard
