module.exports = {
  debug: {
    flushCache: false,
    enable: false,
    stayInReadingProgress: null
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
      forceTutorial: false,
      limitMinutes: 10,
      //highlightAnnotation: {
        //types: ['MainIdea'],
      //},
    },
    'CollaborativeReading': {
      forceTutorial: false,
      //highlightAnnotation: {
        //types: ['MainIdea'],
      //},
    },
    'FreeReading': {
      forceTutorial: false,
      //nextReadingPage: '/pretest/alpha.html'
      enableLogout: false,
    }
  }
}
