'use strict'

const Model = use('Model')

class AnnotationRate extends Model {
  static boot () {
    super.boot()
    
    this.addTrait('AnnotationRate/AnnotationRateLike')
  } // static boot () {
  
  // --------------------
  
  rater () {
    return this.belongsTo('App/Models/User')
  }
  
  annotation () {
    return this.belongsTo('App/Models/Annotation')
  }
  
  rateToAnnotation () {
    return this.annotation()
  }
}

module.exports = AnnotationRate
