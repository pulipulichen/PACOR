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
      
      
      let sectionsChecklistSubmitted = null
      if (Array.isArray(sectionsChecklist)) {
        sectionsChecklistSubmitted = sectionsChecklist.map(checklist => {
          if (Array.isArray(checklist) === false
                  || checklist.length === 0) {
            return false
          }
          
          for (let i = 0; i < checklist.length; i++) {
            if (checklist[i] === false) {
              return false
            }
          }
          return true
        })
      }
      
      let checklistAnnotation = await AnnotationModel.getSectionsChecklistAnnotation(webpage, user, query)
      let sectionsAnnotation = await AnnotationModel.buildSectionsAnnotationSummary(webpage, user, query)
      
      return {
        checklist: sectionsChecklist,
        checklistSubmitted: sectionsChecklistSubmitted,
        checklistAnnotation: checklistAnnotation,
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
  
  
  async setChecklist({request, webpage, user}) {
    let attrs = request.all()
    await webpage.log(user, 'Section.setChecklist', attrs)
    await user.setReadingProgressLogAttr(webpage, attrs)
    return 1
  }
  
  async getMainIdeasInSection({request, webpage, user}) {
    let query = request.all()
    return await AnnotationModel.getMainIdeasInSection(webpage, user, query)
  }
}

module.exports = Section