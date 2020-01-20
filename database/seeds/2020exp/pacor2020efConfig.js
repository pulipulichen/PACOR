module.exports = {
  login: {
    allowLoginWithoutGrop: false
  },
  readingProgresses: ['PreImaginary', 'IndividualReading', 'CollaborativeReading', 'PostRecall'],
  readingProgressModules: {
    PreImaginary: {
      limitMinutes: 5,
      countdownAtStart: true
    },
    reading: {
      totalLimitMinutes: 60,
    },
    IndividualReading: {
      limitMinutes: 60,
      highlightAnnotation: {
        types: ['MainIdea'],
      },
      debug: {
        countdownPause: false
      }
    },
    CollaborativeReading: {
      highlightAnnotation: {
        types: ['Clarified', 'Confused', 'MainIdea'],
      },
      debug: {
        countdownPause: false
      }
    },
    PostRecall: {
      limitMinutes: 5,
    }
  }
}