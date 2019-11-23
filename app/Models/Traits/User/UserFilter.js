'use strict'

const Cache = use('Cache')
const { HttpException } = use('@adonisjs/generic-exceptions') 

class UserFilter {

  register(Model) {
    
    Model.prototype.getAnnotationTypes = async function (webpage) {
      let cacheKey = Cache.key('method')
      
      let tags = []
      if (webpage) {
        tags.push(webpage)
      }
      tags.push(this)
      
      return await Cache.rememberWait(tags, cacheKey, async () => {
        return await this.hasMany('App/Models/Annotation')
                      .groupBy('type')
                      .select(['type'])
                      .count('id as count')
      })
        
    }
    
  } // register (Model) {
}

module.exports = UserFilter
