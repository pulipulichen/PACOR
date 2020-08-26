'use strict'

const Cache = use('Cache')
const AnnotationModel = use('App/Models/Annotation')
const AnnotationCommentModel = use('App/Models/AnnotationComment')
const ReadingActivityLogModel = use('App/Models/ReadingActivityLog')

class ReadingActivityLogCode {

  register(Model) {
    
    let typeAnnotation = [
      'Annotation.destroy',
      'Annotation.update',
      'AnnotationComment.create',
      //'AnnotationComment.destroy',
      //'AnnotationComment.update',
      'AnnotationRate.like',
      'AnnotationRate.likeComment'
    ]
    
    Model.prototype.getCode = async function () {
      let type = this.type
      
      //if (type === 'Section.setChecklist') {
      //  return 'Sa'
      //}
      if (type === 'Annotation.create') {
        // {"anchorPositions":[{"section_id":0,"seq_id":5,"paragraph_id":"pacor-paragraph-id-5","start_pos":0,"end_pos":5,"anchor_text":"一六七三年","type":"textContent"}],"type":"MainIdea","notes":{"default":"<p>一六七三年</p>"}}
        let annotationType = this.log.type
        if (annotationType === 'Confused' 
                || annotationType === 'Clarified') {
          return 'Ca'
        }
        else if (annotationType === 'SectionMainIdea') {
          return 'Sa'
        }
        else if (annotationType === 'MainIdea') {
          return 'Ma'
        }
      }
      else if (type === 'UserFilter.getUserWords') {
        return 'Ai'
      }
      else if (type === 'UserNotification.read') {
        return 'Ap'
      }
      
      // ------------------------------
      
      let isInteractToPeer = await this.isInteractToPeer()
      if (type === 'Annotation.floatWidget') {
        if (isInteractToPeer === null) {
          return 'Ta'
        }
        else if (isInteractToPeer === false) {
          return 'Tm'
        }
        else {
          return 'Tp'
        }
      }
      
      // --------------------------------
//      if (type === 'AnnotationComment.create') {
//        throw new Error('尚未完成')
//      }
      
      let isValid = await this.isValid()
      if (isValid === false) {
        return undefined
      }
      
      if (typeAnnotation.indexOf(type) > -1) {
        let annotationTypeCode = await this.getAnnotationTypeCode()
        let isReply = await this.isReply()
        
        if (isReply === true) {
          return annotationTypeCode + 'r'
        }
        else if (isInteractToPeer === false) {
          return annotationTypeCode + 'm'
        }
        else {
          return annotationTypeCode + 'p'
        }
      }
    }
    
    Model.prototype.getAnnotationType = async function () {
      let log = this.log
      
      if (typeof(log.annotationID) !== 'undefined') {
        let annotationID = Number(log.annotationID)
        let annotation = await AnnotationModel.find(annotationID)
        return annotation.type
      }
      if (typeof(log.commentID) !== 'undefined') {
        let commentID = Number(log.commentID)
        let comment = await AnnotationCommentModel.find(commentID)
        let annotation = await comment.annotation().fetch()
        return annotation.type
      }
      
      
      let type = this.type
      if (type === 'Annotation.destroy'
              || type === 'Annotation.update') {
        let annotation = await AnnotationModel.find(log.id)
        return annotation.type
      }
      if (type === 'AnnotationComment.destroy') {
        let commentID = Number(log.id)
        let comment = await AnnotationCommentModel.find(commentID)
        let annotation = await comment.annotation().fetch()
        return annotation.type
      }
    }
    
    Model.prototype.getAnnotationTypeCode = async function () {
      let annotationType = await this.getAnnotationType()
      if (annotationType === 'Confused' 
                || annotationType === 'Clarified') {
          return 'C'
        }
        if (annotationType === 'MainIdea' ) {
          return 'M'
        }
        if (annotationType === 'SectionMainIdea') {
          return 'S'
        }
    }
    
    let typeValid = [
      'AnnotationRate.like',
      'AnnotationRate.likeComment'
    ]
    
    Model.prototype.isValid = async function () {
      if (typeValid.indexOf(this.type) === -1) {
        return true
      }
      
      if (this.type === 'AnnotationRate.like') {
        let annotationID = this.log.annotationID
        
        let records = await ReadingActivityLogModel
                .query()
                .where('webpage_id', this.webpage_id)
                .where('user_id', this.user_id)
                .where('type', this.type)
                .select('id')
                .whereRaw(`log->>'annotationID' = '${annotationID}'`)
                .orderBy('id')
                .fetch()
        
        for (let i = 0; i < records.size(); i++) {
          if (records.nth(i).primaryKeyValue === this.primaryKeyValue) {
            return (i % 2 === 0)
          }
        }
      }
      
      if (this.type === 'AnnotationRate.likeComment') {
        let commentID = this.log.annotationID
        
        let records = await ReadingActivityLogModel
                .query()
                .where('webpage_id', this.webpage_id)
                .where('user_id', this.user_id)
                .where('type', this.type)
                .select('id')
                .whereRaw(`log->>'commentID' = '${commentID}'`)
                .orderBy('id')
                .fetch()
        
        for (let i = 0; i < records.size(); i++) {
          if (records.nth(i).primaryKeyValue === this.primaryKeyValue) {
            return (i % 2 === 0)
          }
        }
      }
    }
    
    Model.prototype.getRepeatableID = function () {
      if (this.type === "AnnotationComment.create"
              || this.type === "AnnotationRate.like") {
        return Number(this.log.annotationID)
      }
      else if (this.type === "AnnotationRate.likeComment") {
        return Number(this.log.commentID)
      }
    }
    
  } // register (Model) {
}

module.exports = ReadingActivityLogCode
