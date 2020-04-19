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
        collaboration: true,
      },
      enableLogout: false,
      //nextReadingPage: '/pretest/alpha.html'
    }
  }
}
