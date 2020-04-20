module.exports = {
  debug: {
    flushCache: false,
    enable: false,
    stayInReadingProgress: null
  },
  readingProgresses: ['PreImaginaryKeyword', 'IndividualReading', 'PostRecallKeyword'],
  readingProgressModules: {
    'PreImaginaryKeyword': {
      minKeywords: 3,
      limitMinutes: 2,
    },
    'PostRecallKeyword': {
      minKeywords: 3,
      limitMinutes: 2,
    },
    'reading': {
      totalLimitMinutes: 6,
    },
    'IndividualReading': {
      limitMinutes: 6,
      highlightAnnotation: {
        types: ['MainIdea'],
      },
      goToNextStepOnChecklistComplete: false,
    },
//    'CollaborativeReading': {
//      highlightAnnotation: {
//        types: ['MainIdea'],
//      },
//    },
    'FreeReading': {
      permission: {
        collaboration: false,
      },
      highlightAnnotation: {
        types: ['MainIdea'],
      },
      enableLogout: false,
      //nextReadingPage: '/pretest/alpha.html'
    }
  }
}
