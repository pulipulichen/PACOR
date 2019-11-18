'use strict'

const Annotation = use('App/Controllers/Http/Client/Annotation')
const ReadingActivityLog = use ('App/Models/ReadingActivityLog')

const AnnotationModel = use('App/Models/Annotation')
const AnnotationNoteModel = use('App/Models/AnnotationNote')

const Cache = use('Cache')
const Config = use('Config')

const { HttpException } = use('@adonisjs/generic-exceptions') 

class AnnotationComment extends Annotation {
  
  async init({request, webpage, user}) {
    const {annotationID} = request.all()
    throw new Error('AnnotationComment.init')
  }
  
  async next({request, webpage, user}) {
    const {annotationID} = request.all()
    throw new Error('AnnotationComment.next')
  }
}

module.exports = AnnotationComment