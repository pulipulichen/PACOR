module.exports = {
  readingProgressModules: {
    'reading': {
      totalLimitMinutes: 30,
    },
    'IndividualReading': {
      limitMinutes: 10,
      goToNextStepOnChecklistComplete: true,
    },
    'PreImaginaryKeyword': {
      minKeywords: 10,
      limitMinutes: 5,
    },
    'PostRecallKeyword': {
      minKeywords: 10,
      limitMinutes: 5,
      preloadPreImaginaryKeywords: true  // 是否顯示前面撰寫的內容
    },
    FreeReading: {
      nextReadingPage: 'https://docs.google.com/forms/d/e/1FAIpQLSdqkgpOYUmB81bRNiK_z4_8Rn-l2RQEtzXjuNkgvXBVaYvE0g/viewform?usp=pp_url&entry.449355614={id}'
    }
  }
}
