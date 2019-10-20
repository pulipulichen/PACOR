'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Annotation extends Model {
  user () {
    return this.belongsTo('App/Models/User')
  }
  
  webpage () {
    return this.belongsTo('App/Models/Webpage')
  }
  
  rate () {
    return this.hasMany('App/Models/AnnotationRate')
            .where('deleted', false)
            .getCount()
  }
  
  replies () {
    return this.hasMany('App/Models/AnnotationReply')
            .where('deleted', false)
            .getCount()
  }
}

module.exports = Annotation
