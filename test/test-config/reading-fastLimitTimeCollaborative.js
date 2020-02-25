module.exports = {
  debug: {
    flushCache: false,
  },
  readingProgressModules: {
    'PreImaginary': {
      limitMinutes: 0.05,
    },
    'PostRecall': {
      limitMinutes: 0.05,
    },
    'PreImaginaryKeyword': {
      limitMinutes: 0.05,
    },
    'PostRecallKeyword': {
      limitMinutes: 0.05,
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
