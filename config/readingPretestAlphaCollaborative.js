module.exports = {
  login: {
    message: '/instruction/login/LoginPretest.html',
  },
  readingProgressModules: {
    'reading': {
      totalLimitMinutes: 10,
    },
    'IndividualReading': {
      limitMinutes: 5,
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
      nextReadingPage: '/pretest/alpha.html'
    }
  }
}
