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
      forceTutorial: false,
      limitMinutes: 3,
      highlightAnnotation: {
        types: ['MainIdea'],
      },
    },
    'CollaborativeReading': {
      forceTutorial: false,
      highlightAnnotation: {
        types: ['MainIdea'],
      },
    },
    'FreeReading': {
      forceTutorial: false,
      highlightAnnotation: {
        types: ['MainIdea'],
      },
      enableLogout: false,
      //nextReadingPage: '/pretest/alpha.html'
    }
  }
}
