'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

const AnchorPositionModel = use('App/Models/AnchorPosition')
const { HttpException } = use('@adonisjs/generic-exceptions') 

class Annotation extends Model {
  static boot () {
    super.boot()
    
    this.addTrait('DateUnixMSCase')
    this.addTrait('BooleanCase', ['public', 'deleted'])
    this.addTrait('BooleanCaseMutators', ['Public', 'Deleted'])
  } // static boot () {
  
  user () {
    return this.belongsTo('App/Models/User')
  }
  
  webpage () {
    return this.belongsTo('App/Models/Webpage')
  }
  
  anchorPositions () {
    return this.belongsToMany('App/Models/AnchorPosition')
            .orderBy('paragraph_seq_id', 'asc')
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
  
  static async _setPermission(webpage, user, data, instance) {
    let config = await user.getCurrentReadingProgressStepConfig(webpage)
    let annotationConfig = config.annotation
    if (typeof(annotationConfig) !== 'object') {
      throw new HttpException('You cannot use annotation in current step.')
    }
    
    let {enableControlPermission, defaultPermission} = annotationConfig
    if (enableControlPermission === true) {
      if (typeof(data.public) === 'boolean') {
        instance.public = data.public
      }
      else {
        if (defaultPermission === 'public') {
          instance.public = true
        }
        else {
          instance.public = false
        }
      }
    }
    else if (typeof(data.public) !== 'undefined') {
      throw new HttpException(`You cannot change annotation's premission in current step.`)
    }
    else {
      if (defaultPermission === 'public') {
        instance.public = true
      }
      else {
        instance.public = false
      }
    }
    
    return instance
  }
  
  static async _setPermissionTest(webpage, user, data, instance) {
    if (typeof(data.public) === 'boolean') {
      instance.public = data.public
    }
    return instance
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
    
    instance = await this._setPermission(webpage, user, data, instance)
    //instance = await this._setPermissionTest(webpage, user, data, instance)
    
    await instance.save()
    
    let anchorTextIds = []
    for (let i = 0; i < data.anchorPositions.length; i++) {
      let a = data.anchorPositions[i]
      
      let query = {
        webpage_id: webpage.primaryKeyValue,
        paragraph_seq_id: a.paragraph_seq_id,
        paragraph_id: a.paragraph_id,
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
  } // static async create(webpage, user, data) {
  
  static async findByWebpageGroup(webpage, user, afterTime) {
    
    // 要先取得user的group
    let groups = await user.groups()
            .where('webpage_id', webpage.primaryKeyValue)
            .with('users')
            .fetch()
    
    let userList = []
    if (groups.size() > 0) { 
      for (let i = 0; i < groups.size(); i++) {
        let group = groups.nth(i)
        let users = await group.users().fetch()
        users.toJSON().forEach(user => {
          userList.push(user.id)
        })
      }
    }
    else {
      userList = await webpage.getReaderIDsNotInGroup()
    }
    
    let query = this.query()
            //.select('type')
            .where('webpage_id', webpage.primaryKeyValue)
            .whereIn('user_id', userList)
            .where('deleted', false)
            .whereRaw('((user_id = ?) or (user_id != ? and public IS ?))', [user.primaryKeyValue, user.primaryKeyValue, true])
            //.whereRaw('user_id = ?', [user.primaryKeyValue])
            .with('anchorPositions')

    if (typeof(afterTime) === 'number') {
      // 這邊應該還要做些調整
      query.where('updated_at', '>' , afterTime)
    }
    
    //console.log(query.toSQL())

    return await query.fetch()
  }
  
  static get hidden () {
    //return ['password']
    return ['webpage_id', 'deleted', 'created_at']
    //return ['webpage_id', 'created_at']
  }
}

module.exports = Annotation
