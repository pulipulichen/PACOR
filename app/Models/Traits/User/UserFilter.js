'use strict'

const Cache = use('Cache')
const { HttpException } = use('@adonisjs/generic-exceptions') 
const UserModel = use('App/Models/User')

class UserFilter {

  register(Model) {
    
    Model.prototype.getAnnotationTypes = async function (webpage) {
      let cacheKey = Cache.key('getAnnotationTypes')
      
      let tags = []
      if (webpage) {
        tags.push(webpage)
      }
      tags.push(this)
      
      return await Cache.rememberWait(tags, cacheKey, async () => {
        let query = this.hasMany('App/Models/Annotation')
                      .groupBy('type')
                      .select(['type'])
        
        // 排除小結重點
        query.whereNot('type', 'SectionMainIdea')
        
        if (webpage) {
          query.groupBy('webpage_id')
               .where('webpage_id', webpage.primaryKeyValue)
        }
              
        return query.count('id as count')
      })
    }
    
    Model.prototype.getPeers = async function (webpage) {
      if (!webpage) {
        throw new Error('Webpage object is required.')
      }
      
      let query = UserModel
              .query()
              .where('domain_id', this.domain_id)
              .whereHas('readingProgresses', builder => {
                builder.where('webpage_id', webpage.primaryKeyValue)
                       .limit(1)
              }) // 至少要在這個網頁有進度
              .setVisible(['id', 'username', 'display_name', 'role', 'avatar_url'])

      if (this.isAdmin()) {
        // 不做限制...嗎？
      }
      else {
        let isInAnonymousGroup = await this.isInAnonymousGroup(webpage)
        if (isInAnonymousGroup === false) {
          let userIDs = await this.getUserIDsInGroup(webpage, true)
          query.whereIn('id', userIDs)
        }
        else {
          let userIdList = await webpage.getUserIDsInGroups()
          if (userIdList !== null) {
            query.whereNotIn('id', userIdList)
          }
        }
      }

      let users = await query.fetch()
      return users
    }
    
    Model.prototype.getPeersIDList = async function (webpage) {
      let cacheKey = Cache.key('getPeersIDList')
      
      let tags = []
      if (webpage) {
        tags.push(webpage)
      }
      tags.push(this)
      
      return await Cache.rememberWait(tags, cacheKey, async () => {
        let users = await this.getPeers(webpage)
        let idList = []
        for (let i = 0; i < users.size(); i++) {
          idList.push(users.nth(i).primaryKeyValue)
        }
        return idList
      })
    }
    
  } // register (Model) {
}

module.exports = UserFilter
