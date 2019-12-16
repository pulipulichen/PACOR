'use strict'

const Cache = use('Cache')
const { HttpException } = use('@adonisjs/generic-exceptions') 
const UserModel = use('App/Models/User')
const AnnotationModel = use('App/Models/Annotation')

class UserFilter {

  register(Model) {
    
    //Model.prototype.getAnnotationTypes = async function (webpage) {
    Model.prototype.getHighlightAnnotationTypes = async function (webpage) {
      let cacheKey = Cache.key('getHighlightAnnotationTypes')
      
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
        let types = await this.getStepHighlightAnnotationTypes(webpage)
        query.whereIn('type', types)
        
        if (webpage) {
          query.groupBy('webpage_id')
               .where('webpage_id', webpage.primaryKeyValue)
        }
              
        return query.count('id as count')
      })
    } // Model.prototype.getHighlightAnnotationTypes = async function (webpage) {
    
    //Model.prototype.getAnnotationTypes = async function (webpage) {
    Model.prototype.getWebpageHighlightAnnotationTypes = async function (webpage) {
      let cacheKey = Cache.key('getWebpageHighlightAnnotationTypes')
      
      let tags = []
      if (webpage) {
        tags.push(webpage)
      }
      tags.push(this)
      
      // ----------------------------
      
      return await Cache.rememberWait(tags, cacheKey, async () => {
        
        let query = AnnotationModel.query()
                      .groupBy('type')
                      .select(['type'])
        
        // 排除小結重點
        let types = await this.getStepHighlightAnnotationTypes(webpage)
        query.whereIn('type', types)
        
        if (webpage) {
          query.groupBy('webpage_id')
               .where('webpage_id', webpage.primaryKeyValue)
        }
        
        // 篩選同儕
        if (this.isAdmin()) {
          // 不篩選，全部都選擇
        }
        else if (await this.isInAnonymousGroup(webpage)) {
          let userIdList = await webpage.getUserIDsInGroups()
          if (userIdList && userIdList.length > 0) {
            query.whereIn('user_id', userIdList)
          }
        }
        else {
          let userIdList = await this.getOtherUserIDsInGroup(webpage)
          if (userIdList && userIdList.length > 0) {
            query.whereIn('user_id', userIdList)
          }
        }

        return query.count('id as count')
      })
    } // Model.prototype.getHighlightAnnotationTypes = async function (webpage) {
    
  } // register (Model) {
}

module.exports = UserFilter
