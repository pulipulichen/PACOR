module.exports = {
  login: {
    message: '/instruction/login/LoginPretest.html',
  },
  readingProgresses: ['PreImaginaryKeyword', 'IndividualReading', 'PostRecallKeyword'],
  readingProgressModules: {
    'PreImaginaryKeyword': {
      minKeywords: 3,
      limitMinutes: 3,
    },
    'PostRecallKeyword': {
      minKeywords: 3,
      limitMinutes: 3,
    },
    'reading': {
      totalLimitMinutes: 5,
    },
    'IndividualReading': {
      limitMinutes: 5,
    },
    FreeReading: {
      nextReadingPage: '/pretest/alpha.html'
    }
  }
}
