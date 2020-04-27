module.exports = {
  debug: {
    flushCache: true,
    enable: true,
    //stayInReadingProgress: 'IndividualReading'
    stayInReadingProgress: 'CollaborativeReading'
    //stayInReadingProgress: 'PreImaginaryKeyword'
    //stayInReadingProgress: 'PostRecallKeyword'
  },
  readingProgressModules: {
    'reading': {
      totalLimitMinutes: 30,
    },
    'IndividualReading': {
      limitMinutes: 15,
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
      highlightAnnotation: {
        types: ['MainIdea'],
      },
    }
  }
}
