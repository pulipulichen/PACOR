'use strict'

const ReadingActivityLog = use ('App/Models/ReadingActivityLog')

const Cache = use('Cache')
const Config = use('Config')

const AnnotationModal = use ('App/Models/Annotation')

class AnnotationTypeFilter {
  
  async init ({ request, webpage, user }) {
    let options = request.all()
    return await AnnotationModal.getAnnotationTypeFilterInit(webpage, user, options)
  }
  
}

module.exports = AnnotationTypeFilter