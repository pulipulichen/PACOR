module.exports = {
  login: {
    message: '/2020exp/Login-e.html',
    allowLoginWithoutGrop: false
  },
  readingProgresses: ['PreImaginary', 'IndividualReading', 'CollaborativeReading', 'PostRecall'],
  readingProgressModules: {
    PreImaginary: {
      instruction: '/2020exp/PostRecall-microscope.html',
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
      instruction: '/2020exp/PostRecall-microscope.html',
      limitMinutes: 5,
    }
  }
}