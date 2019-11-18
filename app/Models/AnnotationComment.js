'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
class AnnotationComment extends Model {
  
  static boot () {
    super.boot()
    
    this.addTrait('IntegerCase', ['getUpdatedAtUnixms'])
    this.addTrait('AnnotationComment/AnnotationCommentSave')
    this.addTrait('AnnotationComment/AnnotationCommentNotification')
  }
  
  webpage () {
    return this.belongsTo('App/Models/Webpage')
  }
  
  user () {
    return this.belongsTo('App/Models/User')
  }
  
  /**
   * 等同於user
   * @returns {User}
   */
  commenter () {
    return this.user()
  }
  
  annotation () {
    return this.hasOne('App/Models/Annotation')
  }
  
  commentOnAnnotation () {
    return this.annotation()
  }
  
  get anchorType () {
    return 'Annotation'
  }
  
  get actionType () {
    return 'Comment'
  }
  
  likes () {
    return this.hasMany('App/Models/AnnotationCommentRate')
            .where('type', 'like')
            .where('deleted', false)
  }
}

module.exports = AnnotationComment
