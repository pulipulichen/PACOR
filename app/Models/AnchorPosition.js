'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class AnchorPosition extends Model {
  static boot () {
    super.boot()
    
    this.addTrait('JSONCase', 'properties')
  }
  
  annotations () {
    return this.belongsToMany('App/Models/Annotation')
            .pivotTable('anchor_positions_annotations')
  }
  
  webpage () {
    return this.belongsTo('App/Models/Webpage')
  }
  
  static get hidden () {
    //return ['password']
    return ['anchor_text', 'properties', 'created_at', 'updated_at', 'pivot', 'id', 'webpage_id']
  }
}

module.exports = AnchorPosition
