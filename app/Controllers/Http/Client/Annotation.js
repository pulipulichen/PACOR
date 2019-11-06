'use strict'

const WebpageUserBaseController = use('App/Controllers/Http/Client/WebpageUserBaseController')
const ReadingActivityLog = use ('App/Models/ReadingActivityLog')

const AnnotationModel = use('App/Models/Annotation')

const Cache = use('Cache')
const Config = use('Config')

class Annotation extends WebpageUserBaseController {
  constructor () {
    super('Annotation')
  }
  
  async create({request, webpage, user}) {
    let data = request.all()
    await ReadingActivityLog.log(webpage, user, 'Annotation.create', data)
    
    let instance = await AnnotationModel.create(webpage, user, data)
    return instance.id
  }
  
  async index ({request, webpage, user}) {
    let query = request.all()
    return await AnnotationModel.findByWebpageGroup(webpage, user, query)
  }
  
  async highlights ({request, webpage, user}) {
    let query = request.all()
    return await AnnotationModel.getHighlightsByWebpageGroup(webpage, user, query)
  }
  
  async highlightsMy ({request, webpage, user}) {
    let query = request.all()
    return await AnnotationModel.getMyHighlightsByWebpageGroup(webpage, user, query)
  }
  
  async highlightsOthers ({request, webpage, user}) {
    let query = request.all()
    return await AnnotationModel.getOthersHighlightsByWebpageGroup(webpage, user, query)
  }
  
  async floatWidget({request, webpage, user}) {
    let query = request.all()
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
  
  async list({request, webpage, user}) {
    let query = request.all()
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
  
  async index ({ request, webpage, user }) {
    let query = request.all()
    //console.log(query)
    return await AnnotationModel.findByWebpageGroupPosition(webpage, user, query)
  }
  
  async indexMy ({ request, webpage, user }) {
    let condition = request.all()
    await ReadingActivityLog.log(webpage, user, this.modelName + '.indexMy', condition)
    
    let cacheKey = `${this.modelName}.indexMy.${webpage.id}.${user.id}.${JSON.stringify(condition)}`
    return await Cache.rememberWait([webpage, user, this.modelName], Config.get('view.indexCacheMinute'), cacheKey, async () => {
      let query = this.model
              .query()
              .where('webpage_id', webpage.primaryKeyValue)
              .where('user_id', user.primaryKeyValue)
              .with('notes')
              .with('anchorPositions')
              .orderBy('created_at', 'asc')

      if (this.hasDeletedColumn === true) {
        query.where('deleted', false)
      }

      if (typeof(condition) === 'object') {
        query.where(condition)
      }

      let output = await query.fetch()
      //await Cache.put(cacheKey, output, Config.get('view.indexCacheMinute'))
      return output
    })
  }
  
  async indexOthers ({ request, webpage, user }) {
    let condition = request.all()
    await ReadingActivityLog.log(webpage, user, this.modelName + '.indexOthers', condition)
    
    let cacheKey = `${this.modelName}.indexOthers.${webpage.id}.${user.id}.${JSON.stringify(condition)}`
    return await Cache.rememberWait([webpage, user, this.modelName], Config.get('view.indexCacheMinute'), cacheKey, async () => {
      let others = await user.getOtherUsersInGroup(webpage)

      let query = this.model
              .query()
              .with('anchorPositions')
              .where('webpage_id', webpage.primaryKeyValue)
              .whereIn('user_id', others)
              .where('public', true)  // 主要是多了這個
              .where('deleted', false)

      if (typeof(condition) === 'object') {
        query.where(condition)
      }

      let output = await query.fetch()
      //await Cache.put(cacheKey, output, Config.get('view.indexCacheMinute'))
      return output
    })
  }
  
  async update ({request, webpage, user}) {
    let data = request.all()
    
    await ReadingActivityLog.log(webpage, user, this.modelName + '.update', data)
    
    let id = data.id
    if (typeof(id) !== 'number' && typeof(id) !== 'string') {
      throw new HttpException('No id')
    }
    
    let instance = await this.model.find(id)
    if (instance.user_id !== user.id) {
      throw new HttpException('You are not owner of it.')
    }
    
    for (let name in data) {
      if (name === 'id') {
        continue
      }
      else {
        instance[name] = data[name]
      }
    }
    
    await instance.save()
    return 1
  }
    
}

module.exports = Annotation