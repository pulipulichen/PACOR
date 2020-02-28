'use strict'

const Cache = use('Cache')
const { HttpException } = use('@adonisjs/generic-exceptions') 
const ReadingActivityLog = use('App/Models/ReadingActivityLog')
const ReadingProgressModel = use('App/Models/ReadingProgress')

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
    }
  } // register (Model) {
}

module.exports = UserExport
