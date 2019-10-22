'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class AnnotationAnchorText extends Model {
  annotations () {
    return this.hasMany('App/Models/Annotation')
  }
  
  webpage () {
    return this.belongsTo('App/Models/Webpage')
  }
}

module.exports = AnnotationAnchorText
