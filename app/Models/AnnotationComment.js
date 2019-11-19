'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
class AnnotationComment extends Model {
  
  static boot () {
    super.boot()
    
    this.addTrait('IntegerCase', ['getUpdatedAtUnixms'])
    this.addTrait('AnnotationComment/AnnotationCommentSave')
    this.addTrait('AnnotationComment/AnnotationCommentNotification')
    
    this.addTrait('JSONCase', 'properties')
    this.addTrait('Tokenization', {
      fromField: 'note',
      toField: 'properties'
    })
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
  
  /**
   * 需要搭配queryBuilder一起使用
   * query.withCount('i_have_liked', (queryBuilder) => {
            queryBuilder.where('user_id', user.primaryKeyValue)
          })
   */
  i_have_liked () {
    return this.hasMany('App/Models/AnnotationCommentRate')
            .where('type', 'like')
            .where('deleted', false)
  }
  
  static get hidden () {
    return ['webpage_id', 'deleted', 'created_at', 'updated_at', 'created_at_unixms', 'properties']
  }
}

module.exports = AnnotationComment
