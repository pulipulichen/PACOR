'use strict'

const Model = use('Model')

class AnnotationRate extends Model {
  static boot () {
    super.boot()
    
    this.addTrait('AnnotationRate/AnnotationRateLike')
  } // static boot () {
  
  // --------------------
  
  rater () {
    return this.user()
  }
  
  annotation () {
    return this.hasOne('App/Models/Annotation')
  }
  
  rateToAnnotation () {
    return this.annotation()
  }
}

module.exports = AnnotationRate
