module.exports = {
  debug: {
    flushCache: false,
    enable: true,
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
      limitMinutes: 10,
      highlightAnnotation: {
        types: ['MainIdea'],
      },
    },
    'CollaborativeReading': {
      highlightAnnotation: {
        types: ['MainIdea'],
      },
    },
    'FreeReading': {
      nextReadingPage: '/pretest/alpha.html'
    }
  }
}
