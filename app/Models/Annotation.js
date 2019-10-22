'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

const AnnotationAnchorTextModel = use('App/Models/AnnotationAnchorText')

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
  
  static async create(webpage, user, data) {
    
    let anchorTextInstance = new AnnotationAnchorTextModel()
    anchorTextInstance.webpage_id = webpage.primaryKeyValue
    anchorTextInstance.start_pos = data.startPos
    anchorTextInstance.end_pos = data.endPos
    anchorTextInstance.anchor_text = data.anchorText
    
    let instance = new Annotation()

    instance.webpage_id = webpage.primaryKeyValue
    instance.start_pos = data.startPos
    instance.end_pos = data.endPos
    instance.user_id = user.primaryKeyValue
    instance.type = data.type
    instance.note = data.note
    
    await anchorTextInstance.annotations().save(instance)
    return instance
  }
}

module.exports = Annotation
