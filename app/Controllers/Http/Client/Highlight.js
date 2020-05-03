'use strict'

//const WebpageUserBaseController = use('App/Controllers/Http/Client/WebpageUserBaseController')
////const ReadingActivityLog = use ('App/Models/ReadingActivityLog')

const AnnotationModel = use('App/Models/Annotation')

const DateHelper = use('App/Helpers/DateHelper')
//const AnnotationNoteModel = use('App/Models/AnnotationNote')
//
//const Cache = use('Cache')
//const Config = use('Config')
//
//const { HttpException } = use('@adonisjs/generic-exceptions') 
//
//const Profiler = use('Profiler')
//const Sleep = use('Sleep')

class Highlight {
  
  /**
   * 初始化使用
   * @param {Object} request
   * @param {Webpage} webpage
   * @param {User} user
   * @returns {Object}
   */
  async highlights ({request, webpage, user, session}) {
    let query = request.all()
    //console.log(query)
    return await AnnotationModel.getHighlightsByWebpageGroup(webpage, user, query, session)
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
  async highlightsOthers ({request, webpage, user, session}) {
    let query = request.all()
    return await AnnotationModel.getOthersHighlightsByWebpageGroup(webpage, user, query, session)
  }
  
  // ---------------------------------------------
  
  /**
   * 測試用
   * @param {type} request
   * @param {type} session
   * @returns {token}
   */
  async testSessionToken({request, session}) {
    let token = DateHelper.getTime().toString(36)
    let time = {
      time: DateHelper.getTime()
    }
    let key = 'time.' + token
    console.log(key)
    session.put('time.' + token, time)
    return token
  }
  
  /**
   * 測試用
   * @param {type} request
   * @param {type} session
   * @returns {token}
   */
  async testSession({request, session}) {
    let {
      token
    } = request.all()
    
    console.log(token)
    let key = 'time.' + token
    console.log(key)
    return session.get(key)
  }
  
  /**
   * 測試用
   * @param {type} request
   * @param {type} session
   * @returns {token}
   */
  async clearSession({request, session}) {
    let {
      token
    } = request.all()
    let key = 'time.' + token
    console.log(key)
    session.forget(key)
    
    return session.get(key)
  }
}

module.exports = Highlight