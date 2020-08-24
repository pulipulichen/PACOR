'use strict'

//const Cache = use('Cache')
//const { HttpException } = use('@adonisjs/generic-exceptions') 

//const ReadingActivityLog = use ('App/Models/ReadingActivityLog')

const UserModel = use('App/Models/User')
const AnnotationModel = use('App/Models/Annotation')
const AnnotationCommentModel = use('App/Models/AnnotationComment')
const UserNotificationModel = use('App/Models/UserNotification')

//const AnchorPositionMapHelper = use('App/Helpers/AnchorPositionMapHelper')

class ReadingActivityLogInteract {

  register(Model) {
    
    let typeInteractAuthor = [
      'Annotation.create'
    ]
    
    let typeInteractMyself = [
      'Annotation.destroy',
      'Annotation.update',
    ]
    
    Model.prototype.getInteractToUser = async function () {
      let type = this.type
      
      if (typeInteractAuthor.indexOf(type) > -1) {
        return null // 表示 跟文章互動
      }
      else if (typeInteractMyself.indexOf(type) > -1) {
        return await this.user().fetch()
      }
      
      if (type === 'AnnotationRate.like'
              || type === 'AnnotationComment.create') {
        return await this._getInteractToUserByAnnotationID()
      }
      else if (type === 'AnnotationComment.update') {
        return await this._getInteractToUserFromAnnotationCommentUpdate()
      }
      else if (type === 'AnnotationComment.destroy') {
        return await this._getInteractToUserFromAnnotationCommentDestroy()
      }
      else if (type === 'Annotation.floatWidget') {
        return await this._getInteractToUserAnnotationFloatWidget()
      }
      else if (type === 'AnnotationRate.likeComment') {
        return await this._getInteractToUserFromAnnotationRateLikeComment()
      }
      else if (type === 'UserFilter.getUserWords') {
        return await this._getInteractToUserByAnnotationID()
      }
      else if (type === 'UserNotification.read') {
        return await this._getInteractToUserFromUserNotificationRead()
      }
    }
    
    Model.prototype._getInteractToUserFromAnnotationCommentUpdate = async function () {
      let log = this.log
      let annotationCommentID = log.commentID
      let comment = await AnnotationCommentModel.find(annotationCommentID)
      let annotationID = comment.annotation_id
      let annotation = await AnnotationModel.find(annotationID)
      return await annotation.user().fetch()
    }
    
    Model.prototype._getInteractToUserFromAnnotationCommentDestroy = async function () {
      let log = this.log
      let annotationCommentID = log.id
      let comment = await AnnotationCommentModel.find(annotationCommentID)
      let annotationID = comment.annotation_id
      let annotation = await AnnotationModel.find(annotationID)
      return await annotation.user().fetch()
    }
    
    Model.prototype._getInteractToUserByAnnotationID = async function () {
      let log = this.log
      let annotationID = log.annotationID
      let annotation = await AnnotationModel.find(annotationID)
      return await annotation.user().fetch()
    }
    
    Model.prototype._getInteractToUserAnnotationFloatWidget = async function () {
      let stepName = await this.getCurrentStepName()
      if (stepName === 'IndividualReading') {
        return await this.user().fetch()
      }
      
      let log = this.log
      let anchorPositions = log.anchorPositions
      //let anchorMap = AnchorPositionMapHelper.buildMapFromAnchorPositions(anchorPositions)
      
      // ----------------
      
      let webpage = await this.webpage().fetch()
      let user = await this.user().fetch()
      let groupOtherUsers = await user.getOtherUserIDsInGroup(webpage)
      let users = []
      for (let i = 0; i < groupOtherUsers.length; i++) {
        let userID = groupOtherUsers[i]
        let peer = await UserModel.find(userID)
        
        let isMatch = await peer.isOverlapAnnotationAnchorPoistions(webpage, anchorPositions)
        if (isMatch === true) {
          users.push(peer)
        }
      }
      
      return users
      //let annotation = await AnnotationModel.find(annotationID)
      //return await annotation.user().fetch()
    }
    
    Model.prototype._getInteractToUserFromAnnotationRateLikeComment = async function () {
      let log = this.log
      let annotationCommentID = log.commentID
      let comment = await AnnotationCommentModel.find(annotationCommentID)
      return await comment.user().fetch()
    }
    
    Model.prototype._getInteractToUserFromUserNotificationRead = async function () {
      let log = this.log
      let userNotificationID = log.id
      let notification = await UserNotificationModel.find(userNotificationID)
      return await notification.triggerUser().fetch()
    }
    
    Model.prototype._getInteractToUserByUserID = async function () {
      let log = this.log
      return await UserModel.find(log.userID)
    }
    
    // ----------------------------
    
    Model.prototype.isInteractToPeer = async function () {
      let toUser = await this.getInteractToUser()
      if (toUser === null || toUser === undefined) {
        return null
      }
      if (Array.isArray(toUser) === false) {
        return (toUser.primaryKeyValue !== this.user_id)
      }
      let isInteractToPeer = false
      for (let i = 0; i < toUser.length; i++) {
        if (toUser.primaryKeyValue !== this.user_id) {
          isInteractToPeer = true
          break
        }
      }
      return isInteractToPeer
    }
    
    Model.prototype.isInteractToAuthor = async function () {
      let toUser = await this.getInteractToUser()
      return (toUser === null)
    }
    
    Model.prototype.getCurrentStepName = async function () {
      let user = await this.user().fetch()
      let webpage = await this.webpage().fetch()
      
      let unixms = this.created_at_unixms
      return await user.getReadingProgressStepNameByUnixMS(webpage, unixms)
    }
    
    let typeReply = [
      'AnnotationComment.create',
      'AnnotationRate.likeComment',
    ]
    
    Model.prototype.isReply = async function () {
      let stepName = await this.getCurrentStepName()
      if (stepName !== 'CollaborativeReading') {
        return false
      }
      
      if (typeReply.indexOf(this.type) === -1) {
        return false
      }
      
      let annotation
      let annotationCommentID
      if (this.type === 'AnnotationRate.likeComment') {
        annotationCommentID = this.log.commentID
        let comment = await AnnotationCommentModel.find(annotationCommentID)
        annotation = await comment.annotation().fetch()
      }
      else if (this.type === 'AnnotationComment.create') {
        let user_id = this.user_id
        let annotation_id = this.log.annotationID
        
        let comments = await AnnotationCommentModel.query()
                .where('annotation_id', annotation_id)
                .where('user_id', user_id)
                .fetch()
        
        if (comments.size() > 1) {
          let note = this.log.note
          comments = await AnnotationCommentModel.query()
                .where('annotation_id', annotation_id)
                .where('user_id', user_id)
                .where('note', note)
                .fetch()
        }
        
        let comment = comments.nth(0)
        annotationCommentID = comments.nth(0).primaryKeyValue
        annotation = await AnnotationModel.find(comment.annotation_id)
      }
      //throw new Error('comment?')
      let isMyAnnotation = (annotation.user_id === this.user_id)
      if (this.type === 'AnnotationRate.likeComment') {
        //console.log(annotation.user_id, this.user_id)
        return isMyAnnotation
      }
      
      if (isMyAnnotation === false) {
        return false
      }
      let comments = await annotation.comments().fetch()
      let interactUserListUnique = await annotation.getInteractUserUniqueList()
      
      if (interactUserListUnique.length === 1
              && interactUserListUnique[0] === this.user_id) {
        return false
      }
      
      let firstCommentID = comments.nth(0).primaryKeyValue
      return (firstCommentID !== annotationCommentID)
    }
    
  } // register (Model) {
}

module.exports = ReadingActivityLogInteract
