'use strict'

const AnnotationRate = use('App/Models/AnnotationRate')

class AnnotationCommentRate extends AnnotationRate {
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
