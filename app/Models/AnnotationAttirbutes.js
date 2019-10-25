'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const ModelHelper = use('App/Helpers/ModelHelper')

class AnnotationAttirbutes extends Model {
  static boot () {
    super.boot()
    
    ModelHelper.addJSONCaseHook(this, 'value')
  }
  
  annotation () {
    return this.belongsTo('App/Models/Anntation')
  }
}

module.exports = AnnotationAttirbutes