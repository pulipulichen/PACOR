'use strict'

const Cache = use('Cache')

const AnnotationModel = use('App/Models/Annotation')
const StringHelper = use('App/Helpers/StringHelper')

class UserDashboard {

  register(Model) {
    
    Model.prototype.getAnnotationsInStep = async function (webpage, start_timestamp, end_timestamp) {
      let cacheKey = Cache.key(`User.getAnnotationsInStep`, start_timestamp, end_timestamp)
      
      let output = await Cache.rememberWait([webpage, this, 'User'], cacheKey, async () => {
        let query = AnnotationModel
                .query()
                .with('notes')
                .where('deleted', false)
                .whereNot('type', 'SectionMainIdea')
                .where('user_id', this.primaryKeyValue)
                .where('webpage_id', webpage.primaryKeyValue)

        if (typeof(start_timestamp) === 'number') {
          query.where('created_at_unixms', '>=', start_timestamp)
        }

        if (typeof(end_timestamp) === 'number') {
          query.where('created_at_unixms', '<=', end_timestamp)
        }

        let result = await query.fetch()
        return result.toJSON()
      })
      return output
    }
    
    Model.prototype.getSectionAnnotationsInStep = async function (webpage, start_timestamp, end_timestamp) {
      let cacheKey = Cache.key(`User.getSectionAnnotationsInStep`, start_timestamp, end_timestamp)
      
      let output = await Cache.rememberWait([webpage, this, 'User'], cacheKey, async () => {
        let query = AnnotationModel
                .query()
                .with('notes')
                .with('anchorPositions')
                .where('deleted', false)
                .where('type', 'SectionMainIdea')
                .where('user_id', this.primaryKeyValue)
                .where('webpage_id', webpage.primaryKeyValue)

        if (typeof(start_timestamp) === 'number') {
          query.where('created_at_unixms', '>=', start_timestamp)
        }

        if (typeof(end_timestamp) === 'number') {
          query.where('created_at_unixms', '<=', end_timestamp)
        }

        let result = await query.fetch()
        return result.toJSON()
      })
      return output
    }
    
    Model.prototype.countAnnotations = async function (webpage, start_timestamp, end_timestamp) {
      let cacheKey = Cache.key(`User.countAnnotations`, start_timestamp, end_timestamp)
      let output = await Cache.rememberWait([webpage, this, 'User'], cacheKey, async () => {
        let annotations = await this.getAnnotationsInStep(webpage, start_timestamp, end_timestamp)
        //console.log(annotations)
        return annotations.length
      })
      return output
    }
    
    Model.prototype.countAnnotationNoteWords = async function (webpage, start_timestamp, end_timestamp) {
      let cacheKey = Cache.key(`User.countAnnotationNoteWords`, start_timestamp, end_timestamp)
      let output = await Cache.rememberWait([webpage, this, 'User'], cacheKey, async () => {
        let wordCount = 0
        
        let annotations = await this.getAnnotationsInStep(webpage, start_timestamp, end_timestamp)
        //console.log(annotations.length)
        annotations.forEach((annotation) => {
          annotation.notes.forEach((note) => {
            let noteText = note.note
            noteText = StringHelper.htmlToText(noteText, true)
            wordCount = wordCount + StringHelper.countWords(noteText)
          })
        })
        
        return wordCount
      })
      return output
    }
    
    Model.prototype.countAnnotationTypes = async function (webpage, start_timestamp, end_timestamp) {
      let cacheKey = Cache.key(`User.countAnnotationTypes`, start_timestamp, end_timestamp)
      let output = await Cache.rememberWait([webpage, this, 'User'], cacheKey, async () => {
        let types = {}
        
        let annotations = await this.getAnnotationsInStep(webpage, start_timestamp, end_timestamp)
        annotations.forEach((annotation) => {
          let type = annotation.type
          
          if (typeof(types[type]) !== 'number') {
            types[type] = 0
          }
          types[type]++
        })
        
        return types
      })
      return output
    }
    
    
    Model.prototype.getSectionNotes = async function (webpage, start_timestamp, end_timestamp) {
      let cacheKey = Cache.key(`User.getSectionNotes`, start_timestamp, end_timestamp)
      let output = await Cache.rememberWait([webpage, this, 'User'], cacheKey, async () => {
        let notes = []
        
        let annotations = await this.getSectionAnnotationsInStep(webpage, start_timestamp, end_timestamp)
        annotations.forEach((annotation) => {
          let sectionID = annotation.anchorPositions[0].section_id
          notes[sectionID] = annotation.notes[0].note
        })
        
        return notes
      })
      return output
    }
    
    
  } // register (Model) {
}

module.exports = UserDashboard
