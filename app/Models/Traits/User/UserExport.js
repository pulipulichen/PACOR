'use strict'

const Cache = use('Cache')
const { HttpException } = use('@adonisjs/generic-exceptions') 
const ReadingActivityLog = use('App/Models/ReadingActivityLog')
const ReadingProgressModel = use('App/Models/ReadingProgress')
const AnnotationModel = use('App/Models/Annotation')

const StringHelper = use('App/Helpers/StringHelper')

class UserExport {

  register(Model) {
    
    Model.prototype.exportQuestionnaireKeyword = async function (webpage) {
      let stepList = ['PreImaginaryKeyword', 'PostRecallKeyword']
      
      let output = {}
      let logs = []
      
      for (let i = 0; i < stepList.length; i++) {
        let stepName = stepList[i]
        
        let log = await this.getReadingProgressLog(webpage, stepName)
        
        if (!log) {
          continue
        }
        
        let {
          answeredList,
          removedList
        } = log
        
        logs.push({
          answeredList,
          removedList
        })
        
        if (Array.isArray(answeredList)
                && answeredList.length > 0) {
          output[stepName + '_answered'] = answeredList.join(' ')
          output[stepName + '_answered_count'] = answeredList.length
        }
        
        if (Array.isArray(removedList)
                && removedList.length > 0) {
          output[stepName + '_removed'] = removedList.join(' ')
          output[stepName + '_removed_count'] = removedList.length
        }
      }
      
      // --------------------------
      // 做一個簡單的分析吧
      output['QuestionnaireKeyword_add_count'] = this._parseQuestionnaireKeywordAdd(logs)
      output['QuestionnaireKeyword_remove_count'] = this._parseQuestionnaireKeywordRemove(logs)
      
      // --------------------------
      
      return output
    }
    
    Model.prototype._parseQuestionnaireKeywordAdd = function (logs) {
      let beforeList = logs[0].answeredList
      let afterList = logs[1].answeredList
      
      if (!Array.isArray(beforeList) || !Array.isArray(afterList)) {
        return -1
      }
      
      let count = afterList.filter(i => (beforeList.indexOf(i) === -1)).length
      return count
    }
    
    Model.prototype._parseQuestionnaireKeywordRemove = function (logs) {
      let beforeList = logs[0].answeredList
      let afterList = logs[1].answeredList
      
      if (!Array.isArray(beforeList) || !Array.isArray(afterList)) {
        return -1
      }
      
      let count = beforeList.filter(i => (afterList.indexOf(i) === -1)).length
      return count
    }
    
    Model.prototype.exportQuestionnaireText = async function (webpage) {
      let steps = ['PreImaginary', 'PostRecall']
      console.error('@TODO exportQuestionnaireText')
    }
    
    Model.prototype.exportSectionNote = async function (webpage) {
      let annotations = await AnnotationModel
              .query()
              .where('webpage_id', webpage.primaryKeyValue)
              .where('user_id', this.primaryKeyValue)
              .where('deleted', false)
              .where('type', 'SectionMainIdea')
              .with('anchorPositions')
              .with('notes')
              .fetch()
      
      let sectionsArray = []
      for (let i = 0; i < annotations.size(); i++) {
        let annotation = annotations.nth(i)
        
        let item = {}
        
        let anchorPositions = annotation.getRelated('anchorPositions')
        item.sectionID = parseInt(anchorPositions.first().section_id, 10)
        
        let notes = annotation.getRelated('notes')
        if (notes.size() > 0) {
          item.note = notes.first().note
          //console.log(item.note)
          item.note = StringHelper.htmlToText(item.note, true)
        }
        else {
          continue
        }
        
        sectionsArray.push(item)
      }
      
      sectionsArray.sort((a, b) => {
        return a.sectionID - b.sectionID
      })
      
      let sectionsJSON = {}
      sectionsArray.forEach(item => {
        sectionsJSON['section_' + item.sectionID] = item.note
      })
      
      return sectionsJSON
    }
    
  } // register (Model) {
}

module.exports = UserExport
