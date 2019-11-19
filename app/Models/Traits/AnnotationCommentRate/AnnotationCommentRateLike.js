'use strict'

const AnnotationCommentModel = use('App/Models/AnnotationComment')
const AnnotationCommentRateModel = use('App/Models/AnnotationCommentRate')

class AnnotationCommentRateLike {

  register(Model) {
    
    Model.like = async function (webpage, user, data) {
      let {commentID} = data

      if (!commentID ) {
        throw new Error('Comment ID is required.')
        return null
      }
      
      // ---------------
      
      let comment = await AnnotationCommentModel
              .with('annotation')
              .find(commentID)
      if (comment.annotation.webpage_id !== webpage.primaryKeyValue) {
        throw new HttpException('Forbidden', 403)
      }
      
      // -----------------
      
      let findData = {
        comment_id: comment.id,
        user_id: user.primaryKeyValue,
        type: 'like',
        deleted: false
      }
      let createData = {
        ...findData
      }
      createData.deleted = true
      
      let rate = await AnnotationCommentRateModel.findOrCreate(findData, createData)
      rate.deleted = !rate.deleted
      await rate.save()
      
      return rate
    }
    
  } // register (Model) {
}

module.exports = AnnotationCommentRateLike
