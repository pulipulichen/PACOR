module.exports = {
  debug: {
    flushCache: true,
    enable: true,
    stayInReadingProgress: 'CollaborativeReading'
    //stayInReadingProgress: 'IndividualReading'
    //stayInReadingProgress: 'PreImaginaryKeyword'
    //stayInReadingProgress: 'PostRecallKeyword'
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
