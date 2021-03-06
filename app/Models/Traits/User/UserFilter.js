'use strict'

const Cache = use('Cache')
const { HttpException } = use('@adonisjs/generic-exceptions') 
const UserModel = use('App/Models/User')
const AnnotationModel = use('App/Models/Annotation')

class UserFilter {

  register(Model) {
    
    Model.prototype.getPeers = async function (webpage) {
      if (!webpage) {
        throw new Error('Webpage object is required.')
      }
      
      let types = await this.getStepHighlightAnnotationTypes(webpage)
      
      let query = UserModel
              .query()
              .where('domain_id', this.domain_id)
              .whereHas('readingProgresses', builder => {
                builder.where('webpage_id', webpage.primaryKeyValue)
                       .limit(1)
              }) // 至少要在這個網頁有進度
              .withCount('annotations', builder => {
                builder.where('webpage_id', webpage.primaryKeyValue)
                        //.whereNot('type', 'SectionMainIdea')
                        .whereIn('type', types)
                        .where('deleted', false)
              })
              .setVisible(['id', 'username', 'display_name', 'role', 'avatar_url'])

      if (this.isAdmin()) {
        query.with('groups', builder => {
                builder.where('webpage_id', webpage.primaryKeyValue)
              })
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
    
    Model.prototype.getStepAnnotationTypeCounts = async function (webpage) {
      let cacheKey = Cache.key('getStepAnnotationTypeCounts', this.primaryKeyValue)
      
      let tags = []
      if (webpage) {
        tags.push(webpage)
      }
      tags.push(this)
      
      return await Cache.rememberWait(tags, cacheKey, async () => {
        let query = this.hasMany('App/Models/Annotation')
                      .groupBy('type')
                      .select(['type'])
        
        // 包含小節重點
        //let types = await this.getStepHighlightAnnotationTypes(webpage)
        let types = await this.getStepAnnotationTypes(webpage)
//        if (this.primaryKeyValue === 516) {
//          console.log(types)
//        }
        query.whereIn('type', types)
        
        if (webpage) {
          query.groupBy('webpage_id')
               .where('webpage_id', webpage.primaryKeyValue)
        }
        
//        if (this.primaryKeyValue === 516) {
//          console.log(await query.count('id as count'))
//        }
        
        return await query.count('id as count')
      })
    }
    
  } // register (Model) {
}

module.exports = UserFilter
