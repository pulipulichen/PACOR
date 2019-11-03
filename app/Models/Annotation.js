'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

const AnchorPositionModel = use('App/Models/AnchorPosition')
const { HttpException } = use('@adonisjs/generic-exceptions') 

const Cache = use('Cache')

class Annotation extends Model {
  static boot () {
    super.boot()
    
    //this.addTrait('DateUnixMSCase')
    this.addTrait('DateUnixMS')
    
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
  
  /**
   * // "type:textContent|28$198$2$confused-clarified$pacor-paragraph-id-2"
   */
  static _convertToHighlighArray (annotations, user) {
    let highlights = []
    
    if (typeof(annotations.toJSON) === 'function') {
      annotations = annotations.toJSON()
    }
    
    annotations.forEach(annotation => {
      let type = annotation.type
      let highlightType = type
      if (annotation.user_id === user.primaryKeyValue) {
        highlightType = 'my-' + type
      }
      else {
        highlightType = 'others-' + type
      }
      
      annotation.anchorPositions.forEach(position => {
        position.type = type
        position.highlightType = highlightType
        highlights.push(position)
      })
    })
    return highlights
  }
  
  /**
   * // "type:textContent|28$198$2$confused-clarified$pacor-paragraph-id-2"
   * @param {Array} highlights
   * @returns {String}
   */
  static async _convertHighlighArrayToString (highlights, webpage, user) {
    let config = await user.getCurrentReadingProgressStepConfig(webpage)
    let configTypes = config.annotation.types
    
    let typesArray = []
    configTypes.forEach(() => {
      typesArray.push([])
    })
    
    highlights.forEach(h => {
      let i = configTypes.indexOf(h.type)
      typesArray[i].push(h)
    })
    
    highlights = []
    typesArray.forEach(typeArray => {
      highlights = highlights.concat(typeArray)
    })
    
    // --------------------------------
    
    let output = highlights.map((h, i) => {
      return [
        h.start_pos,
        h.end_pos,
        (i+1),
        h.highlightType,
        h.paragraph_id
      ].join('$')
    })
    
    output.unshift('type:textContent')
    return output.join('|')
  }
  
  static async getOthersHighlightsArrayByWebpageGroup(webpage, user, afterTime) {
    const doQuery = async evt => {
      let annotations = await this.findOthersByWebpageGroup(webpage, user, afterTime)
      return this._convertToHighlighArray(annotations, user)
    }
    
    if (afterTime !== undefined) {
      return await doQuery()
    }
    else {
      let cacheKey = Cache.key(`Annotation.getOthersHighlightsArrayByWebpageGroup`, webpage, user)
      return await Cache.get(cacheKey, async () => {
        let result = await doQuery()
        await Cache.put(cacheKey, result, 2)
        return result
      })  // return await Cache.get(cacheKey, async () => {
    }
  }
  
  static async findOthersByWebpageGroup(webpage, user, afterTime) {
    const doQuery = async evt => {
      
      let userList = await user.getOtherUserIDsInGroup(webpage)
      //console.log(userList)

      // 要先取得user的group
      /*
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
      */
      //console.log(userList)

      let query = this.query()
              .where('webpage_id', webpage.primaryKeyValue)
              .whereIn('user_id', userList)
              .where('deleted', false)
              .whereRaw('(user_id != ? and public IS ?)', [user.primaryKeyValue, true])
              //.whereRaw('user_id = ?', [user.primaryKeyValue])
              .with('anchorPositions')
              .orderBy('updated_at_unixms', 'desc')

      //console.log(afterTime, typeof(afterTime))
      if (typeof(afterTime) === 'string') {
        afterTime = parseInt(afterTime, 10)
      }
      if (typeof(afterTime) === 'number') {
        //console.log(afterTime)
        // 這邊應該還要做些調整
        query.where('updated_at_unixms', '>', afterTime)
      }

      //console.log(query.toSQL())
      let result = await query.fetch()
      return result
    }
    
    if (afterTime !== undefined) {
      return await doQuery()
    }
    else {
      let cacheKey = Cache.key(`Annotation.findOthersByWebpageGroup`, webpage, user)
      return await Cache.get(cacheKey, async () => {
        let result = await doQuery()
        await Cache.put(cacheKey, result, 2)
        return result
      })  // return await Cache.get(cacheKey, async () => {
    }
  } // static async findOthersByWebpageGroup(webpage, user, afterTime) {
  
  static async getHighlightsByWebpageGroup(webpage, user, afterTime) {
    let highlights = await this.getMyHighlightsArrayByWebpageGroup(webpage, user, afterTime)
    //console.log(highlights)
    let othersHighlights = await this.getOthersHighlightsArrayByWebpageGroup(webpage, user, afterTime)
    //console.log(othersHighlights)
    
    highlights = highlights.concat(othersHighlights)
    return this._convertHighlighArrayToString(highlights, webpage, user)
  }
  
  static async getMyHighlightsByWebpageGroup(webpage, user, afterTime) {
    let highlights = await this.getMyHighlightsArrayByWebpageGroup(webpage, user, afterTime)
    return this._convertHighlighArrayToString(highlights, webpage, user)
  }
  
  static async getMyHighlightsArrayByWebpageGroup(webpage, user, afterTime) {
    const doQuery = async evt => {
      let annotations = await this.findMyByWebpageGroup(webpage, user, afterTime)
      return this._convertToHighlighArray(annotations, user)
    }
    
    return await doQuery()
  }
  
  static async findByWebpageGroup(webpage, user, afterTime) {
    let myAnnotations = await this.findMyByWebpageGroup(webpage, user, afterTime)
    let othersAnnotations = await this.findOthersByWebpageGroup(webpage, user, afterTime)
    
    return myAnnotations.toJSON().concat(othersAnnotations.toJSON())
  }
  
  static async findMyByWebpageGroup(webpage, user, afterTime) {
    const doQuery = async evt => {
      
      let query = this.query()
              .where('webpage_id', webpage.primaryKeyValue)
              .where('user_id', user.primaryKeyValue)
              .where('deleted', false)
              .with('anchorPositions')
              .orderBy('updated_at_unixms', 'desc')

      //console.log(afterTime, typeof(afterTime))
      if (typeof(afterTime) === 'string') {
        afterTime = parseInt(afterTime, 10)
      }
      if (typeof(afterTime) === 'number') {
        //console.log(afterTime)
        // 這邊應該還要做些調整
        query.where('updated_at_unixms', '>', afterTime)
      }

      //console.log(query.toSQL())
      let result = await query.fetch()
      return result
    }
    
    return await doQuery()
  } // static async findOthersByWebpageGroup(webpage, user, afterTime) {
  
  static get hidden () {
    //return ['password']
    return ['webpage_id', 'deleted', 'created_at', 'updated_at', 'created_at_unixms']
    //return ['webpage_id', 'created_at']
  }
}

module.exports = Annotation
