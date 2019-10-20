'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const AnnotationReply = use('App/Models/AnnotationReply')

class SectionAnnotationReply extends AnnotationReply {
  
  annotation () {
    return this.hasOne('App/Models/SectionAnnotation')
  }
  
  get anchorType () {
    return 'SectionAnnotation'
  }
}

module.exports = SectionAnnotationReply
