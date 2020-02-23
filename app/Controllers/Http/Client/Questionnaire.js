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
      return log.answer
    })
  }
  
  async getQuestionnaireAnswer({request, webpage, user}) {
    let cacheKey = Cache.key('Questionnaire', 'getQuestionnaireAnswer')
    return await Cache.rememberWait([webpage, user, 'Questionnaire'], cacheKey, async () => {
      let preImaginaryAnswer = await this.getPreImaginaryAnswer({webpage, user})
      let postRecallLog = await user.getReadingProgressLog(webpage, 'PostRecall')
      let postRecallLogAnswer = postRecallLog.answer
      return {
        PreImaginary: preImaginaryAnswer,
        PostRecall: postRecallLogAnswer
      }
    })
  }
}

module.exports = Questionnaire
