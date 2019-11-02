'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

const AnchorPositionModel = use('App/Models/AnchorPosition')

class Annotation extends Model {
  static boot () {
    super.boot()
    
    this.addTrait('DateUnixMSCase')
  } // static boot () {
  
  user () {
    return this.belongsTo('App/Models/User')
  }
  
  webpage () {
    return this.belongsTo('App/Models/Webpage')
  }
  
  anchorPositions () {
    return this.belongsToMany('App/Models/AnchorPosition')
            .orderBy('paragraphy_seq_id', 'asc')
            .orderBy('start_pos', 'asc')
            .pivotTable('anchor_positions_annotations')
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
    
    if (Array.isArray(data.anchorPositions) === false 
            || data.anchorPositions.length === 0) {
      return false
    }
    
    /*
    let anchorTextInstance = new AnchorTextModel()
    anchorTextInstance.webpage_id = webpage.primaryKeyValue
    anchorTextInstance.start_pos = data.startPos
    anchorTextInstance.end_pos = data.endPos
    anchorTextInstance.anchor_text = data.anchorText
    */
    let instance = new Annotation()

    instance.webpage_id = webpage.primaryKeyValue
    //instance.start_pos = data.startPos
    //instance.end_pos = data.endPos
    instance.user_id = user.primaryKeyValue
    instance.type = data.type
    instance.note = data.note
    await instance.save()
    
    let anchorTextIds = []
    for (let i = 0; i < data.anchorPositions.length; i++) {
      let a = data.anchorPositions[i]
      
      let query = {
        webpage_id: webpage.primaryKeyValue,
        paragraphy_seq_id: a.paragraphy_seq_id,
        paragraphy_id: a.paragraphy_id,
        start_pos: a.start_pos,
        end_pos: a.end_pos,
        anchor_text: a.anchor_text
      }
      //console.log(query)
      let anchorTextInstance = await AnchorPositionModel.findOrCreate(query, query)
      anchorTextIds.push(anchorTextInstance.primaryKeyValue)
      //await anchorTextInstance.annotations().attach.save(instance)
    }
    //console.log(anchorTextIds)
    await instance.anchorPositions().attach(anchorTextIds)
    
    return instance
  }
  
  
  static get hidden () {
    //return ['password']
    return ['webpage_id', 'deleted', 'created_at']
  }
}

module.exports = Annotation
