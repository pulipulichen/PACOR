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
  
  anchorText () {
    return this.belongsTo('App/Models/AnnotationAnchorText')
  }
  
  rates () {
    return this.hasMany('App/Models/AnnotationRate')
            .where('deleted', false)
  }
  
  ratesCount () {
    return this.rate().getCount()
  }
  
  replies () {
    return this.hasMany('App/Models/AnnotationReply')
            .where('deleted', false)
  }
  
  repliesCount () {
    return this.replies().getCount()
  }
  
  attr () {
    return this.hasOne('App/Models/AnnotationAttirbutes')
  }
  
  attrs () {
    return this.hasMany('App/Models/AnnotationAttirbutes')
  }
}

module.exports = Annotation
