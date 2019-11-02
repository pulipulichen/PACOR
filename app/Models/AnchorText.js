'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class AnchorText extends Model {
  static boot () {
    super.boot()
    
    this.addTrait('JSONCase', 'properties')
  }
  
  annotations () {
    return this.belongsToMany('App/Models/Annotation')
            .pivotTable('anchor_texts_annotations')
  }
  
  webpage () {
    return this.belongsTo('App/Models/Webpage')
  }
}

module.exports = AnchorText
