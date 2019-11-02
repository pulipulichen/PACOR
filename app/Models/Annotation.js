'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

const AnchorTextModel = use('App/Models/AnchorText')

class Annotation extends Model {
  user () {
    return this.belongsTo('App/Models/User')
  }
  
  webpage () {
    return this.belongsTo('App/Models/Webpage')
  }
  
  anchorTexts () {
    return this.belongsToMany('App/Models/AnchorText')
            .orderBy('paragraphy_seq_id', 'asc')
            .orderBy('start_pos', 'asc')
            .pivotTable('anchor_texts_annotations')
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
    
    let anchorTextInstance = new AnchorTextModel()
    anchorTextInstance.webpage_id = webpage.primaryKeyValue
    anchorTextInstance.start_pos = data.startPos
    anchorTextInstance.end_pos = data.endPos
    anchorTextInstance.anchor_text = data.anchorText
    
    let instance = new Annotation()

    instance.webpage_id = webpage.primaryKeyValue
    //instance.start_pos = data.startPos
    //instance.end_pos = data.endPos
    instance.user_id = user.primaryKeyValue
    instance.type = data.type
    instance.note = data.note
    await instance.save()
    
    let anchorTextIds = []
    for (let i = 0; i < data.highlights.length; i++) {
      let highlight = data.highlights[i]
      
      let query = {
        webpage_id: webpage.primaryKeyValue,
        paragraphy_seq_id: highlight.paragraphy_seq_id,
        paragraphy_id: highlight.paragraphy_id,
        start_pos: highlight.start_pos,
        end_pos: highlight.end_pos,
        anchor_text: highlight.anchor_text
      }
      //console.log(query)
      let anchorTextInstance = await AnchorTextModel.findOrCreate(query, query)
      anchorTextIds.push(anchorTextInstance.primaryKeyValue)
      //await anchorTextInstance.annotations().attach.save(instance)
    }
    //console.log(anchorTextIds)
    await instance.anchorTexts().attach(anchorTextIds)
    
    return instance
  }
}

module.exports = Annotation
