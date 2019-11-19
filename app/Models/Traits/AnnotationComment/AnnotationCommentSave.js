'use strict'

const AnnotationModel = use('App/Models/Annotation')
const AnnotationCommentModel = use('App/Models/AnnotationComment')

const { HttpException } = use('@adonisjs/generic-exceptions') 
// throw new HttpException('Forbidden', 403)
// throw new HttpException('Not found', 404)

class AnnotationCommentSave {

  register(Model) {
    
    Model.createFromJSON = async function (webpage, user, data) {
      let {
        annotationID,
        note
      } = data
      
      if (!annotationID || !note) {
        throw new Error('Annotation ID and note are required.')
        return null
      }
      
      // --------------------
      // 檢查權限：是否是在同一個webpage
      
      let annotation = await AnnotationModel.find(annotationID)
      if (annotation.webpage_id !== webpage.primaryKeyValue) {
        throw new HttpException('Forbidden', 403)
      }
      
      // -----------------------
      // 真的建立
      
      let comment = new AnnotationCommentModel()
      
      comment.annotation_id = annotationID
      comment.user_id = user.primaryKeyValue
      comment.note = note
      
      await comment.save()
      
      return comment
    }
    
    // ------------------------------
    
    Model.updateFromJSON = async function (webpage, user, data) {
      let {
        annotationID,
        commentID,
        note
      } = data
      
      if (!annotationID || !note) {
        throw new Error('Annotation ID and note are required.')
        return null
      }
      
      // --------------------
      // 檢查權限：是否是在同一個webpage
      
      let annotation = await AnnotationModel.find(annotationID)
      if (annotation.webpage_id !== webpage.primaryKeyValue) {
        throw new HttpException('Forbidden', 403)
      }
      
      let comment = await AnnotationCommentModel.find(commentID)
      if (comment.user_id !== user.primaryKeyValue) {
        throw new HttpException('Forbidden', 403)
      }
      
      // -----------------------
      // 真的建立
      
      comment.note = note
      
      await comment.save()
      
      return comment
    }
    
  } // register (Model) {
}

module.exports = AnnotationCommentSave
