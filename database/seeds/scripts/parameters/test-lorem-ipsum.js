let quesLimitMins = 0.03

module.exports = {
  login: {
    allowLoginWithoutGrop: true
  },
  readingProgresses: ['PreImaginaryKeyword', 'IndividualReading', 'CollaborativeReading', 'PostRecallKeyword'],
  readingProgressModules: {
    PreImaginaryKeyword: {
      limitMinutes: quesLimitMins,
      countdownAtStart: false
    },
    reading: {
      totalLimitMinutes: 60,
    },
    IndividualReading: {
      limitMinutes: 60,
      highlightAnnotation: {
        types: ['Clarified', 'Confused', 'MainIdea'],
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
    PostRecallKeyword: {
      limitMinutes: quesLimitMins,
      countdownAtStart: false
    }
  }
}