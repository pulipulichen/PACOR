'use strict'

const { HttpException } = use('@adonisjs/generic-exceptions') 
const ReadingActivityLog = use ('App/Models/ReadingActivityLog')

const Profiler = use('Profiler')

class Questionnaire {
  async getPreImaginaryAnswer({request, webpage, user}) {
    let log = await user.getReadingProgressLog(webpage, 'PreImaginary')
    return log.answer
  }
}

module.exports = Questionnaire
