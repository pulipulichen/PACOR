'use strict'
const WebpageUserBaseController = use('App/Controllers/Http/Client/WebpageUserBaseController')

const AnnotationModel = use('App/Models/Annotation')

const ReadingActivityLog = use ('App/Models/ReadingActivityLog')

const AnnotationCommentModel = use('App/Models/AnnotationComment')
//const AnnotationNoteModel = use('App/Models/AnnotationNote')

const Cache = use('Cache')
const Config = use('Config')

//const { HttpException } = use('@adonisjs/generic-exceptions') 

class AnnotationComment extends WebpageUserBaseController {
  
  async getCommentSummary({request, webpage, user}) {
    const options = request.all()
    return await AnnotationCommentModel.findSummary(webpage, user, options)
  }
  
  async next({request, webpage, user}) {
    const options = request.all()
    return await AnnotationCommentModel.findWithPage(webpage, user, options)
  }
  
  async getAnnotation({request, webpage, user}) {
    const options = request.all()
    return await AnnotationCommentModel.getAnnotation(webpage, user, options)
  }
  
  // -------------------
  
  async create({request, webpage, user}) {
    const data = request.all()
    //webpage.log(user, 'AnnotationComment.data', data)
    
    //console.log('create', user.username)
    let annotation = await AnnotationModel.find(data.annotationID)
    let annotationUser = await annotation.user().fetch()
    webpage.log(user, 'AnnotationComment.create', data, annotationUser)
    
    return await AnnotationCommentModel.createFromJSON(webpage, user, data)
  }
  
  async update({request, webpage, user}) {
    const data = request.all()
    webpage.log(user, 'AnnotationComment.update', data)
    return await AnnotationCommentModel.updateFromJSON(webpage, user, data)
  }
  
  constructor () {
    super('AnnotationComment')
  }
  
  /**
   * 刪除的功能用內建的destory來做
   * let data = {
   *  id: comment.id
   * }
   */
//  async destroy({request, webpage, user}) {
//  }
}

module.exports = AnnotationComment