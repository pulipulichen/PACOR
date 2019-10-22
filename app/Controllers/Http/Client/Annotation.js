'use strict'

const WebpageUserBaseController = use('App/Controllers/WebpageUserBaseController')
const ReadingActivityLog = use ('App/Models/ReadingActivityLog')

const AnnotationAnchorTextModel = use('App/Models/AnnotationAnchorText')
const AnnotationModel = use('App/Models/Annotation')

class Annotation extends WebpageUserBaseController {
  async create({request, webpage, user}) {
    let data = request.all()
    
    await ReadingActivityLog.log(webpage, user, 'Annotation.create', data)
    
    let instance = await AnnotationModel.create(webpage, user, data)
    return instance.id
  }
}

module.exports = Annotation