'use strict'

const Annotation = use('App/Controllers/Http/Client/Annotation')
const ReadingActivityLog = use ('App/Models/ReadingActivityLog')

const AnnotationCommentModel = use('App/Models/AnnotationComment')
//const AnnotationNoteModel = use('App/Models/AnnotationNote')

const Cache = use('Cache')
const Config = use('Config')

//const { HttpException } = use('@adonisjs/generic-exceptions') 

class AnnotationComment extends Annotation {
  
  async init({request, webpage, user}) {
    const options = request.all()
    return await AnnotationCommentModel.findSummary(webpage, user, options)
  }
  
  async next({request, webpage, user}) {
    const options = request.all()
    return await AnnotationCommentModel.findWithPage(webpage, user, options)
  }
  
  async create({request, webpage, user}) {
    const data = request.all()
    return await AnnotationCommentModel.createFromJSON(webpage, user, data)
  }
  
  async update({request, webpage, user}) {
    const data = request.all()
    return await AnnotationCommentModel.updateFromJSON(webpage, user, data)
  }
}

module.exports = AnnotationComment