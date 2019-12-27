module.exports = {
  readingProgressModules: {
    'PreImaginary': {
      limitMinutes: 0.1,
    },
    'PostRecall': {
      limitMinutes: 0.1,
    },
    'IndividualReading': {
      debug: {
        countdownPause: true
      }
    },
    'CollaborativeReading': {
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
        countdownPause: true
      }
    },
  },
}
