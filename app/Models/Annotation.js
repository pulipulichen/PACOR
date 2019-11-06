'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

const AnchorPositionModel = use('App/Models/AnchorPosition')
const { HttpException } = use('@adonisjs/generic-exceptions') 

const Cache = use('Cache')
const config = use('Config')

class Annotation extends Model {
  static boot () {
    super.boot()
    
    //this.addTrait('DateUnixMSCase')
    this.addTrait('DateUnixMS')
    
    this.addTrait('BooleanCase', ['public', 'deleted'])
    this.addTrait('BooleanCaseMutators', ['Public', 'Deleted'])
    this.addTrait('IntegerCase', ['getUpdatedAtUnixms'])
    
    this.addTrait('CacheRemove')
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
    return this.rates().getCount()
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
    if (highlights.length === 0) {
      return 0
    }
    
    if (highlights.length > 1) {
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
    }
    
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
  
  static async getOthersHighlightsArrayByWebpageGroup(webpage, user, options) {
    const doQuery = async evt => {
      let annotations = await this.findOthersByWebpageGroup(webpage, user, options)
      return this._convertToHighlighArray(annotations, user)
    }
    
    if (options !== undefined) {
      return await doQuery()
    }
    else {
      let cacheKey = Cache.key(`Annotation.getOthersHighlightsArrayByWebpageGroup`, webpage, user)
      return await Cache.rememberWait(Cache.buildTags(webpage, user, this), cacheKey, 2, async () => {
        let result = await doQuery()
        //await Cache.put(cacheKey, result, 2)
        return result
      })  // return await Cache.get(cacheKey, async () => {
    }
  }
  
  static async findOthersByWebpageGroup(webpage, user, {afterTime}) {
    const doQuery = async evt => {
      
      let userList = await user.getOtherUserIDsInGroup(webpage)
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
      return await Cache.rememberWait(Cache.buildTags(webpage, user, this), cacheKey, 2, async () => {
        let result = await doQuery()
        //await Cache.put(cacheKey, result, 2)
        return result
      })  // return await Cache.get(cacheKey, async () => {
    }
  } // static async findOthersByWebpageGroup(webpage, user, afterTime) {
  
  static async getHighlightsByWebpageGroup(webpage, user, query) {
    let highlights = await this.getMyHighlightsArrayByWebpageGroup(webpage, user, query)
    //console.log(highlights)
    let othersHighlights = await this.getOthersHighlightsArrayByWebpageGroup(webpage, user, query)
    //console.log(othersHighlights)
    
    highlights = highlights.concat(othersHighlights)
    return this._convertHighlighArrayToString(highlights, webpage, user)
  }
  
  static async getMyHighlightsByWebpageGroup(webpage, user, query) {
    let highlights = await this.getMyHighlightsArrayByWebpageGroup(webpage, user, query)
    return this._convertHighlighArrayToString(highlights, webpage, user)
  }
  
  static async getOthersHighlightsByWebpageGroup(webpage, user, query) {
    let highlights = await this.getOthersHighlightsArrayByWebpageGroup(webpage, user, query)
    return this._convertHighlighArrayToString(highlights, webpage, user)
  }
  
  static async getMyHighlightsArrayByWebpageGroup(webpage, user, query) {
    const doQuery = async evt => {
      let annotations = await this.findMyByWebpageGroup(webpage, user, query)
      return this._convertToHighlighArray(annotations, user)
    }
    
    return await doQuery()
  }
  
  static async findByWebpageGroup(webpage, user, query) {
    let myAnnotations = await this.findMyByWebpageGroup(webpage, user, query)
    let othersAnnotations = await this.findOthersByWebpageGroup(webpage, user, query)
    
    return myAnnotations.toJSON().concat(othersAnnotations.toJSON())
  }
  
  static async findMyByWebpageGroup(webpage, user, {afterTime}) {
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
  
  static async findByWebpageGroupPosition(webpage, user, {afterTime, anchorPositions, anchorMode, withCount, pick, findUserID, findType, page}) {
    const doQuery = async evt => {
      //console.log('findByWebpageGroupPosition', anchorPositions)
      
      let userList = await user.getUserIDsInGroup(webpage)
      
      let query = this.query()
              .where('webpage_id', webpage.primaryKeyValue)
              .whereIn('user_id', userList)
              .with('user')
              .where('deleted', false)
              .whereRaw('((user_id = ? ) or (user_id != ? and public = ?))', [user.primaryKeyValue, user.primaryKeyValue, true])
              //.whereRaw('user_id = ?', [user.primaryKeyValue])
              .with('anchorPositions')
              .orderBy('updated_at_unixms', 'desc')

      if (withCount === true) {
        query.withCount('rates')
        query.withCount('replies')
      }
      
      if (typeof(findUserID) === 'number') {
        query.where('user_id', findUserID)
      }
      
      if (typeof(findType) === 'string') {
        query.where('type', findType)
      }
      
      if (typeof(page) === 'number') {
        let itemsPerPage = config.get('view.itemsPerPage')
        query.limit(itemsPerPage)
        query.offset(itemsPerPage * page)
      }

      if (anchorPositions !== undefined) {
        if (Array.isArray(anchorPositions) === false) {
          anchorPositions = [anchorPositions]
        }
        if (Array.isArray(anchorPositions)) {
          query.whereHas('anchorPositions', (builder) => {
            builder.where('webpage_id', webpage.primaryKeyValue)
            this._buildAnchorPositionWhere(builder, anchorMode, anchorPositions)
          })
        }
      }

      //console.log(afterTime, typeof(afterTime))
      if (typeof(afterTime) === 'string') {
        afterTime = parseInt(afterTime, 10)
      }
      if (typeof(afterTime) === 'number') {
        //console.log(afterTime)
        // 這邊應該還要做些調整
        query.where('updated_at_unixms', '>', afterTime)
      }

      
      //if (anchorMode === 'exact') console.log(query.toSQL())
      //console.log(query.toSQL())
      let result
      //console.log(pick)
      if (typeof(pick) !== 'number') {
        result = await query.fetch()
      }
      else {
        result = await query.pick(pick)
        if (pick === 1) {
          result = result.first()
        }
      }
      //console.log(result)
      
      return result
    }
    
    if (afterTime !== undefined || true) {
      return await doQuery()
    }
    else {
      let cacheKey = Cache.key(`Annotation.findByWebpageGroupPosition`, webpage, user, anchorPositions, withCount, pick)
      
      //console.log(cacheKey)
      return await Cache.rememberWait(Cache.buildTags(webpage, user, this), cacheKey, 2, async () => {
        let result = await doQuery()
        //await Cache.put(cacheKey, result, 2)
        return result
      })  // return await Cache.get(cacheKey, async () => {
    }
  } // static async findOthersByWebpageGroup(webpage, user, afterTime) {
  
  static _buildAnchorPositionWhere (builder, anchorMode, anchorPositions) {

    anchorPositions = this._filterAnchorPositions(anchorPositions)
    
    let whereQuery
    switch (anchorMode) {
      case 'include':
        whereQuery = this._buildAnchorPositionWhereInclude(anchorPositions)
        break
      case 'exact':
        whereQuery = this._buildAnchorPositionWhereExact(anchorPositions)
        break
      case 'overlap':
        whereQuery = this._buildAnchorPositionWhereOverlap(anchorPositions)
        break
      default:
        whereQuery = this._buildAnchorPositionWhereOverlap(anchorPositions)
    }
    
    //console.log(whereQuery.whereSQL, whereQuery.bindValues)
    
    builder.whereRaw(whereQuery.whereSQL, whereQuery.bindValues)
  }
  
  static _filterAnchorPositions (anchorPositions) {
    return anchorPositions.map(position => {
      if (position === undefined) {
        console.trace('_filterAnchorPositions', position)
      }
      let start_pos = position.start_pos
      
      if (typeof(start_pos) === 'string') {
        start_pos = parseInt(start_pos, 10)
      }

      let end_pos = position.end_pos
      if (typeof(end_pos) === 'string') {
        end_pos = parseInt(end_pos, 10)
      }

      if (start_pos > end_pos) {
        let tmp = start_pos
        start_pos = end_pos
        end_pos = tmp
      }
      
      position.start_pos = start_pos
      position.end_pos = end_pos
      //console.log('position', position)
      
      return position
    })
  }
  
  static _buildAnchorPositionWhereInclude (anchorPositions) {
    let whereAnd = []
    let bindValues = []
    
    anchorPositions.forEach(position => {
      whereAnd.push('(paragraph_id = ? and start_pos >= ? and end_pos <= ?)')
      //console.log(position.end_pos, typeof(position.end_pos))

      bindValues = bindValues.concat([
        position.paragraph_id, 
        position.start_pos, 
        position.end_pos,
      ])
    })

    let whereSQL = whereAnd.join(' and ')
    if (whereAnd.length > 1) {
      whereSQL = `(${whereSQL})`
    }

    return {
      whereSQL: whereSQL,
      bindValues: bindValues
    }
    //console.log(whereOrSQL)
    //console.log(bindValues)
  }
  
  static _buildAnchorPositionWhereExact (anchorPositions) {
    let whereAnd = []
    let bindValues = []
    
    anchorPositions.forEach(position => {
      whereAnd.push('(paragraph_id = ? and start_pos = ? and end_pos = ?)')
      //console.log(position.end_pos, typeof(position.end_pos))
      
      bindValues = bindValues.concat([
        position.paragraph_id, 
        position.start_pos, 
        position.end_pos
      ])
    })

    return {
      whereSQL: '(' + whereAnd.join(' and ') + ')',
      bindValues: bindValues
    }
  }
  
  static _buildAnchorPositionWhereOverlap (anchorPositions) {
    let where = []
    let bindValues = []

    //console.log(anchorPositions)
    anchorPositions.forEach(position => {
      //console.log(position)
      where.push(`(paragraph_id = ? and `
        + `((start_pos >= ? and start_pos <= ?) or (end_pos >= ? and end_pos <= ?)))`)
      bindValues = bindValues.concat([
        position.paragraph_id, 
        position.start_pos, 
        position.end_pos, 
        position.start_pos, 
        position.end_pos
      ])
    })
    
    let whereSQL = where.join(' or ')
    if (where.length > 1) {
      whereSQL = '(' + whereSQL + ')'
    }

    //console.log(whereSQL)
    //console.log(bindValues)
    //whereSQL = ''
    //bindValues = []
    
    return {
      whereSQL: whereSQL,
      bindValues: bindValues
    }
  }
  
  static get hidden () {
    //return ['password']
    return ['webpage_id', 'deleted', 'created_at', 'updated_at', 'created_at_unixms']
    //return ['webpage_id', 'created_at']
  }
}

module.exports = Annotation
