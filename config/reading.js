module.exports = {
  // 只會選擇第一個
  articleSelector: ['article', '#main', '#article', '.main', '.article,body'],
  
  // 依序判斷article下面可能會有的section選取器
  sectionSelector: ['section','.section','p','div'],
  loginMessage: 'Hello',
  allowLoginWithoutGrop: true,
  readingProgresses: ['PreImaginary', 'IndividualReading', 'CollaborativeReading', 'PostRecall'],
  readingProgressesFinish: 'Exit',  // 'Exit', 'FreeReading', 'http://blog.pulipuli.info'
  readingProgressModules: {
    'PreImaginary': {
      message: '猜猜看待會文章的內容會講到什麼？猜猜看待會文章的內容會講到什麼？猜猜看待會文章的內容會講到什麼？猜猜看待會文章的內容會講到什麼？猜猜看待會文章的內容會講到什麼？猜猜看待會文章的內容會講到什麼？猜猜看待會文章的內容會講到什麼？猜猜看待會文章的內容會講到什麼？猜猜看待會文章的內容會講到什麼？猜猜看待會文章的內容會講到什麼？猜猜看待會文章的內容會講到什麼？猜猜看待會文章的內容會講到什麼？猜猜看待會文章的內容會講到什麼？猜猜看待會文章的內容會講到什麼？猜猜看待會文章的內容會講到什麼？猜猜看待會文章的內容會講到什麼？猜猜看待會文章的內容會講到什麼？猜猜看待會文章的內容會講到什麼？猜猜看待會文章的內容會講到什麼？猜猜看待會文章的內容會講到什麼？',
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
      message: '進入個人閱讀囉',
      limitMinutes: 3,
      annotation: {
        types: ['ConfusedClarified', 'MainIdea'],
        enableCollaboration: false,
        enableControlPermission: false,
        defaultPermission: 'public',
      },
      checklist: [
        'I have already read this section.',
        'I have already written annotations on a sentence I don\'t understand.',
        'I have already written the main ideas of this section.',
      ],
      
    },
    'CollaborativeReading': {
      message: '進入合作閱讀囉',
      annotation: {
        types: ['ConfusedClarified', 'MainIdea'],
        enableCollaboration: false,
        enableControlPermission: false,
        defaultPermission: 'public',
      },
    },
    'PostRecall': {
      message: '請開始回憶吧！請開始回憶吧！請開始回憶吧！請開始回憶吧！請開始回憶吧！請開始回憶吧！請開始回憶吧！請開始回憶吧！請開始回憶吧！請開始回憶吧！請開始回憶吧！請開始回憶吧！請開始回憶吧！請開始回憶吧！請開始回憶吧！請開始回憶吧！請開始回憶吧！請開始回憶吧！請開始回憶吧！請開始回憶吧！請開始回憶吧！請開始回憶吧！請開始回憶吧！請開始回憶吧！請開始回憶吧！請開始回憶吧！',
      minCharacters: 10,
      limitMinutes: 0.1
    }
  },
  'selection': {
    
  },
  annotationTypeModules: {
    'ConfusedClarified': {
      'instruction': {
        'summary': '你有什麼不懂的地方？',
        'url': '/annotation-instruction/ConfusedClarified.html'
      },
      'minCharacters': 10,
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
      ],
      "style": {
        //'highlight': 'border-bottom: 1px solid green',
        'highlight': {
          'my': 'background-color: red; color: white;',
          'others': 'border-bottom: 1px solid red'
        },
        'segmentColor': 'red',
        'button': {
          'icon': 'question',
          'color': 'white',
          'backgroundColor': 'green',
        }
      }
    },
    'MainIdea': {
      'minCharacters': 10,
      'instruction': {
        'summary': '您覺得哪裡是重點？',
        'url': '/annotation-instruction/MainIdea.html'
      },
      "style": {
        //'highlight': 'border-bottom: 1px solid red',
        'highlight': {
          'my': 'background-color: yellow; color: black;',
          'others': 'border-bottom: 1px solid yellow'
        },
        'segmentColor': 'yellow',
        'button': {
          'icon': 'exclamation',
          'color': 'white',
          'backgroundColor': 'red',
        }
      }
    }
  }
}
