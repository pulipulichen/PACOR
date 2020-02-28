module.exports = {
  login: {
    //message: '/2020exp/Login-e.html',
    //allowLoginWithoutGrop: false
  },
  readingProgresses: ['PreImaginaryKeyword', 'IndividualReading', 'CollaborativeReading', 'PostRecallKeyword'],
  readingProgressModules: {
    PreImaginaryKeyword: {
      //instruction: '/2020exp/rice/PreImaginary.html',
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
    PostRecallKeyword: {
      //instruction: '/2020exp/rice/PostRecall.html',
      limitMinutes: 3,
    }
  }
}