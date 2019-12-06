'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Annotation extends Model {
  static boot () {
    super.boot()
    
    //this.addTrait('DateUnixMSCase')
    this.addTrait('DateUnixMS')
    
    this.addTrait('BooleanCase', ['public', 'deleted'])
    this.addTrait('BooleanCaseMutators', ['Public', 'Deleted'])
    this.addTrait('IntegerCase', ['getUpdatedAtUnixms'])
    
    this.addTrait('CacheRemove')
    
    this.addTrait('Annotation/AnnotationCreate')
    this.addTrait('Annotation/AnnotationHighlight')
    this.addTrait('Annotation/AnnotationHighlightOthers')
    this.addTrait('Annotation/AnnotationFind')
    this.addTrait('Annotation/AnnotationFindOthers')
    this.addTrait('Annotation/AnnotationPermission')
    this.addTrait('Annotation/AnnotationAnchorPositions')
    this.addTrait('Annotation/AnnotationSection')
    this.addTrait('Annotation/AnnotationTypeFilter')
    this.addTrait('Annotation/AnnotationNote')
    //this.addTrait('Annotation/AnnotationNote')
    
  } // static boot () {
  
  user () {
    return this.belongsTo('App/Models/User')
            .setHidden(['domain_id', 'password', 'preference', 'created_at', 'updated_at'])
  }
  
  webpage () {
    return this.belongsTo('App/Models/Webpage')
  }
  
  anchorPositions () {
    return this.belongsToMany('App/Models/AnchorPosition')
            .orderBy('seq_id', 'asc')
            .orderBy('start_pos', 'asc')
            .pivotTable('anchor_positions_annotations')
  }
  
  notes () {
    return this.hasMany('App/Models/AnnotationNote')
            .orderBy('created_at', 'asc')
  }
  
  rates () {
    return this.hasMany('App/Models/AnnotationRate')
            .where('deleted', false)
  }
  
  likes () {
    return this.hasMany('App/Models/AnnotationRate')
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
    return this.hasMany('App/Models/AnnotationRate')
            .where('type', 'like')
            .where('deleted', false)
  }
  
  /**
   * 請使用內建的withCount功能
   * https://adonisjs.com/docs/4.0/relationships#_counts
   */
//  ratesCount () {
//    return this.rates().getCount()
//  }
  
  comments () {
    return this.hasMany('App/Models/AnnotationComment')
            .where('deleted', false)
  }
  
  i_have_commented () {
    return this.hasMany('App/Models/AnnotationComment')
            .where('deleted', false)
  }
  
  /**
   * 請使用內建的withCount功能
   * https://adonisjs.com/docs/4.0/relationships#_counts
   */
//  repliesCount () {
//    return this.replies().getCount()
//  }
  
  attr () {
    return this.hasOne('App/Models/AnnotationAttirbutes')
  }
  
  attrs () {
    return this.hasMany('App/Models/AnnotationAttirbutes')
  }
  
  // -----------------------------
  
  static get hidden () {
    //return ['password']
    return ['webpage_id', 'deleted', 'created_at', 'updated_at', 'created_at_unixms']
    //return ['webpage_id', 'created_at']
  }
  
  
}

module.exports = Annotation
