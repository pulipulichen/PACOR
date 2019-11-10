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
    this.addTrait('Annotation/AnnotationFind')
    this.addTrait('Annotation/AnnotationPermission')
    this.addTrait('Annotation/AnnotationAnchorPositions')
    this.addTrait('Annotation/AnnotationSection')
    //this.addTrait('Annotation/AnnotationNote')
    
  } // static boot () {
  
  user () {
    return this.belongsTo('App/Models/User')
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
  
  ratesCount () {
    return this.rates().getCount()
  }
  
  replies () {
    return this.hasMany('App/Models/AnnotationReply')
            .where('deleted', false)
  }
  
  repliesCount () {
    return this.replies().getCount()
  }
  
  attr () {
    return this.hasOne('App/Models/AnnotationAttirbutes')
  }
  
  attrs () {
    return this.hasMany('App/Models/AnnotationAttirbutes')
  }
  
  // -----------------------------
  
  static get hidden () {
    //return ['password']
    return ['webpage_id', 'deleted', 'created_at', 'updated_at', 'created_at_unixms', 'properties']
    //return ['webpage_id', 'created_at']
  }
}

module.exports = Annotation
