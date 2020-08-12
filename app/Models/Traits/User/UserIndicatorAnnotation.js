'use strict'

const Cache = use('Cache')
const { HttpException } = use('@adonisjs/generic-exceptions') 
const UserModel = use('App/Models/User')
const AnnotationModel = use('App/Models/Annotation')

class getAnnotationIndicator {

  register(Model) {
    
    /**
     * 計算各種標註相關的指標
     * 這個不是為了顯示用的，純粹是為了分析用的
     * 
     * @param {Webpage} webpage
     * @param {Object} options = {
     *  includeDeleted: true
     *  stepName: 'IndividualReading',
     *  type: ['Confused']
     * }
     * @type {JSON}
     */
    Model.prototype.getAnnotationIndicator = async function (webpage, options = {}) {
      let cacheKey = Cache.key('User.getAnnotationIndicator', options)
      
      return await Cache.rememberWait([webpage, this], cacheKey, async () => {
        let query = AnnotationModel.query()
                .where('webpage_id', webpage.primaryKeyValue)
                .where('user_id', this.primaryKeyValue)
        
        // -------------------------
        
        if (options.type) {
          let type = options.type
          if (Array.isArray(type)) {
            query.whereIn('type', type)
          }
          else {
            query.where('type', type)
          }
        }
        
        // -------------------------
        
        if (options.includeDeleted === false) {
          query.where('deleted', false)
        }
        
        // -------------------------
        
        if (options.stepName) {
          let {startTimestamp, endTimestamp} = await this.getReadingProgressTimestamp(webpage, options.stepName)
          
          console.log(startTimestamp, endTimestamp)
          
          if (typeof(startTimestamp) === 'number') {
            query.where('created_at_unixms', '>=', startTimestamp)
          }
          if (typeof(endTimestamp) === 'number') {
            query.where('created_at_unixms', '<=', endTimestamp)
          }
        }
        
        // -------------------------
        
        let result = await query.fetch()
        return result.toJSON()
      })
    }
    
  } // register (Model) {
}

module.exports = getAnnotationIndicator
