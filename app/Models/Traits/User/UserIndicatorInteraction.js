'use strict'

const Cache = use('Cache')
const { HttpException } = use('@adonisjs/generic-exceptions') 
const UserModel = use('App/Models/User')
const AnnotationCommentModel = use('App/Models/AnnotationComment')

class UserIndicatorInteraction {

  register(Model) {
    
    /**
     * 計算各種互動相關的指標
     * 這個不是為了顯示用的，純粹是為了分析用的
     * 
     * @param {Webpage} webpage
     * @param {Object} options = {
     *  includeCommentDeleted: true,
     *  includeAnnotationDeleted: true,
     *  includeMyself: false,
     *  stepName: 'IndividualReading',
     *  uniqleThreads: true,
     * }
     * @type {JSON}
     */
    Model.prototype.getCommentIndicator = async function (webpage, options = {}) {
      let cacheKey = Cache.key('User.getCommentIndicator', options)
      
      return await Cache.rememberWait([webpage, this], cacheKey, async () => {
        let query = AnnotationCommentModel.query()
                .where('user_id', this.primaryKeyValue)
                .whereHas('annotation', (builder) => {
                  builder.where('webpage_id', webpage.primaryKeyValue)
          
                  if (options.includeAnnotationDeleted === false) {
                    query.where('deleted', false)
                  }
                  
                  if (options.includeMyself === false) {
                    query.whereNot('user_id', this.primaryKeyValue)
                  }
                }, '>', 0)
        
        
        // -------------------------
        
        if (options.includeCommentDeleted === false) {
          query.where('deleted', false)
        }
        
        // -------------------------
        
        if (options.stepName) {
          let {startTimestamp, endTimestamp} = await this.getReadingProgressTimestamp(webpage, options.stepName)
          
          if (typeof(startTimestamp) === 'number') {
            query.where('created_at_unixms', '>=', startTimestamp)
          }
          if (typeof(endTimestamp) === 'number') {
            query.where('created_at_unixms', '<=', endTimestamp)
          }
        }
        
        // -------------------------
        
        let result = await query.fetch()
        let resultJSON = result.toJSON()
        
        // -------------------------
        
        if (options.uniqleThreads === false) {
          return resultJSON
        }
        
        // -------------------------
        
        let threadMap = {}
        
        resultJSON.forEach(comment => {
          let annotationID = comment.annotation_id
          
          if (typeof(threadMap[annotationID]) === 'undefined') {
            threadMap[annotationID] = comment
            return false  // 沒有重複
          }
          
          let note = comment.note
          
          threadMap[annotationID].note = threadMap[annotationID].note 
                  + ' ' + note
          return true // 有重複
        })
        
        resultJSON = Object.keys(threadMap).map(annotationID => threadMap[annotationID])
        return resultJSON
      })
    }
    
  } // register (Model) {
}

module.exports = UserIndicatorInteraction
