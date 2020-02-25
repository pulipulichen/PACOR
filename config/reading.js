module.exports = {
  debug: {
    flushCache: true,
    enable: true,
    enableRemoteConosleLog: false,
    //forceMaxTimeoutMinutes: 0.4
    //forceMaxTimeoutMinutes: 0.2
    forceMaxTimeoutMinutes: 1,
    test: {
      //minAnnotation: 4,
      //maxAnnotation: 9
      
      minAnnotation: 1,
      maxAnnotation: 1
    },
    
    //stayInReadingProgress: 'PreImaginaryKeyword'
    //stayInReadingProgress: 'PostRecallKeyword'
  },
  
  /**
   * 選擇文字選擇器
   * @Array|String
   */
  selector: {
    /**
     * 選擇文章
     * @Array|String
     */
    article: ['article', '#main', '#article', '.main', '.article,body'],
    /**
     * 依序判斷article下面可能會有的section選取器
     * @Array|String
     */
    section: ['section','.section','p','div'],
  },
  
  login: {
    logo: '/imgs/pacor.svg',
    /**
     * @argument {String} 
     * 
     * 純文字
     * 網址
     */
    message: '/instruction/login/Login.html',
    //message: 'ok',
    
    /**
     * @argument {Boolean} name 
     */
    allowLoginWithoutGrop: true,
  },
  
  readingProgresses: ['PreImaginaryKeyword', 'IndividualReading', 'CollaborativeReading', 'PostRecallKeyword'],
  
  /**
   * @argument {String}
   * 
   * 閱讀完成後離開的選項
   * Exit: 離開
   * FreeReading: 自由閱讀
   * 網址: 例如 http://blog.pulipuli.info
   */
  readingProgressesFinish: 'FreeReading',
  
  /**
   * 閱讀流程的控制權
   * 
   * reading: 由讀者和計時器控制
   * admin: 由管理者統一控制 @TODO 尚未完成
   */
  readingProgressControl: 'reader',
  
  readingProgressModules: {
    'PreImaginary': {
      //instruction: '/instruction/questionnaire/PreImaginary.html',
      minWords: 10,
      //limitMinutes: 5,
      limitMinutes: 0.03,
      countdownAtStart: false,
    },
    'PreImaginaryKeyword': {
      //instruction: '/instruction/questionnaire/PreImaginary.html',
      minKeywords: 10,
      limitMinutes: 5,
      //limitMinutes: 0.2,
    },
    'PostRecall': {
      //instruction: '/instruction/questionnaire/PostRecall.html',
      minWords: 10,
      //limitMinutes: 5
      limitMinutes: 0.03,
      countdownAtStart: false,
      preloadPreImaginaryAnswer: true  // 是否顯示前面撰寫的內容
    },
    'PostRecallKeyword': {
      //instruction: '/instruction/questionnaire/PostRecall.html',
      minKeywords: 10,
      //limitMinutes: 5,
      limitMinutes: 0.2,
      preloadPreImaginaryKeywords: true  // 是否顯示前面撰寫的內容
    },
    
    // ---------------------------
    
    /**
     * include 'individual-reading' and 'collaborative-reading'
     */
    'reading': {
      totalLimitMinutes: 60,
    },
    'IndividualReading': {
      instruction: {
        countdown: '/instruction/reading/IndividualReading-endsByCountdown.html',
        checklist: '/instruction/reading/IndividualReading-endsByChecklist.html',
      },
      limitMinutes: 30,
      goToNextStepOnChecklistComplete: true,
//      notification: {
//        updateInterval: 30000
//      },
      permission: {
        collaboration: false,
        control: false,
        defaultPermission: 'public',
      },
      highlightAnnotation: {
        types: ['Clarified', 'Confused', 'MainIdea'],
      },
      sectionAnnotation: {
        types: ['SectionMainIdea'],
        enableSectionAnnotation: true,
        type: ['SectionMainIdea'],
        checklist: [
          'I have already read this section.',
          'I have already written annotations on a sentence I don\'t understand.',
          'SectionMainIdea', // 'I have already written the main ideas of this section.',
        ],
//        updateInterval: 30000
      },
      debug: {
        countdownPause: false
      }
    },
    'CollaborativeReading': {
      instruction: '/instruction/reading/CollaborativeReading.html',
      permission: {
        collaboration: true,
        control: false,
        defaultPermission: 'public',
      },
      notification: {
        updateInterval: 30000
      },
      highlightAnnotation: {
        types: ['Clarified', 'Confused', 'MainIdea'],
        
        /**
         * 每次讀取其他人highlight的數量限制
         */
        otherHighlightBatchSize: 50,
        
        /**
         * 每次讀取其他人highlight的數量間隔，單位是毫秒
         */
        otherHighlightBatchInterval: 30000
        //otherHighlightBatchInterval: 1000 // for test
      },
      sectionAnnotation: {
        enableSectionAnnotation: true,
        types: ['SectionMainIdea'],
        updateInterval: 30000
      },
      debug: {
        countdownPause: false
      }
    },
    
    'FreeReading': {
      //instruction: '/instruction/reading/CollaborativeReading.html',
      permission: {
        collaboration: false,
        control: false,
        defaultPermission: 'public',
      },
      notification: {
        updateInterval: 30000
      },
      highlightAnnotation: {
        types: ['Clarified', 'Confused', 'MainIdea'],
        
        /**
         * 每次讀取其他人highlight的數量限制
         */
        otherHighlightBatchSize: 50,
        
        /**
         * 每次讀取其他人highlight的數量間隔，單位是毫秒
         */
        otherHighlightBatchInterval: 30000
        //otherHighlightBatchInterval: 1000 // for test
      },
      sectionAnnotation: {
        enableSectionAnnotation: true,
        types: ['SectionMainIdea'],
        updateInterval: 30000
      },
      showFinishMessage: true, // 顯示恭喜完成的訊息
      //keepShowInstructionMessage: true,
      enableLogout: true
    },
  },
  annotationTypeModules: {
    'ConfusedClarified': {
      'questionPlaceholder': 'Write your question here...',
      'answerPlaceholder': 'Write your answer here...',
      'questionMinWords': 3,
      'answerMinWords': 5,
      /**
       * {anchorText}
       * {questionText}
       */
      'questionTemplates': [
        {
          'hint': 'What is it?',
          'template': `I don't know what is "{anchorText}"?`,
          'searchIndex': 0
        },
        {
          'hint': 'Why is it?',
          'template': `Why is "{anchorText}"?`,
          'searchIndex': 0
        },
      ],
      'externalResourceSearches': [
        {
          'name': 'Find answers from Google',
          'urlPattern': 'https://www.google.com/search?q={question}'
        },
        {
          'name': 'Find answers from Wikipedia',
          'urlPattern': 'https://zh.wikipedia.org/w/index.php?search={anchorText}&title=Special%3A搜索&go=執行&ns0=1'
        }
      ],
    },
    'Confused': {
      'addable': true,
      'instruction': {
        'summary': "Highlight text you don't understand",
        'url': {
          'collaboration': '/instruction/annotation/ConfusedClarified-CollaborativeReading.html',
          'individual': '/instruction/annotation/ConfusedClarified-IndividualReading.html'
        }
      },
      "style": {
        //'highlight': 'border-bottom: 1px solid green',
        'highlight': {
          'my': 'background-color: rgba(219,40,40,0.5); color: white;',
          'others': 'border-bottom: 2px solid #db2828'
        },
        'segmentColor': '#db2828',
        'button': {
          'icon': 'question',
          'color': 'white',
          'backgroundColor': '#db2828',
        }
      }
    },
    'Clarified': {
      'addable': false,
      'instruction': {
        'summary': 'Write the answer to "questions"',
        'url': {
          'collaboration': '/instruction/annotation/ConfusedClarified-CollaborativeReading.html',
          'individual': '/instruction/annotation/ConfusedClarified-IndividualReading.html'
        }
      },
      "style": {
        // https://www.colorhexa.com/15792d
        //'highlight': 'border-bottom: 1px solid green',
        'highlight': {
          'my': 'background-color: rgba(21,121,45,0.5); color: white;',
          'others': 'border-bottom: 2px solid rgba(21,121,45)'
        },
        'segmentColor': '#21ba45',
        'button': {
          'icon': 'check',
          'color': 'white',
          //'backgroundColor': 'green',
          'backgroundColor': '#21ba45',
      }
      }
    },
    'MainIdea': {
      'enableQuickAdd': true,
      'addable': true,
      'minWords': 1,
      'noteMustBeEdited': true,
      'placeholder': 'Why do you think it is a main idea?',
      'instruction': {
        'summary': 'Highlight key keywords or concepts',
        'url': '/instruction/annotation/MainIdea.html'
      },
      "style": {
        //'highlight': 'border-bottom: 1px solid red',
        'highlight': {
          'my': 'background-color: rgba(229,91,0,0.5); color: black;',
          'others': 'border-bottom: 2px solid #e55b00'
        },
        'segmentColor': '#e55b00',
        'button': {
          'icon': 'exclamation',
          'color': 'white',
          //'backgroundColor': 'orange',
          'backgroundColor': '#e55b00',
        }
      }
    },
    'SectionMainIdea': {
      'addable': false,
      'minWords': 1,
      'noteMustBeEdited': true,
      'placeholder': 'What do you think are the main ideas of this section?',
      'instruction': {
        'summary': 'Highlight keywords or concepts in this section',
        'url': '/instruction/annotation/SectionMainIdea.html'
      },
      "style": {
        //'highlight': 'border-bottom: 1px solid red',
//        'highlight': {
//          'my': 'background-color: rgba(255,255,0,0.5); color: black;',
//          'others': 'border-bottom: 2px solid #CC0'
//        },
        'segmentColor': '#a5783f',
        'button': {
          'icon': 'exclamation',
          'color': 'white',
          //'backgroundColor': 'orange',
          'backgroundColor': '#a5783f',
        }
      }
    }
  }, // annotationTypeModules: {
  
}
