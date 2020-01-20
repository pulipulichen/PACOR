module.exports = {
  login: {
    message: '/2020exp/Login-c.html',
    allowLoginWithoutGrop: false
  },
  readingProgresses: ['PreImaginary', 'IndividualReading', 'PostRecall'],
  readingProgressModules: {
    PreImaginary: {
      instruction: '/2020exp/PreImaginary-rice.html',
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
    PostRecall: {
      instruction: '/2020exp/PostRecall-rice.html',
      limitMinutes: 5,
    }
  }
}