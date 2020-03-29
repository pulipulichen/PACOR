module.exports = {
  debug: {
    flushCache: true,
    enable: true,
    stayInReadingProgress: 'CollaborativeReading'
  },
  readingProgressModules: {
    'reading': {
      totalLimitMinutes: 30,
    },
    'IndividualReading': {
      limitMinutes: 15,
    }
  }
}
