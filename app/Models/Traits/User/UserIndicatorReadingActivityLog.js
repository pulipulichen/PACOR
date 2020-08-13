'use strict'

const Cache = use('Cache')
const { HttpException } = use('@adonisjs/generic-exceptions') 
const UserModel = use('App/Models/User')

const ReadingActivityLogModel = use('App/Models/ReadingActivityLog')

class UserIndicatorLog {

  register(Model) {
    
    /**
     * 計算各種行為操作相關的指標
     * 這個不是為了顯示用的，純粹是為了分析用的
     * 
     * "Annotation.create"
"Annotation.destroy"
"Annotation.floatWidget"
"Annotation.listSummary"
"Annotation.update"
"AnnotationComment.create"
"AnnotationComment.destroy"
"AnnotationComment.update"
"AnnotationRate.like"
"AnnotationRate.likeComment"
"Auth.login"
"Auth.logout"
"ReadingProgress.backToFirstStep"
"ReadingProgress.backToPreviousStep"
"ReadingProgress.clearReadingProgress"
"ReadingProgress.end"
"ReadingProgress.resetRemainingSeconds"
"Section.setChecklist"
"UserFilter.getUserWords"
"UserFilter.initPeerList"
"UserNotification.read"
     * 
     * @param {Webpage} webpage
     * @param {Object} options = {
     *  stepName: 'IndividualReading',
     *  type: ['UserFilter.getUserWords']
     * }
     * @type {JSON}
     */
    Model.prototype.getReadingActivityLogIndicator = async function (webpage, options = {}) {
      let cacheKey = Cache.key('User.getReadingActivityLogIndicator', options)
      
      return await Cache.rememberWait([webpage, this], cacheKey, async () => {
        let query = ReadingActivityLogModel.query()
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
        
        if (options.stepName) {
          let {startTimestamp, endTimestamp} = await this.getReadingProgressTimestamp(webpage, options.stepName)
          
          //console.log(startTimestamp, endTimestamp)
          
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

module.exports = UserIndicatorLog
