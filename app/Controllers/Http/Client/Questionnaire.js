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
}

module.exports = Questionnaire