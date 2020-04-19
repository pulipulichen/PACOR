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
      totalLimitMinutes: 11,
    },
    'IndividualReading': {
      limitMinutes: 11,
      //highlightAnnotation: {
        //types: ['MainIdea'],
      //},
    },
//    'CollaborativeReading': {
//      //highlightAnnotation: {
//        //types: ['MainIdea'],
//      //},
//    },
    'FreeReading': {
      permission: {
        collaboration: false,
      },
      enableLogout: false,
      //nextReadingPage: '/pretest/alpha.html'
    }
  }
}
