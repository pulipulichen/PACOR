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
      //console.log('getInteractToUser', type)
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
        return await this._getInteractToUserByUserID()
      }
      else if (type === 'UserNotification.read') {
        return await this._getInteractToUserFromUserNotificationRead()
      }
    }
    
    Model.prototype.getInteractToUserIDList = async function () {
      let interactToUser = await this.getInteractToUser()
      if (!interactToUser) {
        return undefined
      }
      let interactToUserID
      
      if (typeof(interactToUser.primaryKeyValue) === 'number') {
        interactToUserID = interactToUser.primaryKeyValue
      }
      else {
        interactToUserID = interactToUser.map(user => user.primaryKeyValue).join(',')
      }
      return interactToUserID
    }
    
    Model.prototype.getInteractToUserDisplayNamesList = async function () {
      let interactToUser = await this.getInteractToUser()
      if (!interactToUser) {
        return undefined
      }
      let interactToUserID
      
      if (typeof(interactToUser.primaryKeyValue) === 'number') {
        interactToUserID = interactToUser.display_name
      }
      else {
        interactToUserID = interactToUser.map(user => user.display_name).join(',')
      }
      return interactToUserID
    }
    
    Model.prototype._getInteractToUserFromAnnotationCommentUpdate = async function () {
      let log = this.log
      let annotationCommentID = log.commentID
      //console.log('_getInteractToUserFromAnnotationCommentUpdate')
      let comment = await AnnotationCommentModel.find(annotationCommentID)
      let annotationID = comment.annotation_id
      let annotation = await AnnotationModel.find(annotationID)
      return await annotation.user().fetch()
    }
    
    Model.prototype._getInteractToUserFromAnnotationCommentDestroy = async function () {
      let log = this.log
      let annotationCommentID = log.id
      //console.log('_getInteractToUserFromAnnotationCommentDestroy')
      let comment = await AnnotationCommentModel.find(annotationCommentID)
      let annotationID = comment.annotation_id
      let annotation = await AnnotationModel.find(annotationID)
      return await annotation.user().fetch()
    }
    
    Model.prototype._getInteractToUserByAnnotationID = async function () {
      let log = this.log
      //console.log('_getInteractToUserByAnnotationID')
      let annotationID = log.annotationID
      //console.log()
      let annotation = await AnnotationModel.find(annotationID)
      return await annotation.user().fetch()
    }
    
    Model.prototype._getInteractToUserAnnotationFloatWidget = async function () {
      let stepName = await this.getCurrentStepName()
      //console.log('_getInteractToUserAnnotationFloatWidget', 1)
      if (stepName === 'IndividualReading') {
        return await this.user().fetch()
      }
      
      let log = this.log
      let anchorPositions = log.anchorPositions
      //let anchorMap = AnchorPositionMapHelper.buildMapFromAnchorPositions(anchorPositions)
      
      // ----------------
      
      let webpage = await this.webpage().fetch()
      let user = await this.user().fetch()
      //console.log('_getInteractToUserAnnotationFloatWidget', 2)
      let groupOtherUsers = await user.getOtherUserIDsInGroup(webpage)
      //console.log('_getInteractToUserAnnotationFloatWidget', 2, 1)
      let users = []
      for (let i = 0; i < groupOtherUsers.length; i++) {
        //console.log('_getInteractToUserAnnotationFloatWidget', 2, 2)
        let userID = groupOtherUsers[i]
        let peer = await UserModel.find(userID)
        //console.log('_getInteractToUserAnnotationFloatWidget', 2, 3)
        let isMatch = await peer.isOverlapAnnotationAnchorPoistions(webpage, anchorPositions)
        //console.log('_getInteractToUserAnnotationFloatWidget', 2, 4)
        if (isMatch === true) {
          users.push(peer)
        }
      }
      //console.log('_getInteractToUserAnnotationFloatWidget', 3)
      return users
      //let annotation = await AnnotationModel.find(annotationID)
      //return await annotation.user().fetch()
    }
    
    Model.prototype._getInteractToUserFromAnnotationRateLikeComment = async function () {
      let log = this.log
      let annotationCommentID = log.commentID
      //console.log('_getInteractToUserFromAnnotationRateLikeComment')
      let comment = await AnnotationCommentModel.find(annotationCommentID)
      return await comment.user().fetch()
    }
    
    Model.prototype._getInteractToUserFromUserNotificationRead = async function () {
      let log = this.log
      let userNotificationID = log.id
      //console.log('_getInteractToUserFromUserNotificationRead', 1,userNotificationID)
      let notification = await UserNotificationModel.find(userNotificationID)
      let triggerUser = await notification.triggerUser().fetch()
      //console.log('_getInteractToUserFromUserNotificationRead', 2)
      return triggerUser
    }
    
    Model.prototype._getInteractToUserByUserID = async function () {
      let log = this.log
      if (!log.userID) {
        return undefined
      }
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
