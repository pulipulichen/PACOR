'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class AnnotationRate extends Model {
  user () {
    return this.belongsTo('App/Models/User')
  }
  
  rater () {
    return this.user()
  }
  
  annotation () {
    return this.hasOne('App/Models/Annotation')
  }
}

module.exports = AnnotationRate
