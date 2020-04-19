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
      totalLimitMinutes: 11,
    },
    'IndividualReading': {
      limitMinutes: 5,
      //highlightAnnotation: {
        //types: ['MainIdea'],
      //},
    },
    'CollaborativeReading': {
      //highlightAnnotation: {
        //types: ['MainIdea'],
      //},
    },
    'FreeReading': {
      //nextReadingPage: '/pretest/alpha.html'
    }
  }
}
