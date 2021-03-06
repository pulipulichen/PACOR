module.exports = {
  debug: {
    flushCache: false,
    enable: true,
    enableRemoteConosleLog: false,
    tutorialEnableTimeout: true,
    //forceMaxTimeoutMinutes: 0.4
    //forceMaxTimeoutMinutes: 0.2
    forceMaxTimeoutMinutes: 1,
    
    test: {
      minAnnotation: 4,
      maxAnnotation: 9
      
      //minAnnotation: 2,
      //maxAnnotation: 2
    },
    
    //onlyShowTutorialOrder: [62],
    
    //stayInReadingProgress: 'PreImaginaryKeyword'
    //stayInReadingProgress: 'PostRecallKeyword'
    //stayInReadingProgress: 'IndividualReading'
    //stayInReadingProgress: 'CollaborativeReading'
    //stayInReadingProgress: 'FreeReading'
  },
  
  /**
   * 選擇文字選擇器
   * @Array|String
   */
  selector: {
    /**
     * 選擇文章
    = * @Array|String
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
     * 不寫：使用預設訊息
     */
    //message: '/instruction/login/Login.html',
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
  //readingProgressesFinish: 'https://docs.google.com/forms/d/e/1FAIpQLSdqkgpOYUmB81bRNiK_z4_8Rn-l2RQEtzXjuNkgvXBVaYvE0g/viewform?usp=pp_url&entry.449355614={id}&entry.1206736271={username}',
      
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
      limitMinutes: 3,
      //limitMinutes: 0.03,
      countdownAtStart: false,
      forceNextStep: false,
    },
    'PreImaginaryKeyword': {
      //instruction: '/instruction/questionnaire/PreImaginary.html',
      minKeywords: 10,
      //limitMinutes: 0.6,
      //limitMinutes: 0.2,
      limitMinutes: 3,
      forceNextStep: false,
    },
    'PostRecall': {
      //instruction: '/instruction/questionnaire/PostRecall.html',
      minWords: 10,
      limitMinutes: 3,
      //limitMinutes: 0.03,
      countdownAtStart: false,
      preloadPreImaginary: true,  // 是否顯示前面撰寫的內容
      forceNextStep: false,
    },
    'PostRecallKeyword': {
      //instruction: '/instruction/questionnaire/PostRecall.html',
      minKeywords: 10,
      //limitMinutes: 0.6,
      limitMinutes: 3,
      //limitMinutes: 0.2,
      preloadPreImaginary: true,  // 是否顯示前面撰寫的內容
      forceNextStep: false,
    },
    
    // ---------------------------
    
    /**
     * include 'individual-reading' and 'collaborative-reading'
     */
    'reading': {
      //totalLimitMinutes: 2,
      totalLimitMinutes: 30,
      tutorialDefaultTimeout: 5000, // 測試的時候使用500
    },
    'IndividualReading': {
      //instruction: {
      //  countdown: '/instruction/reading/IndividualReading-endsByCountdown.html',
      //  checklist: '/instruction/reading/IndividualReading-endsByChecklist.html',
      //},
      countdownAtStart: false,
      forceTutorial: false,
      //limitMinutes: 1,
      limitMinutes: 15,
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
        types: ['Confused', 'Clarified', 'MainIdea'],
        //types: ['MainIdea'],
      },
      sectionAnnotation: {
        types: ['SectionMainIdea'],
        enableSectionAnnotation: true,
        type: ['SectionMainIdea'],
        checklist: [
          '{CheckRead}',
          '{HighlightConfused}',
          '{SectionMainIdea}', // 'I have already written the main ideas of this section.',
        ],
//        updateInterval: 30000
      },
      features: {
        AnnotationTypeFilter: true
      },
      HTMLEditor: {
        insertMultimedia: false
      },
      debug: {
        countdownPause: false
      },
      confirmExit: true,
    },
    'CollaborativeReading': {
      //instruction: '/instruction/reading/CollaborativeReading.html',
      forceTutorial: false,
      countdownAtStart: false,
      permission: {
        collaboration: true,
        control: false,
        defaultPermission: 'public',
      },
      notification: {
        updateInterval: 30000
      },
      highlightAnnotation: {
        types: ['Confused', 'Clarified', 'MainIdea'],
        
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
      features: {
        AnnotationTypeFilter: true,
      },
      HTMLEditor: {
        insertMultimedia: false
      },
      UserFilter: {
        autoSelect: true,
      },
      debug: {
        countdownPause: false
      },
      confirmExit: true,
    },
    
    'FreeReading': {
      //instruction: '/instruction/reading/CollaborativeReading.html',
      permission: {
        collaboration: true,
        control: false,
        defaultPermission: 'public',
      },
      notification: {
        updateInterval: 30000
      },
      highlightAnnotation: {
        types: ['Confused', 'Clarified', 'MainIdea'],
        
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
      features: {
        AnnotationTypeFilter: true
      },
      HTMLEditor: {
        insertMultimedia: false
      },
      UserFilter: {
        autoSelect: true,
      },
      countdownAtStart: false,
      showFinishMessage: true, // 顯示恭喜完成的訊息
      //keepShowInstructionMessage: true,
      enableLogout: true,
      confirmExit: true,
      /**
       * 顯示下一個要閱讀網頁
       * {user_id} {username} {display_name} {referrer}
       * @type String
       */ 
      //nextReadingPage: 'https://docs.google.com/forms/d/e/1FAIpQLSell8cSs_S2Ssi7DwHOEsDOM-qvNUh5b8MtFEIZN5oNaioTlA/viewform?usp=pp_url&entry.897829081={user_id}&entry.1819046409={username}&entry.1737232835={display_name}'
    },
  },
  annotationTypeModules: {
    'ConfusedClarified': {
      'questionPlaceholder': 'Write your question here...',
      'answerPlaceholder': 'Write your answer here...',
      'questionMinWords': 3,
      'answerMinWords': 3,
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
          'name': 'Find answers from Chinese dictionary',
          'urlPattern': 'https://www.moedict.tw/{anchorText}'
        },
        {
          'name': 'Find answers from Google',
          'urlPattern': 'https://www.google.com/search?q={question}'
        },
        {
          'name': 'Find answers from Wikipedia',
          'urlPattern': 'https://zh.wikipedia.org/w/index.php?search={anchorText}&ns0=1'
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
      'enableEditorAdd': false,
      'enableQuickAdd': true,
      'addable': true,
      'minWords': 1,
      'noteMustBeEdited': true,
      'initDraftFromSelection': false, 
      'placeholder': 'Write something about the keyword...',
      'instruction': {
        'summary': 'Highlight key keywords or concepts',
        'url': '/instruction/annotation/MainIdea.html'
      },
      "style": {
        //'highlight': 'border-bottom: 1px solid red',
        'highlight': {
          'my': 'background-color: rgba(52, 152, 219, 0.3); color: black;',
          'others': 'border-bottom: 2px solid rgba(52, 152, 219, 0.7)'
        },
        'segmentColor': '#2980b9',
        'button': {
          'icon': 'exclamation',
          'color': 'white',
          //'backgroundColor': 'orange',
          'backgroundColor': '#2980b9',
        }
      }
    },
    'SectionMainIdea': {
      'addable': false,
      'minWords': 1,
      'noteMustBeEdited': true,
      'placeholder': 'What do you think are the main ideas of this section?',
      'instruction': {
        'summary': {
          'article': 'Highlight keywords or concepts in the article',
          'section': 'Highlight keywords or concepts in this section',
        },
        'url': {
          'article': '/instruction/annotation/ArticleMainIdea.html',
          'section': '/instruction/annotation/SectionMainIdea.html'
        }
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
