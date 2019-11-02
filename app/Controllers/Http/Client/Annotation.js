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
  
  async indexMy ({ request, webpage, user }) {
    let condition = request.all()
    await ReadingActivityLog.log(webpage, user, this.modelName + '.indexMy', condition)
    
    let cacheKey = `${this.modelName}.indexMy.${webpage.id}.${user.id}.${JSON.stringify(condition)}`
    return await Cache.get(cacheKey, async () => {
      let query = this.model
              .query()
              .where('webpage_id', webpage.primaryKeyValue)
              .where('user_id', user.primaryKeyValue)
              .with('anchorTexts')
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
              .with('anchor_texts')
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