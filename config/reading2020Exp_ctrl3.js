module.exports = {
  debug: {
    flushCache: false,
    enable: false,
    stayInReadingProgress: null
  },
  readingProgresses: ['PreImaginaryKeyword', 'IndividualReading', 'PostRecallKeyword'],
  readingProgressModules: {
    'PreImaginaryKeyword': {
      minKeywords: 10,
      limitMinutes: 5,
    },
    'PostRecallKeyword': {
      minKeywords: 10,
      limitMinutes: 5,
    },
    'reading': {
      totalLimitMinutes: 25,
    },
    'IndividualReading': {
      limitMinutes: 25,
      //highlightAnnotation: {
        //types: ['MainIdea'],
      //},
    },
//    'CollaborativeReading': {
//      //highlightAnnotation: {
//        //types: ['MainIdea'],
//      //},
//    },
    'FreeReading': {
      nextReadingPage: 'https://docs.google.com/forms/d/e/1FAIpQLSdqkgpOYUmB81bRNiK_z4_8Rn-l2RQEtzXjuNkgvXBVaYvE0g/viewform?usp=pp_url&entry.449355614={id}'
    }
  }
}
