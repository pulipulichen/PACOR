//import RangyManager from './RangyManager/RangyManager.vue'
import AnnotationTypeSelector from './AnnotationTypeSelector/AnnotationTypeSelector.vue'
//import AnnotationPanel from './AnnotationPanel/AnnotationPanel.vue'
import AnnotationFloatWidget from './AnnotationFloatWidget/AnnotationFloatWidget.vue'
//import SectionAnnotationManager from './SectionAnnotationManager/SectionAnnotationManager.vue'

let reloadCount = 0

let AnnotationManager = {
  props: ['lib', 'status', 'config'],
  data() {    
    this.$i18n.locale = this.config.locale
    
    //console.log(this.lib.auth.stepHighlightAnnotationConfig.otherHighlightBatchInterval)
    
    return {
      isLoaded: false,
      pause: false,
      tutorialInited: false,
      
//      selection: null,
//      pinSelection: null,
//      restoreSelection: null,
//      annotationModule: null,
      //annotationModule: 'MainIdea', // for test
      afterTime: null,
      //loadHighlightInterval: 60 * 1000,
      loadHighlightInterval: this.lib.auth.stepHighlightAnnotationConfig.otherHighlightBatchInterval,
      loadTimer: null
      
//      highlightPos: null,
//      highlightEvent: null,
//      highlightPosLock: false,
//      highlightPosLockTimer: null,
//      //loadHighlightInterval: 3 * 1000  // for test
//      
//      findAnnotation: null,
//      findUser: null,
//      findType: null,
//      listPositions: null,
//      
//      sectionsData: {
//        checklist: [],
//        annotations: [],
//        enableRefresh: true,
//        sectionAnnotation: {
//          instance: null,
//          seqID: null,
//          callback: null,
//          draftNote: 'AAA',
//          id: null,
//        },
//      }
    }
  },
  components: {
    //'rangy': RangyManager,
    'annotation-type-selector': AnnotationTypeSelector,
    //'annotation-panel': AnnotationPanel,
    'annotation-float-widget': AnnotationFloatWidget,
    //'section-annotation-manager': SectionAnnotationManager
  },
  computed: {
    highlightsURL () {
      let highlightsURL
      if (this.lib.auth.isEnableCollaboration === true) {
        if (this.afterTime === null && this.isLoaded === false) {
          highlightsURL = '/client/Highlight/highlights'
        }
        else {
          highlightsURL = '/client/Highlight/highlightsOthers'
        }
      }
      else {
        highlightsURL = '/client/Highlight/highlightsMy'
      }
      return highlightsURL
    },
  },
  watch: {
    'lib.RangyManager': async function (rangy) {
      //console.log('ok')
      if (!rangy) {
        return false
      }
      
      this.afterTime = null
      this.addFocusBlurEvent()
      await this.loadHighlights()
      //PACORTestManager.log('highlights', this.status.progress.highlights)
      this.status.progress.highlights = true
    },
    'status.filter.focusUser' () {
      this.reloadOthersHighlights()
    },
    'status.filter.findType' () {
      this.reloadHighlights()
    }
  },
  destroyed () {
    //PACORTestManager.log('destory highlights', this.status.progress.highlights)
    this.status.progress.highlights = false
    this.removeFocusBlurEvent()
  },
  mounted () {  
//    
//    // 最後讀取
//    this.loadHighlights()
//    
//    //console.log(this.$refs.RangyManager)
//    //this._testPanel()
//    //this.searchInArticle('天')
//    
//    //this.lib.rangy = this.$refs.RangyManager
//    
    //setTimeout(() => {
      //console.log(this.status.readingConfig.readingProgressModules)
    //}, 100)
  },
  methods: {
//    _testPanel () {
//      this.annotationModule = 'Confused'
//      this.$refs.AnnotationPanel.show()
//    },
    addFocusBlurEvent () {
      window.addEventListener('focus', this.focusEvent) 
      window.addEventListener('blur', this.blurEvent)
    },
    removeFocusBlurEvent () {
      window.removeEventListener('focus', this.focusEvent) 
      window.removeEventListener('blur', this.blurEvent)
      this.pause = true
    },
    focusEvent () {
      //return false
      if (this.pause === true) {
        this.pause = false
        this.loadHighlights()
      }
    },
    blurEvent () {
      if (this.status.role !== 'reader') {
        // 如果是管理者，那就不做自動停止
        return false
      }
      
      this.pause = true
    },
    loadHighlights: async function () {
      if (!this.lib.auth.stepHighlightAnnotationConfig
              || this.pause === true) {
        return null
      }
      
      if (this.afterTime 
              && this.lib.DayJSHelper.time() - this.afterTime < this.loadHighlightInterval) {
        return null
      }
      
      let query = {
        sessionToken: this.status.sessionToken
      }
      if (typeof(this.afterTime) === 'number') {
        query.afterTime = this.afterTime
      }
      
      // 什麼意思？意義不明
      this.lib.AnnotationHelper.filterQuery(query)
      //console.log(query, this.highlightsURL)
      let result = await this.lib.AxiosHelper.get(this.highlightsURL, query)
      
      if (!this.lib.RangyManager) {
        return false  // 當RangyManager不存在的時候，取消其他操作
      }
      
      //console.log(result)
      
      if (result !== 0) {
        await this.lib.RangyManager.deserializeAppend(result)
      }
      this.isLoaded = true
      //$('[data-pacor-highlight]:first').click() // for test
      
      if (this.lib.auth.isEnableCollaboration === false) {
        // 如果不是開放合作，那就不用讀取其他人的資料
        this.setupTutorial()
        return false
      }
      
      //return false  // 先不要reload
      //if (this.afterTime) {
        //console.log('@TEST Pause reload highlight')
        //return false // for test
      //}
      
//      reloadCount++
//      if (reloadCount >= 30) {
//        console.log('@TEST stop reload highlights')
//        return false
//      }
      
      //console.log(this.loadHighlightInterval)
      if (typeof(this.loadHighlightInterval) === 'number') {
        if (this.loadTimer) {
          clearTimeout(this.loadTimer)
        }
        this.loadTimer = setTimeout(() => {
          this.loadHighlights()
        }, this.loadHighlightInterval)
      }
      
      //this.afterTime = (new Date()).getTime()
      this.afterTime = this.lib.DayJSHelper.time()
      this.setupTutorial()
    },
    reloadHighlights () {
      //console.log('重新讀取')
      this.afterTime = null
      this.isLoaded = false
      this.lib.RangyManager.removeHighlights()
      
      //console.log('哈囉？', this.afterTime)
      this.loadHighlights()
    },
    reloadOthersHighlights () {
      //console.log('重新讀取')
      this.afterTime = null
      //this.isLoaded = false
      this.lib.RangyManager.removeOthersHighlights()
      
      //console.log('哈囉？', this.afterTime)
      this.loadHighlights()
    },
    hideFloatWidget () {
      if (!this.$refs.AnnotationFloatWidget) {
        return false
      }
      //console.log('AAA')
      this.$refs.AnnotationFloatWidget.reset()
    }
  } // methods
}

import methodTutorialAnnotationManager from './methodTutorialAnnotationManager.js'
methodTutorialAnnotationManager(AnnotationManager)

export default AnnotationManager