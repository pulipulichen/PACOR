'use strict'

const Cache = use('Cache')
const { HttpException } = use('@adonisjs/generic-exceptions') 

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
              
        if (webpage) {
          query.groupBy('webpage_id')
               .where('webpage_id', webpage.primaryKeyValue)
        }
              
        return query.count('id as count')
      })
    }
    
  } // register (Model) {
}

module.exports = UserFilter
