module.exports = {
  login: {
    message: '/instruction/login/LoginPretest.html',
  },
  readingProgresses: ['PreImaginaryKeyword', 'IndividualReading', 'CollaborativeReading', 'PostRecallKeyword'],
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
      totalLimitMinutes: 10,
    },
    'IndividualReading': {
      limitMinutes: 10,
    },
    FreeReading: {
      nextReadingPage: '/pretest/alpha.html'
    }
  }
}
