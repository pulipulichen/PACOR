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
      
      if (type === 'Annotation.create') {
        return 'At'
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
        if (annotationType === 'MainIdea' 
                || annotationType === 'SectionMainIdea') {
          if (isInteractToPeer === false) {
            return 'Mm'
          }
          else {
            return 'Pm'
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
