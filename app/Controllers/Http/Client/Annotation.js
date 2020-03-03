'use strict'

const WebpageUserBaseController = use('App/Controllers/Http/Client/WebpageUserBaseController')
const ReadingActivityLog = use ('App/Models/ReadingActivityLog')

const AnnotationModel = use('App/Models/Annotation')
const AnnotationNoteModel = use('App/Models/AnnotationNote')

const Cache = use('Cache')
const Config = use('Config')

const { HttpException } = use('@adonisjs/generic-exceptions') 

const Profiler = use('Profiler')
const Sleep = use('Sleep')

class Annotation extends WebpageUserBaseController {
  constructor () {
    super('Annotation')
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
    
    webpage.log(user, 'Annotation.floatWidget', query)
    
    let isEnableCollaboration = await user.isEnableCollaboration(webpage)
    if (isEnableCollaboration === false) {
      query.findUserID = user.primaryKeyValue
    }
    //console.log(isEnableCollaboration)
    
    let cacheKey = Cache.key('Controllers.Client.Annotation.floatWidget', query)
    return await Cache.rememberWait([webpage, user, this.modelName], cacheKey, 3, async () => {
      query.anchorMode = 'overlap'
      //console.log(query)
      let annotations = await AnnotationModel.findByWebpageGroupPosition(webpage, user, query)

      // 來做計算
      annotations = annotations.toJSON()
      let annotationCount = annotations.length
      if (annotationCount === 0) {
        return 0
      }

      query.pick = 1
      query.withCount = true
      query.anchorMode = 'exact'
      let annotation = await AnnotationModel.findByWebpageGroupPosition(webpage, user, query)
      if (!annotation) {
        query.anchorMode = 'overlap'
        annotation = await AnnotationModel.findByWebpageGroupPosition(webpage, user, query)
      }
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
    webpage.log(user, 'Annotation.listSummary', query)
    
    let isEnableCollaboration = await user.isEnableCollaboration(webpage)
    // console.log({isEnableCollaboration})
    if (isEnableCollaboration === false) {
      query.findUserID = user.primaryKeyValue
    }

    let cacheKey = Cache.key('Controllers.Client.Annotation.list', query)
    return await Cache.rememberWait([webpage, user, this.modelName], cacheKey, 3, async () => {
      query.withCount = true
      
      let annotations = await AnnotationModel.findByWebpageGroupPosition(webpage, user, query)

      // 來做計算
      if (!annotations) {
        throw new Error('Annotations are not found')
      }
      
      if (typeof(annotations.toJSON) === 'function') {
        annotations = annotations.toJSON()
      }
      
      
      let annotationCount = annotations.length
      if (annotationCount === 0) {
        return 0
      }
      
      // for test
      //for (let i = 0; i < 3; i++) {
      //  annotations = annotations.concat(annotations)
      //}
      
      // ------------------------------------------------------------------
      //query.page = null
      if (query.page !== undefined) {
        delete query.page
      }
      
      annotations = await AnnotationModel.findByWebpageGroupPosition(webpage, user, query)
      if (!annotations) {
        throw new Error('Annotation are not found')
      }
      
      if (typeof(annotations.toJSON) === 'function') {
        annotations = annotations.toJSON()
      }

      // 來做計算
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
    
    let isEnableCollaboration = await user.isEnableCollaboration(webpage)
    // console.log({isEnableCollaboration})
    if (isEnableCollaboration === false) {
      query.findUserID = user.primaryKeyValue
    }

    let cacheKey = Cache.key('Controllers.Client.Annotation.listCount', query)
    return await Cache.rememberWait([webpage, user, this.modelName], cacheKey, 3, async () => {
      query.withCount = false
      
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
    
    let isEnableCollaboration = await user.isEnableCollaboration(webpage)
    // console.log({isEnableCollaboration})
    if (isEnableCollaboration === false) {
      query.findUserID = user.primaryKeyValue
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
    users = users.slice(0, Config.get('view.userAvatars')) // 最多三名

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
  
  async getAnnotation({request, webpage, user}) {
    const options = request.all()
    return await AnnotationModel.getAnnotation(webpage, user, options)
  }
}

module.exports = Annotation