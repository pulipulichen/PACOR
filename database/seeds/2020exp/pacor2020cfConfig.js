module.exports = {
  login: {
    message: '/2020exp/Login-c.html',
    allowLoginWithoutGrop: false
  },
  readingProgresses: ['PreImaginaryKeyword', 'IndividualReading', 'PostRecallKeyword'],
  readingProgressModules: {
    PreImaginaryKeyword: {
      //instruction: '/2020exp/PreImaginary-rice.html',
      limitMinutes: 5,
      countdownAtStart: true
    },
    reading: {
      totalLimitMinutes: 60,
    },
    IndividualReading: {
      instruction: '/instruction/reading/IndividualReading-IndividualReading.html',
      limitMinutes: 60,
      goToNextStepOnChecklistComplete: false,
      highlightAnnotation: {
        types: ['MainIdea'],
      },
      debug: {
        countdownPause: false
      }
    },
    PostRecallKeyword: {
      //instruction: '/2020exp/PostRecall-rice.html',
      limitMinutes: 5,
    }
  },
  annotationTypeModules: {
    Confused: {
      url: '/annotation-instruction/ConfusedClarified-IndividualReading.html'
    },
    Clarified: {
      url: '/annotation-instruction/ConfusedClarified-IndividualReading.html'
    }
  }
}