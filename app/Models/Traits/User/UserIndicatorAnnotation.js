'use strict'

const Cache = use('Cache')
const { HttpException } = use('@adonisjs/generic-exceptions') 
const UserModel = use('App/Models/User')
const AnnotationModel = use('App/Models/Annotation')

const StringHelper = use('App/Helpers/StringHelper')
const TokenizationHelper = use('App/Helpers/TokenizationHelper')

const AnchorPositionMapHelper = use('App/Helpers/AnchorPositionMapHelper')

class UserIndicatorAnnotation {

  register(Model) {
    
    /**
     * 計算各種標註相關的指標
     * 這個不是為了顯示用的，純粹是為了分析用的
     * 
     * @param {Webpage} webpage
     * @param {Object} options = {
     *  includeDeleted: true
     *  stepName: 'IndividualReading',
     *  type: ['Confused'],
     *  withAnchorPositions: false,
     *  withNotes: false,
     *  withComments: false,
     *  withInteractUserList: false
     * }
     * @type {JSON}
     */
    Model.prototype.getAnnotationIndicator = async function (webpage, options = {}) {
      let cacheKey = Cache.key('User.getAnnotationIndicator', options)
      
//      if (options.stepName === 'CollaborativeReading') {
//        throw new Error('step is CollaborativeReading')
//      }
      
      return await Cache.rememberWait([webpage, this], cacheKey, async () => {
        //console.log('getAnnotationIndicator', 1)
        let query = AnnotationModel.query()
                .where('webpage_id', webpage.primaryKeyValue)
                .where('user_id', this.primaryKeyValue)
                .orderBy('created_at_unixms', 'asc')
        
        // -------------------------
        //console.log('getAnnotationIndicator', 2)
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
        
        if (options.withAnchorPositions === true) {
          query.with('anchorPositions')
        }
        
        if (options.withNotes === true) {
          query.with('notes')
        }
        
        if (options.withComments === true) {
          query.with('comments')
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
        //console.log('getAnnotationIndicator', 3)
        let result = await query.fetch()
        
        //console.log('getAnnotationIndicator', 4)
        let resultJSON = result.toJSON()
        
        if (options.withInteractUserList === true) {
          for (let i = 0; i < result.size(); i++) {
            let interactUserList = await result.nth(i).getInteractUserList()
            let interactUserListUnique = await result.nth(i).getInteractUserUniqueList()
            resultJSON[i].interactUserList = interactUserList
            resultJSON[i].interactUserListUnique = interactUserListUnique
          }
        }
        
        return resultJSON
      })
    }
    
    /**
     * 計算各種留言相關的指標
     * 包含annotation跟comment
     * 這個不是為了顯示用的，純粹是為了分析用的
     * 
     * @param {Webpage} webpage
     * @param {Object} options = {
     *  includeDeleted: true
     *  stepName: 'IndividualReading',
     *  type: ['Confused'],
     *  htmlToText: true,
     *  useTokenizer: false
     * }
     * @type {JSON}
     */
    Model.prototype.getNoteIndicator = async function (webpage, options = {}) {
      let cacheKey = Cache.key('User.getNoteIndicator', options)
      
      return await Cache.rememberWait([webpage, this], cacheKey, async () => {
        let notes = []
        
        options.withNotes = true
        let annotations = await this.getAnnotationIndicator(webpage, options)
        annotations.forEach(annotation => {
          if (Array.isArray(annotation.notes) === false) {
            return false
          }
          
          annotation.notes.forEach(note => {
            note = note.note
            if (options.htmlToText === true) {
              note = StringHelper.htmlToTextTrim(note)
            }
            
            if (options.useTokenizer === true) {
              //console.log('note1', note)
              note = TokenizationHelper.parseSegment(note)
              note = note.map(n => n.w)
              //console.log('note2', note)
            }
            
            notes.push(note)
          })
        })
        
        // ------------------------------
        let comments = await this.getCommentIndicator(webpage, options)
        comments.forEach(comment => {
          let note = comment.note
          if (options.htmlToText === true) {
            note = StringHelper.htmlToTextTrim(note)
          }
          
          if (options.useTokenizer === true) {
            //console.log('comment note1', note)
            note = TokenizationHelper.parseSegment(note)
            note = note.map(n => n.w)
            //console.log('comment note2', note)
          }
          
          notes.push(note)
        })
        
        return notes
      })
    }
    
    Model.prototype.getAnnotationAnchorPositionMap = async function (webpage, options = {}) {
      let cacheKey = Cache.key('User.getAnnotationAnchorPositionMap', options)
      
      return await Cache.rememberWait([webpage, this], cacheKey, async () => {
        //console.log('getAnnotationAnchorPositionMap', 1)
        let annotations = await this.getAnnotationIndicator(webpage, {
          includeDeleted: true,
          withAnchorPositions: true
        })
        let {map} = AnchorPositionMapHelper.annotaionsToMap(annotations)
        //console.log('getAnnotationAnchorPositionMap', 2)
        return map
      })
    }
    
    Model.prototype.isOverlapAnnotationAnchorPoistions = async function (webpage, anchorPositions) {
      let map = await this.getAnnotationAnchorPositionMap(webpage)
      return AnchorPositionMapHelper.isOverlap(map, anchorPositions)
    }
    
    Model.prototype.getClarifiedRate = async function (webpage) {
      let cacheKey = Cache.key('User.getClarifiedRate')
      
      return await Cache.rememberWait([webpage, this], cacheKey, async () => {
        
        let clarifiedAnnotation = await this.getAnnotationIndicator(webpage, {
          includeDeleted: false,
          type: ['Clarified']
        })
        
        let clarifiedCount = clarifiedAnnotation.length
        if (clarifiedCount === 0) {
          return 0
        }
        
        // ----------------
        
        let confusedAnnotation = await this.getAnnotationIndicator(webpage, {
          includeDeleted: false,
          type: ['Confused']
        })
        
        let confusedCount = confusedAnnotation.length
        if (confusedCount === 0) {
          return 0
        }
        
        return (clarifiedCount / (clarifiedCount + confusedAnnotation))
      })
    }
  } // register (Model) {
}

module.exports = UserIndicatorAnnotation
