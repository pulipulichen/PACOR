module.exports = {
  login: {
    //message: '/2020exp/Login-e.html',
    //allowLoginWithoutGrop: false
  },
  readingProgresses: ['PreImaginary', 'IndividualReading', 'CollaborativeReading', 'PostRecall'],
  readingProgressModules: {
    PreImaginary: {
      instruction: '/2020exp/rice/PreImaginary.html',
      limitMinutes: 3,
      countdownAtStart: true
    },
    reading: {
      totalLimitMinutes: 10,
    },
    IndividualReading: {
      limitMinutes: 5,
      highlightAnnotation: {
        types: ['MainIdea'],
      },
      debug: {
        countdownPause: false
      }
    },
    CollaborativeReading: {
      highlightAnnotation: {
        types: ['MainIdea'],
      },
      debug: {
        countdownPause: false
      }
    },
    PostRecall: {
      instruction: '/2020exp/rice/PostRecall.html',
      limitMinutes: 3,
    }
  }
}