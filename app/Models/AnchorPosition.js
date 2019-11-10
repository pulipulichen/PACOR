'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class AnchorPosition extends Model {
  static boot () {
    super.boot()
    
    let orderPos = (instance) => {
      if (instance.start_pos > instance.end_pos) {
        let tmp = instance.start_pos
        instance.start_pos = instance.end_pos
        instance.end_pos = tmp
      }
    }
    
    this.addHook('beforeCreate', orderPos)
    this.addHook('beforeUpdate', orderPos)
    
    this.addTrait('JSONCase', 'properties')
    this.addTrait('Tokenization', 'properties')
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
    return ['anchor_text', 'properties', 'created_at', 'updated_at', 'pivot', 'id', 'webpage_id', 'paragraph_seq_id']
  }
}

module.exports = AnchorPosition
