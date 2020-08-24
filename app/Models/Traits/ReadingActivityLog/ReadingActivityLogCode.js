'use strict'

const Cache = use('Cache')
const AnnotationModel = use('App/Models/Annotation')
const AnnotationCommentModel = use('App/Models/AnnotationComment')

class ReadingActivityLogCode {

  register(Model) {
    
    let typeAnnotation = [
      'Annotation.destroy',
      'Annotation.update',
      'AnnotationComment.create',
      'AnnotationComment.destroy',
      'AnnotationComment.update',
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
      
      if (typeAnnotation.indexOf(type) > -1) {
        let annotationType = await this.getAnnotationType()
        let isReply = await this.isReply()
        
        if (annotationType === 'Confused' 
                || annotationType === 'Clarified') {
          if (isInteractToPeer === false) {
            return 'Cm'
          }
          else if (isReply === true) {
            return 'Cr'
          }
          else {
            return 'Cp'
          }
        }
        if (annotationType === 'MainIdea' ) {
          if (isInteractToPeer === false) {
            return 'Mm'
          }
          else if (isReply === true) {
            return 'Mr'
          }
          else {
            return 'Mp'
          }
        }
        if (annotationType === 'SectionMainIdea') {
          if (isInteractToPeer === false) {
            return 'Sm'
          }
          else if (isReply === true) {
            return 'Sr'
          }
          else {
            return 'Sp'
          }
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
    
    
    
  } // register (Model) {
}

module.exports = ReadingActivityLogCode
