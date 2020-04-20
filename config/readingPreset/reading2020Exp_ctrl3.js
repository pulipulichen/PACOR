module.exports = {
  debug: {
    flushCache: false,
    enable: false,
    stayInReadingProgress: null
  },
  readingProgresses: ['PreImaginaryKeyword', 'IndividualReading', 'PostRecallKeyword'],
  readingProgressesFinish: 'https://docs.google.com/forms/d/e/1FAIpQLSdqkgpOYUmB81bRNiK_z4_8Rn-l2RQEtzXjuNkgvXBVaYvE0g/viewform?usp=pp_url&entry.449355614={id}&entry.1206736271={username}',
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
      goToNextStepOnChecklistComplete: false,
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
      permission: {
        collaboration: false,
      },
      enableLogout: false,
      //nextReadingPage: 'https://docs.google.com/forms/d/e/1FAIpQLSdqkgpOYUmB81bRNiK_z4_8Rn-l2RQEtzXjuNkgvXBVaYvE0g/viewform?usp=pp_url&entry.449355614={id}'
      nextReadingPage: 'https://docs.google.com/forms/d/e/1FAIpQLSdqkgpOYUmB81bRNiK_z4_8Rn-l2RQEtzXjuNkgvXBVaYvE0g/viewform?usp=pp_url&entry.449355614={id}&entry.1206736271={username}',
      nextReadingPageMessage: 'Feedback Survey'
    }
  }
}
