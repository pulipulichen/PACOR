'use strict'

const WebpageUserBaseController = use('App/Controllers/Http/Client/WebpageUserBaseController')
const ReadingActivityLog = use ('App/Models/ReadingActivityLog')

const AnnotationModel = use('App/Models/Annotation')
const AnnotationNoteModel = use('App/Models/AnnotationNote')

const Cache = use('Cache')
const Config = use('Config')

const { HttpException } = use('@adonisjs/generic-exceptions') 

class Annotation extends WebpageUserBaseController {
  constructor () {
    super('Annotation')
  }
  
  async create({request, webpage, user}) {
    let data = request.all()
    
    await webpage.log(user, 'Annotation.create', data)
    
    let instance = await AnnotationModel.create(webpage, user, data)
    return instance.id
  }
  
  async createSectionAnnotation({request, webpage, user}) {
    let data = request.all()
    await webpage.log(user, 'Annotation.crecreateSectionAnnotationateSection', data)
    
    let instance = await AnnotationModel.buildSectionsAnnotationSummary(webpage, user, data)
    return instance.id
  }
  
  /**
   * 似乎是沒有用到
   * @param {type} request
   * @param {type} webpage
   * @param {type} user
   * @returns {unresolved}
   */
  async index ({request, webpage, user}) {
    let query = request.all()
    return await AnnotationModel.findByWebpageGroup(webpage, user, query)
  }
  
  /**
   * 初始化使用
   * @param {Object} request
   * @param {Webpage} webpage
   * @param {User} user
   * @returns {Object}
   */
  async highlights ({request, webpage, user}) {
    let query = request.all()
    //console.log(query)
    return await AnnotationModel.getHighlightsByWebpageGroup(webpage, user, query)
  }
  
  /**
   * 初始化使用
   * @param {Object} request
   * @param {Webpage} webpage
   * @param {User} user
   * @returns {Object}
   */
  async highlightsMy ({request, webpage, user}) {
    let query = request.all()
    return await AnnotationModel.getMyHighlightsByWebpageGroup(webpage, user, query)
  }

  /**
   * 初始化使用
   * @param {Object} request
   * @param {Webpage} webpage
   * @param {User} user
   * @returns {Object}
   */
  async highlightsOthers ({request, webpage, user}) {
    let query = request.all()
    return await AnnotationModel.getOthersHighlightsByWebpageGroup(webpage, user, query)
  }
  
  /**
   * 搜尋特定位置
   * @param {Object} request
   * @param {Webpage} webpage
   * @param {User} user
   * @returns {Object}
   */
  async floatWidget({request, webpage, user}) {
    let query = request.all()
    await webpage.log(user, 'Annotation.floatWidget', query)
    
    let cacheKey = Cache.key('Controllers.Client.Annotation.floatWidget', query)
    return await Cache.rememberWait([webpage, user, this.modelName], cacheKey, 3, async () => {
      
      let annotations = await AnnotationModel.findByWebpageGroupPosition(webpage, user, query)

      // 來做計算
      annotations = annotations.toJSON()
      let annotationCount = annotations.length
      if (annotationCount === 0) {
        return 0
      }

      query.pick = 1
      query.withCount = true
      let annotation = await AnnotationModel.findByWebpageGroupPosition(webpage, user, query)
      annotation = annotation.toJSON()
      //console.log('annotation', annotation)

      // ---------------------
      let {users, userCount, types} = this._summaryAnnotations(annotations)

      return {
        annotation,
        annotationCount,
        users,
        userCount,
        types
      }
    
    })  // return await Cache.rememberWait(cacheKey, 2, async () => {
  }
  
  async listSummary({request, webpage, user}) {
    let query = request.all()
    await webpage.log(user, 'Annotation.listSummary', query)
    
    let cacheKey = Cache.key('Controllers.Client.Annotation.list', query)
    return await Cache.rememberWait([webpage, user, this.modelName], cacheKey, 3, async () => {
      query.withCount = true
      let annotations = await AnnotationModel.findByWebpageGroupPosition(webpage, user, query)

      // 來做計算
      annotations = annotations.toJSON()
      let annotationCount = annotations.length
      if (annotationCount === 0) {
        return 0
      }
      
      // for test
      //for (let i = 0; i < 3; i++) {
      //  annotations = annotations.concat(annotations)
      //}
      
      // ------------------------------------------------------------------
      query.page = null
      annotations = await AnnotationModel.findByWebpageGroupPosition(webpage, user, query)

      // 來做計算
      annotations = annotations.toJSON()
      annotationCount = annotations.length
      if (annotationCount === 0) {
        return 0
      }

      // ---------------------
      let {users, userCount, types} = this._summaryAnnotations(annotations)

      return {
        annotations,
        annotationCount,
        users,
        userCount,
        types
      }
    
    })  // return await Cache.rememberWait(cacheKey, 2, async () => {
  }
  
  /**
   * 這個是搜尋的時候會用到的
   * @param {type} request
   * @param {type} webpage
   * @param {type} user
   * @returns {unresolved}
   */
  async listCount({request, webpage, user}) {
    let query = request.all()
    let cacheKey = Cache.key('Controllers.Client.Annotation.listCount', query)
    return await Cache.rememberWait([webpage, user, this.modelName], cacheKey, 3, async () => {
      query.withCount = true
      let annotations = await AnnotationModel.findByWebpageGroupPosition(webpage, user, query)
      return annotations.size()
    })  // return await Cache.rememberWait(cacheKey, 2, async () => {
  }
  
  /**
   * 下一頁
   * @param {type} request
   * @param {type} webpage
   * @param {type} user
   * @returns {unresolved}
   */
  async listNext({request, webpage, user}) {
    let query = request.all()
    if (query.page === 5) {
      return null
    }
    
    let cacheKey = Cache.key('Controllers.Client.Annotation.listNext', query)
    return await Cache.rememberWait([webpage, user, this.modelName], cacheKey, 0, async () => {
      query.withCount = true
      let annotations = await AnnotationModel.findByWebpageGroupPosition(webpage, user, query)

      // 來做計算
      annotations = annotations.toJSON()
      let annotationCount = annotations.length
      if (annotationCount === 0) {
        return null
      }
      return annotations
    })  // return await Cache.rememberWait(cacheKey, 2, async () => {
  }
  
  _summaryAnnotations (annotations) {
    if (typeof(annotations.toJSON) === 'function') {
      annotations = annotations.toJSON()
    }
    let annotationCount = annotations.length
    
    let usersMap = {}

    annotations.forEach(annotation => {
      let user = annotation.user
      if (typeof(usersMap[user.username]) === 'undefined') {
        usersMap[user.username] = user
      }
    })
    let users = Object.keys(usersMap).map(key => usersMap[key])
    let userCount = users.length
    //for (let i = 0; i < 3; i++) {
    //  users = users.concat(users)
    //}
    users = users.slice(0, 3) // 最多三名

    // ---------------------

    let typesMap = {}
    annotations.forEach(annotation => {
      let type = annotation.type
      if (typeof(typesMap[type]) !== 'number') {
        typesMap[type] = 0
      }
      typesMap[type]++
    })
    let types = Object.keys(typesMap).map(type => {
      return {
        type,
        count: typesMap[type]
      }
    })
    
    return {
      annotationCount,
      users,
      userCount,
      types
    }
  }
  
  /**
   * 不會用到
   * @param {type} request
   * @param {type} webpage
   * @param {type} user
   * @returns {unresolved}
   */
//  async index ({ request, webpage, user }) {
//    let query = request.all()
//    //console.log(query)
//    return await AnnotationModel.findByWebpageGroupPosition(webpage, user, query)
//  }

  /**
   * 不會用到
   * @param {type} request
   * @param {type} webpage
   * @param {type} user
   * @returns {unresolved}
   */
//  async indexMy ({ request, webpage, user }) {
//    let condition = request.all()
//    await ReadingActivityLog.log(webpage, user, this.modelName + '.indexMy', condition)
//    
//    let cacheKey = `${this.modelName}.indexMy.${webpage.id}.${user.id}.${JSON.stringify(condition)}`
//    return await Cache.rememberWait([webpage, user, this.modelName], Config.get('view.indexCacheMinute'), cacheKey, async () => {
//      let query = this.model
//              .query()
//              .where('webpage_id', webpage.primaryKeyValue)
//              .where('user_id', user.primaryKeyValue)
//              .with('notes')
//              .with('anchorPositions')
//              .orderBy('created_at', 'asc')
//
//      if (this.hasDeletedColumn === true) {
//        query.where('deleted', false)
//      }
//
//      if (typeof(condition) === 'object') {
//        query.where(condition)
//      }
//
//      let output = await query.fetch()
//      //await Cache.put(cacheKey, output, Config.get('view.indexCacheMinute'))
//      return output
//    })
//  }
  
  /**
   * 不會用到
   * @param {type} request
   * @param {type} webpage
   * @param {type} user
   * @returns {unresolved}
   */
//  async indexOthers ({ request, webpage, user }) {
//    let condition = request.all()
//    await ReadingActivityLog.log(webpage, user, this.modelName + '.indexOthers', condition)
//    
//    let cacheKey = `${this.modelName}.indexOthers.${webpage.id}.${user.id}.${JSON.stringify(condition)}`
//    return await Cache.rememberWait([webpage, user, this.modelName], Config.get('view.indexCacheMinute'), cacheKey, async () => {
//      let others = await user.getOtherUsersInGroup(webpage)
//
//      let query = this.model
//              .query()
//              .with('anchorPositions')
//              .where('webpage_id', webpage.primaryKeyValue)
//              .whereIn('user_id', others)
//              .where('public', true)  // 主要是多了這個
//              .where('deleted', false)
//
//      if (typeof(condition) === 'object') {
//        query.where(condition)
//      }
//
//      let output = await query.fetch()
//      //await Cache.put(cacheKey, output, Config.get('view.indexCacheMinute'))
//      return output
//    })
//  }
  
  async update ({request, webpage, user}) {
    //console.log('ready to update 4')
    let data = request.all()
    await webpage.log(user, 'Annotation.update', data)
    
    //console.log('update')
    await ReadingActivityLog.log(webpage, user, this.modelName + '.update', data)
    //console.log('ready to update 3')
    let id = data.id
    if (typeof(id) !== 'number' && typeof(id) !== 'string') {
      throw new HttpException('No id')
    }
    //console.log('ready to update 2')
    let instance = await this.model.find(id)
    if (instance.user_id !== user.id) {
      throw new HttpException('You are not owner of it.')
    }
    //console.log('ready to update 1')
    await instance.updateAnnotation(data)
    return 1
  }
  
//  async init ({request, webpage, user}) {
//    let query = request.all()
//    
//    let highlights
//    //let sections
//    
//    let enableCollaborative = await user.isEnableCollaboration(webpage)
//    
//    let cacheKey = Cache.key('init', enableCollaborative, query)
//    return await Cache.rememberWait([webpage, user, this.modelName], Config.get('view.indexCacheMinute'), cacheKey, async () => {
//
//      if (enableCollaborative === true) {
//        let hasAfterTime = (typeof (query.afterTime) === 'number')
//        if (hasAfterTime === false) {
//          highlights = await AnnotationModel.getHighlightsByWebpageGroup(webpage, user, query)
//        } else {
//          highlights = await AnnotationModel.getOthersHighlightsByWebpageGroup(webpage, user, query)
//        }
//      } else {
//        highlights = await AnnotationModel.getMyHighlightsByWebpageGroup(webpage, user, query)
//      }
//      
//      // ------------------------------
//
//      let sectionsChecklist = await user.getSectionsChecklist(webpage, query)
//      let sectionsAnnotation = await AnnotationModel.buildSectionsAnnotationSummary(webpage, user, query)
//      
//      return {
//        highlights,
//        sections: {
//          checklist: sectionsChecklist,
//          annotation: sectionsAnnotation
//        }
//      }
//    })  // return await Cache.rememberWait([webpage, user, this.modelName], Config.get('view.indexCacheMinute'), cacheKey, async () => {
//  }
  
//  async sectionsAnnotation ({request, webpage, user}) {
//    let query = request.all()
//    await webpage.log(user, 'Annotation.sectionsAnnotation', query)
//    return await AnnotationModel.buildSectionsAnnotationSummary(webpage, user, query)
//  }
//  
//  async listSectionNext ({request, webpage, user}) {
//    let query = request.all()
//    return await AnnotationModel.getSectionAnnotations(webpage, user, query)
//  }
  
  async getAnnotation({request, webpage, user}) {
    const options = request.all()
    return await AnnotationModel.getAnnotation(webpage, user, options)
  }
}

module.exports = Annotation