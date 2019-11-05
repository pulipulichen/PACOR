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
    let annotations = await AnnotationModel.findByWebpageGroupPosition(webpage, user, query)
    return annotations
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
    return await Cache.get(cacheKey, async () => {
      let query = this.model
              .query()
              .where('webpage_id', webpage.primaryKeyValue)
              .where('user_id', user.primaryKeyValue)
              .with('anchorPositions')
              .orderBy('created_at', 'asc')

      if (this.hasDeletedColumn === true) {
        query.where('deleted', false)
      }

      if (typeof(condition) === 'object') {
        query.where(condition)
      }

      let output = await query.fetch()
      await Cache.put(cacheKey, output, Config.get('view.indexCacheMinute'))
      return output
    })
  }
  
  async indexOthers ({ request, webpage, user }) {
    let condition = request.all()
    await ReadingActivityLog.log(webpage, user, this.modelName + '.indexOthers', condition)
    
    let cacheKey = `${this.modelName}.indexOthers.${webpage.id}.${user.id}.${JSON.stringify(condition)}`
    return await Cache.get(cacheKey, async () => {
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
      await Cache.put(cacheKey, output, Config.get('view.indexCacheMinute'))
      return output
    })
  }
  
}

module.exports = Annotation