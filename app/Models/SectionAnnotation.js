'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Annotation = use('App/Models/Annotation')

class SectionAnnotation extends Annotation {
  rates () {
    return this.hasMany('App/Models/SectionAnnotationRate')
            .where('deleted', false)
  }
  
  replies () {
    return this.hasMany('App/Models/SectionAnnotationReply')
            .where('deleted', false)
  }
}

module.exports = SectionAnnotation
