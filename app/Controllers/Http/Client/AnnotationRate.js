'use strict'

const Annotation = use('App/Controllers/Http/Client/Annotation')

const ReadingActivityLog = use ('App/Models/ReadingActivityLog')

const AnnotationRateModel = use('App/Models/AnnotationRate')
const AnnotationCommentRateModel = use('App/Models/AnnotationCommentRate')
//const Cache = use('Cache')
//const Config = use('Config')

//const { HttpException } = use('@adonisjs/generic-exceptions') 

class AnnotationRate extends Annotation {
  
  async like({request, webpage, user}) {
    const data = request.all()
    return await AnnotationRateModel.like(webpage, user, data)
    //throw new Error('@TODO AnnotationRate.like()')
  }
  
  async likeComment({request, webpage, user}) {
    const data = request.all()
    
    //throw new Error('@TODO AnnotationRate.likeComment()')
    return await AnnotationCommentRateModel.like(webpage, user, data)
  }
  
}

module.exports = AnnotationRate