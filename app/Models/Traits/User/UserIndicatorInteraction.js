'use strict'

const Cache = use('Cache')
const { HttpException } = use('@adonisjs/generic-exceptions') 
const UserModel = use('App/Models/User')
const AnnotationCommentModel = use('App/Models/AnnotationComment')

const AnnotationRateModel = use('App/Models/AnnotationRate')
const AnnotationCommentRateModel = use('App/Models/AnnotationCommentRate')

class UserIndicatorInteraction {

  register(Model) {
    
    /**
     * 計算各種建議的指標
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
    
    /**
     * 計算各種喜愛的指標
     * 這個不是為了顯示用的，純粹是為了分析用的
     * 
     * @param {Webpage} webpage
     * @param {Object} options = {
     *  includeRateDeleted: false
     *  includeAnchorDeleted: true,
     *  anchorType: ['annotation', 'comment'],
     *  stepName: 'IndividualReading',
     *  type: ['like']
     * }
     * @type {JSON}
     */
    Model.prototype.getRateIndicator = async function (webpage, options = {}) {
      let cacheKey = Cache.key('User.getRateIndicator', options)
      
      return await Cache.rememberWait([webpage, this], cacheKey, async () => {
        
        let output = []
        
        // ----------------------
        
        let anchorType = options.anchorType
        if (!anchorType) {
          anchorType = ['annotation', 'comment']
        }
        else if (typeof(anchorType) === 'string') {
          anchorType = [anchorType]
        }
        
        // ----------------------
        let type
        if (options.type) {
          type = options.type
        }
        
        // ----------------------
        let startTimestamp, endTimestamp
        if (options.stepName) {
          // 不行，現在timestamp不能運作，請不要考慮他
          throw new Error('options.stepName for rate is not work')
          
          let timestamps = await this.getReadingProgressTimestamp(webpage, options.stepName)
          startTimestamp = timestamps.startTimestamp
          endTimestamp = timestamps.endTimestamp
        }
        
        // ----------------------
        
        if (anchorType.indexOf('annotation') > -1) {
          let query = AnnotationRateModel.query()
                  .where('user_id', this.primaryKeyValue)
                  .whereHas('annotation', (builder) => {
                    builder.where('webpage_id', webpage.primaryKeyValue)

                    if (options.includeAnchorDeleted === false) {
                      builder.where('deleted', false)
                    }

                  }, '>', 0)
                  
          if (options.includeRateDeleted === false) {
            query.where('deleted', false)
          }
          
          if (Array.isArray(type)) {
            query.whereIn('type', type)
          }
          else if (typeof(type) === 'string') {
            query.where('type', type)
          }
          
          // ---------------------------
          let result = await query.fetch()
          let resultJSON = result.toJSON()
          output = output.concat(resultJSON)
        } // if (anchorType.indexOf('annotation') > -1) {
        
        // -----------------------
        
        if (anchorType.indexOf('comment') > -1) {
          let query = AnnotationCommentRateModel.query()
                  .where('user_id', this.primaryKeyValue)
                  .whereHas('comment', (commentBuilder) => {
                    
                    if (options.includeAnchorDeleted === false) {
                      commentBuilder.where('deleted', false)
                    }
                    
                    commentBuilder.whereHas('annotation', (annotationBuilder) => {
                      annotationBuilder.where('webpage_id', webpage.primaryKeyValue)
                      
                      if (options.includeAnchorDeleted === false) {
                        annotationBuilder.where('deleted', false)
                      }
                    }, '>', 0)
                  }, '>', 0)
                  
          if (options.includeRateDeleted === false) {
            query.where('deleted', false)
          }
          
          if (Array.isArray(type)) {
            query.whereIn('type', type)
          }
          else if (typeof(type) === 'string') {
            query.where('type', type)
          }
          
          // ---------------------------
          let result = await query.fetch()
          let resultJSON = result.toJSON()
          output = output.concat(resultJSON)
        } // if (anchorType.indexOf('annotation') > -1) {
        
        
        // -----------------------
        
        return output
      })
    }
    
  } // register (Model) {
}

module.exports = UserIndicatorInteraction
