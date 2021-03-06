module.exports = {
  debug: {
    flushCache: true,
    enable: true,
    stayInReadingProgress: 'IndividualReading'
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
      totalLimitMinutes: 10,
    },
    'IndividualReading': {
      limitMinutes: 10,
      goToNextStepOnChecklistComplete: false,
    },
    FreeReading: {
      nextReadingPage: '/pretest/beta.html'
    }
  }
}
