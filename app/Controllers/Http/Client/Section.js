'use strict'

const Annotation = use('App/Controllers/Http/Client/Annotation')
const ReadingActivityLog = use ('App/Models/ReadingActivityLog')

const AnnotationModel = use('App/Models/Annotation')
const AnnotationNoteModel = use('App/Models/AnnotationNote')

const Cache = use('Cache')
const Config = use('Config')

const { HttpException } = use('@adonisjs/generic-exceptions') 

class Section extends Annotation {
  async init ({request, webpage, user}) {
    let enableCollaborative = await user.isEnableCollaboration(webpage)
    let cacheKey = Cache.key('Section', 'init', enableCollaborative)
    
    return await Cache.rememberWait([webpage, user, this.modelName], Config.get('view.indexCacheMinute'), cacheKey, async () => {
      let query = {}
      let sectionsChecklist = await user.getSectionsChecklist(webpage, query)
      let sectionsAnnotation = await AnnotationModel.buildSectionsAnnotationSummary(webpage, user, query)
      
      return {
        checklist: sectionsChecklist,
        annotation: sectionsAnnotation
      }
    })  // return await Cache.rememberWait([webpage, user, this.modelName], Config.get('view.indexCacheMinute'), cacheKey, async () => {
  }
  
  async annotations ({request, webpage, user}) {
    let query = request.all()
    return await AnnotationModel.buildSectionsAnnotationSummary(webpage, user, query)
  }
  
  async annotationsNext ({request, webpage, user}) {
    let query = request.all()
    return await AnnotationModel.getSectionAnnotations(webpage, user, query)
  }
}

module.exports = Section