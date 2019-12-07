'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

const TokenizationHelper = use('App/Helpers/TokenizationHelper')

class AnnotationComment extends Model {
  
  static boot () {
    super.boot()
    
    //this.addTrait('IntegerCase', ['getUpdatedAtUnixms'])
    this.addTrait('DateUnixMS')
    
    this.addTrait('AnnotationComment/AnnotationCommentSave')
    this.addTrait('AnnotationComment/AnnotationCommentFind')
    this.addTrait('AnnotationComment/AnnotationCommentNotification')
    
    this.addTrait('JSONCase', 'properties')
    this.addTrait('Tokenization', {
      fromField: 'note',
      toField: 'properties'
    })
  }
  
//  webpage () {
//    return this.belongsTo('App/Models/Webpage')
//  }
  
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
    return this.belongsTo('App/Models/Annotation')
  }
  
  commentOnAnnotation () {
    return this.annotation()
  }
  
  replyToComments () {
    return this.belongsToMany('App/Models/AnnotationComment')
            .pivotTable('annotation_comment_replies', 'from_comment_id', 'to_comment_id')
  }
  
  repliedByComments () {
    return this.belongsToMany('App/Models/AnnotationComment')
            .pivotTable('annotation_comment_replies', 'to_comment_id', 'from_comment_id')
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
    return ['webpage_id', 'deleted', 'created_at', 'updated_at'
      //, 'created_at_unixms'
      , 'properties']
  }
  
  getNoteSummary () {
    let note = this.note
    note = TokenizationHelper.htmlToText(note)
    if (note.length > 20) {
      note = note.slice(0, 20) + '...'
    }
    return note
  }
  
//  setNote (note) {
//    this.properties = null
//    return note
//  }
}

module.exports = AnnotationComment
