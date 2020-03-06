module.exports = {
  debug: {
    flushCache: false,
    enable: false,
    stayInReadingProgress: null
  },
  readingProgresses: ['PreImaginaryKeyword', 'IndividualReading', 'CollaborativeReading', 'PostRecallKeyword'],
  readingProgressModules: {
    'PreImaginaryKeyword': {
      minKeywords: 10,
      limitMinutes: 5,
    },
    'PostRecallKeyword': {
      minKeywords: 10,
      limitMinutes: 5,
    },
    'reading': {
      totalLimitMinutes: 25,
    },
    'IndividualReading': {
      limitMinutes: 10,
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
