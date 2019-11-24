'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class AnnotationNote extends Model {
  static boot () {
    super.boot()
    
    this.addTrait('JSONCase', 'properties')
    this.addTrait('Tokenization', {
      fromField: 'note',
      toField: 'properties'
    })
    
    this.addTrait('AnnotationNote/AnnotationNoteUserFilter')
    
  } // static boot () {
  
  annotation () {
    return this.belongsTo('App/Models/Annotation')
  }
  
  static get hidden () {
    return ['annotation_id', 'created_at', 'updated_at', 'properties', 'id']
  }
}

module.exports = AnnotationNote
