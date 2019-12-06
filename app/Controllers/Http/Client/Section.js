'use strict'

const Annotation = use('App/Controllers/Http/Client/Annotation')
const ReadingActivityLog = use ('App/Models/ReadingActivityLog')

const AnnotationModel = use('App/Models/Annotation')
const AnnotationNoteModel = use('App/Models/AnnotationNote')

const Cache = use('Cache')
const Config = use('Config')

const { HttpException } = use('@adonisjs/generic-exceptions') 

const Profiler = use('Profiler')

class Section extends Annotation {
  
  async init ({request, webpage, user}) {
    let profiler = new Profiler(0, 'Section.init()')
    
    let enableCollaborative = await user.isEnableCollaboration(webpage)
    
    profiler.mark('enableCollaborative', enableCollaborative)
    /*
    let cacheKey = Cache.key('Section', 'init', enableCollaborative)
    let result = await Cache.rememberWait([webpage, user, 'Section'], cacheKey, Config.get('view.indexCacheMinute'), async () => {
      let query = {}
      
      //console.log('init', 1)
      
      let sectionsChecklist = await user.getSectionsChecklist(webpage)
      
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
    */
    let cacheKeySectionsChecklist = Cache.key('Section', 'init', enableCollaborative, 'sectionsChecklist')
    let {sectionsChecklist, sectionsChecklistSubmitted} = await Cache.rememberWait([webpage, user, 'Section'], cacheKeySectionsChecklist, Config.get('view.indexCacheMinute'), async () => {
      let sectionsChecklist = await user.getSectionsChecklist(webpage)
      
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
      
      return {sectionsChecklist, sectionsChecklistSubmitted}
    })  // return await Cache.rememberWait([webpage, user, this.modelName], Config.get('view.indexCacheMinute'), cacheKey, async () => {
    profiler.mark('sectionsChecklist sectionsChecklistSubmitted')
    
    //let cacheKeyChecklistAnnotation = Cache.key('Section', 'init', enableCollaborative, 'checklistAnnotation')
    let checklistAnnotation = await AnnotationModel.getSectionsChecklistAnnotation(webpage, user, {
      page: 1
    })
    profiler.mark('checklistAnnotation')
    
    //let cacheKeySectionsAnnotation = Cache.key('Section', 'init', enableCollaborative, 'sectionsAnnotation')
    let sectionsAnnotation = await AnnotationModel.buildSectionsAnnotationSummary(webpage, user)
    profiler.mark('sectionsAnnotation')
    
    profiler.finish()
    
    return {
      checklist: sectionsChecklist,
      checklistSubmitted: sectionsChecklistSubmitted,
      checklistAnnotation: checklistAnnotation,
      annotation: sectionsAnnotation
    }
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
    let profiler = new Profiler(1, 'Section.setChecklist()', attrs)
    
    webpage.log(user, 'Section.setChecklist', attrs)
    
    profiler.mark('webpage.log()')
    
    user.setReadingProgressLogAttr(webpage, attrs)
    
    profiler.finish()
    return 1
  }
  
  async getMainIdeasInSection({request, webpage, user}) {
    let query = request.all()
    return await AnnotationModel.getMainIdeasInSection(webpage, user, query)
  }
  
  /**
   * @deprecated 20191206 似乎是用不到了...
   */
  async createSectionAnnotation({request, webpage, user}) {
    let data = request.all()
    webpage.log(user, 'Section.createSectionAnnotation', data)
    
    let instance = await AnnotationModel.buildSectionsAnnotationSummary(webpage, user, data)
    return instance.id
  }
}

module.exports = Section