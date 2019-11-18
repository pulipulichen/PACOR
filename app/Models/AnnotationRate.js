'use strict'

const AnnotationComment = use('App/Models/AnnotationComment')

class AnnotationRate extends AnnotationComment {
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
