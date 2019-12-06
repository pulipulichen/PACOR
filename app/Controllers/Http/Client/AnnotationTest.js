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

class AnnotationTest extends WebpageUserBaseController {
  constructor () {
    super('Annotation')
  }
  
  /**
   * 測試用
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
   * 僅提供給測試使用，實際上不會用到
   * @param {type} request
   * @param {type} webpage
   * @param {type} user
   * @returns {unresolved}
   */
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
  
  /**
   * 只有給測試使用，實際上不會用到
   * @param {type} request
   * @param {type} webpage
   * @param {type} user
   * @returns {unresolved}
   */
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
}

module.exports = AnnotationTest