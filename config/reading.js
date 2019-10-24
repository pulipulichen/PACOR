module.exports = {
  readingProgresses: ['PreImaginary', 'IndividualReading', 'CollaborativeReading', 'PostRecall'],
  readingProgressesFinish: 'Exit',  // 'Exit', 'FreeReading', 'http://blog.pulipuli.info'
  readingProgressModules: {
    'PreImaginary': {
      message: '猜猜看待會文章的內容會講到什麼？',
      minCharacters: 10,
      limitMinutes: 0.1
    },
    /**
     * include 'individual-reading' and 'collaborative-reading'
     */
    'reading': {
      totalLimitMinutes: 1,
    },
    'IndividualReading': {
      annnotationTypes: ['confused', 'mainIdea'],
      checklist: [
        'I have already read this section.',
        'I have already written annotations on a sentence I don\'t understand.',
        'I have already written the main ideas of this section.',
      ]
    },
    'CollaborativeReading': {
      annnotationTypes: ['confused', 'mainIdea'],
    },
    'PostRecall': {
      message: '請開始回憶吧！',
      minCharacters: 10,
      limitMinutes: 0.1
    }
  },
  annotationTypeModules: {
    'confused': {
      minCharacters: 10,
      /**
       * {anchorText}
       * {questionText}
       */
      'questionTemplates': [
        {
          'hint': 'What is it?',
          'template': `I don't know what is "{anchorText}"?`
        },
        {
          'hint': 'Why is it?',
          'template': `Why is "{anchorText}"?`
        },
      ],
      'externalResourceSeachs': [
        {
          'name': 'Find answer in Wikipedia',
          'urlPattern': 'https://zh.wikipedia.org/w/index.php?search={anchorText}&title=Special%3A搜索&go=執行&ns0=1'
        },
        {
          'name': 'Find answer in Google',
          'urlPattern': 'https://www.google.com/search?q={questionText}'
        }
      ]
    },
    'mainIdea': {
      minCharacters: 10,
    }
  }
}
