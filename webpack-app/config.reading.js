module.exports = {
  readingProgress: ['pre-imaginary', 'individual-reading', 'collaborative-reading', 'post-recall'],
  readingProgressModules: {
    'pre-imaginary': {
      minCharacters: 10,
      limitMinutes: 1
    },
    /**
     * include 'individual-reading' and 'collaborative-reading'
     */
    'reading': {
      limitMinutes: 1,
    },
    'individual-reading': {
      annnotationTypes: ['confused', 'mainIdea'],
      checklist: [
        'I have already read this section.',
        'I have already written annotations on a sentence I don\'t understand.',
        'I have already written the main ideas of this section.',
      ]
    },
    'collaborative-reading': {
      annnotationTypes: ['confused', 'mainIdea'],
    },
    'post-recall': {
      minCharacters: 10,
      limitMinutes: 1
    }
  },
  annotationTypeModules: {
    'confused': {
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
      
    }
  }
}
