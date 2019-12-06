'use strict'

//const WebpageUserBaseController = use('App/Controllers/Http/Client/WebpageUserBaseController')
////const ReadingActivityLog = use ('App/Models/ReadingActivityLog')

const AnnotationModel = use('App/Models/Annotation')
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
  
  async testSession({session}) {
    let time = session.get('time')
    if (!time) {
      time = (new Date).getTime()
      session.put('time', time)
    }
    return time
  }
  
  async clearSession({session}) {
    session.forget('time')
    
    return session.get('time')
  }
}

module.exports = Highlight