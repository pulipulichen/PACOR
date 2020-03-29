module.exports = {
  debug: {
    flushCache: false,
    enable: true,
    stayInReadingProgress: 'CollaborativeReading'
  },
  readingProgressModules: {
    'reading': {
      totalLimitMinutes: 30,
    },
    'IndividualReading': {
      limitMinutes: 15,
    },
    FreeReading: {
      nextReadingPage: '/pretest/beta.html'
    }
  }
}
