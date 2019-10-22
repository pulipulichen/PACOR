'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const UserNotification = use('App/Models/UserNotification')

class AnnotationReply extends Model {
  webpage () {
    return this.belongsTo('App/Models/Webpage')
  }
  
  user () {
    return this.belongsTo('App/Models/User')
  }
  
  replier () {
    return this.user()
  }
  
  annotation () {
    return this.hasOne('App/Models/Annotation')
  }
  
  replyToAnnotation () {
    return this.annotation()
  }
  
  get anchorType () {
    return 'Annotation'
  }
  
  get actionType () {
    return 'Reply'
  }
  
  static boot () {
    super.boot()

    this.addHook('afterSave', async (instance) => {
      let notification = new UserNotification()
      
      notification.webpage_id = instance.webpage_id
      notification.user_id = instance.user_id
      notification.type = instance.anchorType + instance.actionType
      
      let description = instance.toJSON()
      
      notification.description = description
    })
  }
}

module.exports = AnnotationReply