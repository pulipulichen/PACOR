'use strict'

const { HttpException } = use('@adonisjs/generic-exceptions') 
const ReadingActivityLog = use ('App/Models/ReadingActivityLog')

const Profiler = use('Profiler')
const Cache = use('Cache')

class Questionnaire {
  async getPreImaginaryAnswer({request, webpage, user}) {
    let cacheKey = Cache.key('Questionnaire', 'getPreImaginaryAnswer')
    return await Cache.rememberWait([webpage, user, 'Questionnaire'], cacheKey, async () => {
      let log = await user.getReadingProgressLog(webpage, 'PreImaginary')
      if (log && typeof(log.answer) === 'string') {
        return log.answer
      }
      else {
        return ''
      }
    })
  }
  
  async getPreImaginaryKeywords({request, webpage, user}) {
    let cacheKey = Cache.key('Questionnaire', 'getPreImaginaryKeywords')
    return await Cache.rememberWait([webpage, user, 'Questionnaire'], cacheKey, async () => {
      let log = await user.getReadingProgressLog(webpage, 'PreImaginaryKeyword')
      return log
    })
  }
  
  async getQuestionnaireAnswers({request, webpage, user}) {
    let cacheKey = Cache.key('Questionnaire', 'getQuestionnaireAnswers')
    return await Cache.rememberWait([webpage, user, 'Questionnaire'], cacheKey, async () => {
      let preImaginaryAnswer = await this.getPreImaginaryAnswer({webpage, user})
      let postRecallLog = await user.getReadingProgressLog(webpage, 'PostRecall')
      let postRecallLogAnswer
      
      if (postRecallLog && typeof(postRecallLog.answer) === 'string') {
        postRecallLogAnswer = postRecallLog.answer
      }
      else {
        postRecallLogAnswer = ''
      }
      
      return {
        PreImaginary: preImaginaryAnswer,
        PostRecall: postRecallLogAnswer
      }
    })
  }
  
  async getQuestionnaireKeywords({request, webpage, user}) {
    let cacheKey = Cache.key('Questionnaire', 'getQuestionnaireKeywords')
    return await Cache.rememberWait([webpage, user, 'Questionnaire'], cacheKey, async () => {
      let preImaginaryAnswer = await this.getPreImaginaryKeywords({webpage, user})
      //console.log(preImaginaryAnswer)
      preImaginaryAnswer = preImaginaryAnswer.answeredList
      preImaginaryAnswer.sort()
      
      let postRecallLog = await user.getReadingProgressLog(webpage, 'PostRecallKeyword')
      let postRecallLogAnswer
      
      if (postRecallLog && Array.isArray(postRecallLog.answeredList)) {
        postRecallLogAnswer = postRecallLog.answeredList
        postRecallLogAnswer.sort()
      }
      else {
        postRecallLogAnswer = []
      }
      
      return {
        PreImaginary: preImaginaryAnswer,
        PostRecall: postRecallLogAnswer
      }
    })
  }
}

module.exports = Questionnaire
