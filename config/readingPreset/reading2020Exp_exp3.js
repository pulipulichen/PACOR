module.exports = {
  debug: {
    flushCache: false,
    enable: false,
    stayInReadingProgress: null
  },
  readingProgresses: ['PreImaginaryKeyword', 'IndividualReading', 'CollaborativeReading', 'PostRecallKeyword'],
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
      forceTutorial: false,
      limitMinutes: 10,
      //highlightAnnotation: {
        //types: ['MainIdea'],
      //},
    },
    'CollaborativeReading': {
      forceTutorial: false,
      //highlightAnnotation: {
        //types: ['MainIdea'],
      //},
    },
    'FreeReading': {
      forceTutorial: false,
      //nextReadingPage: 'https://docs.google.com/forms/d/e/1FAIpQLSdqkgpOYUmB81bRNiK_z4_8Rn-l2RQEtzXjuNkgvXBVaYvE0g/viewform?usp=pp_url&entry.449355614={id}'
      nextReadingPage: 'https://docs.google.com/forms/d/e/1FAIpQLSdqkgpOYUmB81bRNiK_z4_8Rn-l2RQEtzXjuNkgvXBVaYvE0g/viewform?usp=pp_url&entry.449355614={id}&entry.1206736271={username}',
      nextReadingPageButton: 'Feedback Survey',
      enableLogout: false,
    }
  }
}
