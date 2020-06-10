'use strict'

const Cache = use('Cache')
const UserModel = use('App/Models/User')
const AnnotationModel = use('App/Models/Annotation')
const dayjs = use('dayjs')

const ReadingProgressModel = use('App/Models/ReadingProgress')
const StringHelper = use('App/Helpers/StringHelper')
const DateHelper = use('App/Helpers/DateHelper')

const AnnotationCommentModel = use('App/Models/AnnotationComment')

const AnnotationRateModel = use('App/Models/AnnotationRate')
const AnnotationCommentRateModel = use('App/Models/AnnotationCommentRate')

const DatabaseHelper = use('App/Helpers/DatabaseHelper')

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
              .with('user')
              .with('notes')
              .orderBy('created_at_unixms')
              .fetch()
      
      let output = []
      //console.log(annotations.size(), this.primaryKeyValue)
      
      for (let i = 0; i < annotations.size(); i++) {
        let annotation = annotations.nth(i)
        let annotationJSON = annotation.toJSON()
        
        let item = {
          annotation_id: annotation.primaryKeyValue,
          user_id: annotation.user_id,
          username: annotationJSON.user.username,
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
    
    Model.prototype.exportComment = async function () {
      let comments = await AnnotationCommentModel
              .query()
              .whereHas('annotation', (builder) => {
                  builder.where('webpage_id', this.primaryKeyValue)
                         //.where('deleted', false)
                }, '>', 0)
              .with('annotation', (builder) => {
                  builder.with('user')
              })
              .with('user')
              .orderBy('created_at_unixms')
              .fetch()
      
      let output = []
      //console.log(annotations.size(), this.primaryKeyValue)
      
      for (let i = 0; i < comments.size(); i++) {
        let comment = comments.nth(i)
        let json = comment.toJSON()
        
        let item = {
          user_id: comment.user_id,
          username: json.user.username,
          annotation_id: json.annotation.id,
          annotation_user_id: json.annotation.user_id,
          annotation_username: json.annotation.user.username,
          annotation_type: json.annotation.type,
          deleted: comment.deleted,
          note: comment.note,
        }
        
        item.created_at = DateHelper.parseAtUnixms(comment.created_at_unixms).format('YYYY-MMDD-HH:mm:ss')
        item.updated_at = DateHelper.parseAtUnixms(comment.updated_at_unixms).format('YYYY-MMDD-HH:mm:ss')
        if (item.created_at !== item.updated_at) {
          item.is_updated = true
        }
        
        output.push(item)
      }
      
      return output
    }
    
    Model.prototype.exportRate = async function () {
      let output = []
      
      let annotationRates = await AnnotationRateModel
              .query()
              .whereHas('annotation', (builder) => {
                  builder.where('webpage_id', this.primaryKeyValue)
                         //.where('deleted', false)
                }, '>', 0)
              .with('annotation', (builder) => {
                  builder.with('user')
              })
              .with('user')
              .orderBy('id')
              .fetch()
      
      
      //console.log(annotations.size(), this.primaryKeyValue)
      
      for (let i = 0; i < annotationRates.size(); i++) {
        let rate = annotationRates.nth(i)
        let json = rate.toJSON()
        
        
        
        let item = {
          user_id: rate.user_id,
          username: json.user.username,
          type: rate.type,
          anchor: 'annotation',
          anchor_type: json.annotation.type,
          anchor_id: json.annotation.id,
          anchor_user_id: json.annotation.user_id,
          anchor_username: json.annotation.user.username,
          deleted: rate.deleted,
          created_at: json.created_at,
          updated_at: json.updated_at,
          unix: dayjs(rate.created_at).unix()
        }
        
        
        if (item.created_at !== item.updated_at) {
          item.is_updated = true
        }
        
        output.push(item)
      }
      
      // -----------------------------------
      
      let commentRates = await AnnotationCommentRateModel
              .query()
              .whereHas('comment', (builder) => {
                  builder.whereHas('annotation', (builder) => {
                           builder.where('webpage_id', this.primaryKeyValue)
                         }, '>', 0)
                         //.where('deleted', false)
                }, '>', 0)
              .with('comment', (builder) => {
                  builder.with('user')
                         .with('annotation')
              })
              .with('user')
              .orderBy('id')
              .fetch()
      
      
      //console.log(annotations.size(), this.primaryKeyValue)
      
      for (let i = 0; i < commentRates.size(); i++) {
        let rate = commentRates.nth(i)
        let json = rate.toJSON()
        
        let item = {
          user_id: rate.user_id,
          username: json.user.username,
          anchor: 'comment',
          anchor_type: json.comment.annotation.type,
          type: rate.type,
          anchor_id: json.comment.id,
          anchor_user_id: json.comment.user_id,
          anchor_username: json.comment.user.username,
          deleted: rate.deleted,
          created_at: json.created_at,
          updated_at: json.updated_at,
          unix: dayjs(rate.created_at).unix()
        }
        
        if (item.created_at !== item.updated_at) {
          item.is_updated = true
        }
        
        output.push(item)
      }
      
      output.sort((a, b) => {
        return (a.unix - b.unix)
      })
      
      output = output.map(item => {
        delete item.unix
        return item
      })
      
      // -----------------------------------
      
      return output
    }
    
  } // register (Model) {
}

module.exports = WebpageExport
