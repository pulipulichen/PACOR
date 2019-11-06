'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class AnnotationNote extends Model {

  static get hidden () {
    return ['annotation_id', 'created_at', 'updated_at', 'properties', 'id']
  }
}

module.exports = AnnotationNote
