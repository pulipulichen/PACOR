'use strict'

const DomainModel = use('App/Models/Domain')
const WebpageModel = use('App/Models/Webpage')
const WebpageGroupModel = use('App/Models/WebpageGroup')
const UserModel = use('App/Models/User')

const Config = use('Config')
const Cache = use('Cache')

const { HttpException } = use('@adonisjs/generic-exceptions') 

class Dashboard {
  async info ({request, auth}) {
    let {webpageID} = request.all()
    let cacheKey = Cache.key('Dashboard', 'info', webpageID)
    
    return await Cache.get(cacheKey, async () => {
      let webpage = await WebpageModel
              .query()
              .with('domain')
              .where('id', webpageID)
              .pick(1)

      webpage = webpage.first().toJSON()

      await auth.checkDomainAdmin(webpage.domain_id)

      let webpageURL = webpage.url
      let output = {
        webpageURL
      }
      Cache.put(cacheKey, output, 3)
      return output
    })
  }
  
  async groups ({request, auth}) {
    let {webpageID} = request.all()
    let cacheKey = Cache.key('Dashboard', 'group', webpageID)
    
    let webpage = await WebpageModel.find(webpageID)
    await auth.checkDomainAdmin(webpage.domain_id)
    
    return await Cache.get(cacheKey, async () => {
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
          
          // For test
          //userJSON.readingProgresses[0].isCompleted = true
          //userJSON.readingProgresses[0].start_timestamp = 1
          //userJSON.readingProgresses[0].end_timestamp = 10000
          //userJSON.readingProgresses[1].start_timestamp = 10001
          
          g.users.push(userJSON)
        }
        
        outputGroups.push(g)
      }
      
      
      let output = {
        groups: outputGroups
      }
      //Cache.put(cacheKey, output, 3)
      return output
    })
      
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

module.exports = Dashboard
