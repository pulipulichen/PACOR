let quesLimitMins = 0.03

module.exports = {
  login: {
    allowLoginWithoutGrop: true
  },
  readingProgresses: ['PreImaginary', 'IndividualReading', 'CollaborativeReading', 'PostRecall'],
  readingProgressModules: {
    PreImaginary: {
      limitMinutes: quesLimitMins,
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
        countdownPause: true
      }
    },
    CollaborativeReading: {
      highlightAnnotation: {
        types: ['Clarified', 'Confused', 'MainIdea'],
      },
      debug: {
        countdownPause: true
      }
    },
    PostRecall: {
      limitMinutes: quesLimitMins,
    }
  }
}