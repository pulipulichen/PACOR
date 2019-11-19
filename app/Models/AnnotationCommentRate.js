'use strict'

const Model = use('Model')

class AnnotationCommentRate extends Model {
  static boot () {
    super.boot()
    
    this.addTrait('AnnotationRate/AnnotationRateLike')
  } // static boot () {
  
  rater () {
    return this.user()
  }
  
  comment () {
    return this.hasOne('App/Models/AnnotationComment')
  }
  
  rateToComment () {
    return this.comment()
  }
}

module.exports = AnnotationCommentRate
