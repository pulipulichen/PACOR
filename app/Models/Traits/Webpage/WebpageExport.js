'use strict'

const Cache = use('Cache')
const UserModel = use('App/Models/User')
const AnnotationModel = use('App/Models/Annotation')
const dayjs = use('dayjs')

const ReadingProgressModel = use('App/Models/ReadingProgress')
const StringHelper = use('App/Helpers/StringHelper')
const DateHelper = use('App/Helpers/DateHelper')

//const WebpageGroupModel = use('App/Models/WebpageGroup')

class WebpageExport {

  register(Model) {
    Model.prototype.getReaders = async function (process) {
      let output = []
      
      // --------------------
      
      let groups = await this.groups()
            .with('users')
            .fetch()
      
      for (let i = 0; i < groups.size(); i++) {
        
        let group = groups.nth(i)
        
        
        let readers = group.$relations.users
        for (let j = 0; j < readers.size(); j++) {
          let row = {}
          row.group_id = i
          
          let reader = readers.nth(j)
          let readerJSON = reader.toJSON()
          
          if (typeof(process) === 'function') {
            let processedJSON = await process(reader)
            if (processedJSON && typeof(processedJSON) === 'object') {
              Object.keys(processedJSON).forEach((key) => {
                readerJSON[key] = processedJSON[key]
              })
            }
          }
          
          if (readerJSON && typeof(readerJSON) === 'object') {
            Object.keys(readerJSON).forEach((key) => {
              row[key] = readerJSON[key]
            })
          }
          
          output.push(row)
        }
      }
      
      // ----------------------
      
      let others = await this.getUsersNotInGroup(true)
      for (let j = 0; j < others.size(); j++) {
        let row = {}
        row.group_id = -1

        let reader = others.nth(j)
        let readerJSON = reader.toJSON()
        
        if (readerJSON.role !== 'reader') {
          continue
        }
        
        readerJSON = {
          id: readerJSON.id,
          username: readerJSON.username,
          display_name: readerJSON.display_name,
        }

        if (typeof(process) === 'function') {
          let processedJSON = await process(reader)
          if (processedJSON && typeof(processedJSON) === 'object') {
            //console.log(processedJSON)
            Object.keys(processedJSON).forEach((key) => {
              readerJSON[key] = processedJSON[key]
            })
          }
        }

        if (typeof(readerJSON) === 'object') {
          Object.keys(readerJSON).forEach((key) => {
            row[key] = readerJSON[key]
          })
        }

        output.push(row)
      }
      
      return output
    }
    
    Model.prototype.exportQuestionnaire = async function () {
      let config = await this.getConfig()
      let steps = config.readingProgresses
      
      let questionnaireMode = 'text'
      if (steps.indexOf('PostRecallKeyword') > -1 
                && steps.indexOf('PreImaginaryKeyword') > -1) {
        questionnaireMode = 'keyword'
      }
      
      let output = await this.getReaders(async (reader) => {
        
        if (questionnaireMode === 'keyword') {
          return await reader.exportQuestionnaireKeyword(this)
        }
        else if (questionnaireMode === 'text') {
          return await reader.exportQuestionnaireText(this)
        }
      })
      
      return output
    }
    
    Model.prototype.exportSectionNote = async function () {
      
      let output = await this.getReaders(async (reader) => {
        return await reader.exportSectionNote(this)
      })
      
      return output
    }
    
    Model.prototype.exportAnnotation = async function () {
      let annotations = await AnnotationModel
              .query()
              .where('webpage_id', this.primaryKeyValue)
              .whereNot('type', 'SectionMainIdea')
              .with('notes')
              .orderBy('created_at_unixms')
              .fetch()
      
      let output = []
      //console.log(annotations.size(), this.primaryKeyValue)
      
      for (let i = 0; i < annotations.size(); i++) {
        let annotation = annotations.nth(i)
        
        let item = {
          user_id: annotation.user_id,
          deleted: annotation.deleted,
          type: annotation.type,
        }
        
        let noteInstances = annotation.getRelated('notes')
        let notes = []
        for (let j = 0; j < noteInstances.size(); j++) {
          let noteInstance = noteInstances.nth(j)
          let n = StringHelper.htmlToText(noteInstance.note, true)
          n = n.trim()
          if (n !== '') {
            notes.push(n)
          }
        }
        item.note = notes.join(' / ')
        
        item.created_at = DateHelper.parseAtUnixms(annotation.created_at_unixms).format('YYYY-MMDD-HH:mm:ss')
        item.updated_at = DateHelper.parseAtUnixms(annotation.updated_at_unixms).format('YYYY-MMDD-HH:mm:ss')
        if (item.created_at !== item.updated_at) {
          item.is_updated = true
        }
        
        output.push(item)
      }
      
      return output
    }
    
  } // register (Model) {
}

module.exports = WebpageExport
