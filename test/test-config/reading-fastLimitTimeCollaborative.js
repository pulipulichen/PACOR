module.exports = {
  debug: {
    flushCache: false,
    stayInReadingProgress: null
  },
  readingProgressModules: {
    'PreImaginary': {
      limitMinutes: 0.05,
      forceNextStep: true,
    },
    'PostRecall': {
      limitMinutes: 0.05,
      forceNextStep: true,
    },
    'PreImaginaryKeyword': {
      limitMinutes: 0.05,
      forceNextStep: true,
    },
    'PostRecallKeyword': {
      limitMinutes: 0.05,
      forceNextStep: true,
    },
    'IndividualReading': {
      countdownAtStart: true,
      forceTutorial: true,
      debug: {
        countdownPause: false
      }
    },
    'CollaborativeReading': {
      countdownAtStart: true,
      forceTutorial: true,
      notification: {
        updateInterval: 3000
      },
      highlightAnnotation: {
        otherHighlightBatchInterval: 3000
      },
      sectionAnnotation: {
        updateInterval: 3000
      },
      debug: {
        countdownPause: false
      }
    },
    'FreeReading': {
      notification: {
        updateInterval: 3000
      },
      highlightAnnotation: {
        otherHighlightBatchInterval: 3000
      },
      sectionAnnotation: {
        updateInterval: 3000
      },
    },
  },
}
