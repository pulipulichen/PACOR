'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class AnnotationReply extends Model {
  user () {
    return this.belongsTo('App/Models/User')
  }
  
  replier () {
    return this.user()
  }
  
  annotation () {
    return this.hasOne('App/Models/Annotation')
  }
  
  replyToAnnotation () {
    return this.annotation()
  }
}

module.exports = AnnotationReply
