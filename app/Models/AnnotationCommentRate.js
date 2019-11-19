'use strict'

const Model = use('Model')

class AnnotationCommentRate extends Model {
  static boot () {
    super.boot()
    
    this.addTrait('AnnotationCommentRate/AnnotationCommentRateLike')
  } // static boot () {
  
  rater () {
    return this.user()
  }
  
  comment () {
    return this.belongsTo('App/Models/AnnotationComment')
  }
  
  rateToComment () {
    return this.comment()
  }
}

module.exports = AnnotationCommentRate
