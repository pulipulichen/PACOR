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
      
      if (type === 'Section.setChecklist') {
        return 'As'
      }
      else if (type === 'Annotation.create') {
        // {"anchorPositions":[{"section_id":0,"seq_id":5,"paragraph_id":"pacor-paragraph-id-5","start_pos":0,"end_pos":5,"anchor_text":"一六七三年","type":"textContent"}],"type":"MainIdea","notes":{"default":"<p>一六七三年</p>"}}
        let annotationType = this.log.type
        if (annotationType === 'Confused' 
                || annotationType === 'Clarified') {
          return 'Ac'
        }
        else if (annotationType === 'SectionMainIdea') {
          return 'As'
        }
        else if (annotationType === 'MainIdea') {
          return 'Am'
        }
      }
      else if (type === 'UserFilter.getUserWords') {
        return 'Ci'
      }
      else if (type === 'UserNotification.read') {
        return 'Cp'
      }
      
      // ------------------------------
      
      let isInteractToPeer = await this.isInteractToPeer()
      if (type === 'Annotation.floatWidget') {
        if (isInteractToPeer === null) {
          return 'At'
        }
        else if (isInteractToPeer === false) {
          return 'Mt'
        }
        else {
          return 'Pt'
        }
      }
      
      // --------------------------------
      
      if (typeAnnotation.indexOf(type) > -1) {
        let annotationType = await this.getAnnotationType()
        
        if (annotationType === 'Confused' 
                || annotationType === 'Clarified') {
          if (isInteractToPeer === false) {
            return 'Mc'
          }
          else {
            return 'Pc'
          }
        }
        if (annotationType === 'MainIdea' ) {
          if (isInteractToPeer === false) {
            return 'Mm'
          }
          else {
            return 'Pm'
          }
        }
        if (annotationType === 'SectionMainIdea') {
          if (isInteractToPeer === false) {
            return 'Ms'
          }
          else {
            return 'Ps'
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
