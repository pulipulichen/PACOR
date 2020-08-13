'use strict'

const Model = use('Model')

class AnnotationCommentRate extends Model {
  static boot () {
    super.boot()
    
    this.addTrait('DateUnixMS')
    
    this.addTrait('AnnotationCommentRate/AnnotationCommentRateLike')
  } // static boot () {
  
  rater () {
    return this.belongsTo('App/Models/User')
  }
  
  user () {
    return this.belongsTo('App/Models/User')
  }
  
  comment () {
    return this.belongsTo('App/Models/AnnotationComment')
  }
  
  rateToComment () {
    return this.comment()
  }
}

module.exports = AnnotationCommentRate
