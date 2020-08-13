'use strict'

const Model = use('Model')

class AnnotationRate extends Model {
  static boot () {
    super.boot()
    
    this.addTrait('DateUnixMS')
    
    this.addTrait('AnnotationRate/AnnotationRateLike')
  } // static boot () {
  
  // --------------------
  
  user () {
    return this.belongsTo('App/Models/User')
  }
  
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
