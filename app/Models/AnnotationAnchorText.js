'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const ModelHelper = use('App/Helpers/ModelHelper')

class AnnotationAnchorText extends Model {
  static boot () {
    super.boot()
    
    ModelHelper.addJSONCaseHook(this, 'properties')
  }
  
  annotations () {
    return this.hasMany('App/Models/Annotation')
  }
  
  webpage () {
    return this.belongsTo('App/Models/Webpage')
  }
}

module.exports = AnnotationAnchorText
