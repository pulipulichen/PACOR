'use strict'

const AnnotationModel = use('App/Models/Annotation')
const AnnotationCommentModel = use('App/Models/AnnotationComment')

const { HttpException } = use('@adonisjs/generic-exceptions') 
// throw new HttpException('Forbidden', 403)
// throw new HttpException('Not found', 404)

const UserNotificationModel = use('App/Models/UserNotification')

class AnnotationCommentSave {

  register(Model) {
    
    Model.createFromJSON = async function (webpage, user, data) {
      let {
        annotationID,
        note,
        replyToCommentIDList
      } = data
      
      if (!annotationID || !note) {
        throw new Error('Annotation ID and note are required.')
        return null
      }
      
      // --------------------
      // 檢查權限：是否是在同一個webpage
      
      let annotation = await AnnotationModel.find(annotationID)
      if (annotation.webpage_id !== webpage.primaryKeyValue) {
        console.error('AnnotationComment/AnnotationCommentSave.createFromJSON() Forbidden')
        throw new HttpException('Forbidden', 403)
      }
      
      // -----------------------
      // 真的建立
      
      let comment = new AnnotationCommentModel()
      
      comment.annotation_id = annotationID
      comment.user_id = user.primaryKeyValue
      comment.note = note
      //console.log('before comment save()')
      await comment.save()
      
      /**
       * @author Pulipuli Chen 20191126 
       * 雖然還沒完成，不過我們先把這個做成這樣吧，還沒測試呢
       */
      if (replyToCommentIDList) {
        if (Array.isArray(replyToCommentIDList) === false) {
          replyToCommentIDList = [replyToCommentIDList]
        }
        
        comment.replyToComments().create(replyToCommentIDList)
      }
      
      //console.log('AnnotationCommentSave 這邊應該要加入通知')
      //console.log('webpage.addNotification()')
      
      webpage.addNotification(user, {
        notifiedUserID: annotation.user_id,
        triggerInstance: comment,
        anchorInstance: annotation,
        summary: comment.getNoteSummary()
      })
      
      return comment
    }
    
    // ------------------------------
    
    Model.updateFromJSON = async function (webpage, user, data) {
      let {
        //annotationID,
        commentID,
        note
      } = data
      
      if (!commentID || !note) {
        throw new Error('Comment ID and note are required.')
        return null
      }
      
      let comment = await AnnotationCommentModel.find(commentID)
      if (comment.user_id !== user.primaryKeyValue) {
        throw new HttpException('Forbidden', 403)
      }
      
      // --------------------
      // 檢查權限：是否是在同一個webpage
      
      let annotation = await comment.annotation().fetch()
      if (annotation.webpage_id !== webpage.primaryKeyValue) {
        throw new HttpException('Forbidden', 403)
      }
      
      // -----------------------
      // 真的修改
      
      comment.note = note
      
      await comment.save()
      
      return comment
    }
    
  } // register (Model) {
}

module.exports = AnnotationCommentSave
