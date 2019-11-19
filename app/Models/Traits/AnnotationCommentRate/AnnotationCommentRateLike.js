'use strict'

const AnnotationCommentModel = use('App/Models/AnnotationComment')
const AnnotationCommentRateModel = use('App/Models/AnnotationCommentRate')

const { HttpException } = use('@adonisjs/generic-exceptions') 

class AnnotationCommentRateLike {

  register(Model) {
    
    Model.like = async function (webpage, user, data) {
      let {commentID} = data

      if (!commentID ) {
        throw new Error('Comment ID is required.')
        return null
      }
      
      // ---------------
      
//      let comments = await AnnotationCommentModel
//              .query()
//              .with('annotation')
//              .where('id', commentID)
//              .pick(1)
//      let comment = comments.first()
      let comment = await AnnotationCommentModel.find(commentID)
      let annotation = await comment.annotation().fetch()
      if (annotation.webpage_id !== webpage.primaryKeyValue) {
        throw new HttpException('Forbidden', 403)
      }
      
      // -----------------
      
      let findData = {
        annotation_comment_id: comment.id,
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
      
      console.log('AnnotationCommentRateLike 這邊應該要加入通知')
      
      return rate
    }
    
  } // register (Model) {
}

module.exports = AnnotationCommentRateLike
