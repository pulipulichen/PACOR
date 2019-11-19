'use strict'

const AnnotationComment = use('App/Controllers/Http/Client/AnnotationComment')
const ReadingActivityLog = use ('App/Models/ReadingActivityLog')

//const AnnotationModel = use('App/Models/Annotation')
//const AnnotationNoteModel = use('App/Models/AnnotationNote')

const Cache = use('Cache')
const Config = use('Config')

//const { HttpException } = use('@adonisjs/generic-exceptions') 

class AnnotationComment extends Annotation {
  
  async init({request, webpage, user}) {
    const options = request.all()
    return await AnnotationComment.findSummary(webpage, user, options)
  }
  
  async next({request, webpage, user}) {
    const options = request.all()
    return await AnnotationComment.findWithPage(webpage, user, options)
  }
  
  async create({request, webpage, user}) {
    const data = request.all()
    return await AnnotationComment.createFromJSON(webpage, user, data)
  }
  
  async update({request, webpage, user}) {
    const data = request.all()
    return await AnnotationComment.updateFromJSON(webpage, user, data)
  }
}

module.exports = AnnotationComment