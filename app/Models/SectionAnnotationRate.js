'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const AnnotationRate = use('App/Models/AnnotationRate')

class SectionAnnotationRate extends AnnotationRate {
  annotation () {
    return this.hasOne('App/Models/SectionAnnotation')
  }
  
  get anchorType () {
    return 'SectionAnnotation'
  }
}

module.exports = SectionAnnotationRate
