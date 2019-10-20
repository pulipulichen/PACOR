'use strict'

const AnnotationReply = use('App/Models/AnnotationReply')

class AnnotationRate extends AnnotationReply {
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
