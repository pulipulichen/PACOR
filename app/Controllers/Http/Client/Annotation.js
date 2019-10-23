'use strict'

const WebpageUserBaseController = use('App/Controllers/Http/Client/WebpageUserBaseController')
const ReadingActivityLog = use ('App/Models/ReadingActivityLog')

const AnnotationAnchorTextModel = use('App/Models/AnnotationAnchorText')
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
  
  async indexOthers ({ request, webpage, user }) {
    let condition = request.all()
    await ReadingActivityLog.log(webpage, user, this.modelName + '.indexOthers', condition)
    
    let cacheKey = `${this.modelName}.indexOthers.${webpage.id}.${user.id}.${JSON.stringify(condition)}`
    return await Cache.get(cacheKey, async () => {
      let others = await user.getOtherUsersInGroup(webpage)

      let query = this.model
              .query()
              .where('webpage_id', webpage.primaryKeyValue)
              .whereIn('user_id', others)
              .where('private', false)
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