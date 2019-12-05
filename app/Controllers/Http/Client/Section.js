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
    
    return await Cache.rememberWait([webpage, user, 'Section'], cacheKey, Config.get('view.indexCacheMinute'), async () => {
      let query = {}
      
      //console.log('init', 1)
      
      let sectionsChecklist = await user.getSectionsChecklist(webpage, query)
      
      //console.log('init', 2)
      
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
      
      //console.log('init', 3)
      
      let checklistAnnotation = await AnnotationModel.getSectionsChecklistAnnotation(webpage, user, query)
      
      //console.log('init', 4)
      
      let sectionsAnnotation = await AnnotationModel.buildSectionsAnnotationSummary(webpage, user, query)
      
      //console.log('init', 5)
      
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
    webpage.log(user, 'Section.setChecklist', attrs)
    await user.setReadingProgressLogAttr(webpage, attrs)
    return 1
  }
  
  async getMainIdeasInSection({request, webpage, user}) {
    let query = request.all()
    return await AnnotationModel.getMainIdeasInSection(webpage, user, query)
  }
}

module.exports = Section