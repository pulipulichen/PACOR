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
    return {
      isLoaded: false,
      
//      selection: null,
//      pinSelection: null,
//      restoreSelection: null,
//      annotationModule: null,
      //annotationModule: 'MainIdea', // for test
      afterTime: null,
      //loadHighlightInterval: 60 * 1000,
      loadHighlightInterval: this.lib.auth.stepHighlightAnnotationConfig.otherHighlightBatchInterval
      
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
      await this.loadHighlights()
      //PACORTestManager.log('highlights', this.status.progress.highlights)
      this.status.progress.highlights = true
    },
    'status.filter.focusUser' () {
      this.reloadHighlights()
    },
    'status.filter.findType' () {
      this.reloadHighlights()
    }
  },
  destroyed () {
    //PACORTestManager.log('destory highlights', this.status.progress.highlights)
    this.status.progress.highlights = false
  },
//  mounted () {  
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
//  },
  methods: {
//    _testPanel () {
//      this.annotationModule = 'Confused'
//      this.$refs.AnnotationPanel.show()
//    },
    loadHighlights: async function () {
      if (!this.lib.auth.stepHighlightAnnotationConfig) {
        return null
      }
      
      let data = {
        sessionToken: this.status.sessionToken
      }
      if (typeof(this.afterTime) === 'number') {
        data.afterTime = this.afterTime
      }
      
      // 什麼意思？意義不明
      this.lib.AnnotationHelper.filter(data)
      //console.log(data)
      
      let result = await this.lib.AxiosHelper.get(this.highlightsURL, data)
      if (!this.lib.RangyManager) {
        return false  // 似乎被移除了...
      }
      
      //console.log(result)
      
      if (result !== 0) {
        await this.lib.RangyManager.deserializeAppend(result)
      }
      this.isLoaded = true
      //$('[data-pacor-highlight]:first').click() // for test
      
      if (this.lib.auth.isEnableCollaboration === false) {
        // 如果不是開放合作，那就不用讀取其他人的資料
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
        setTimeout(() => {
          this.loadHighlights()
        }, this.loadHighlightInterval)
      }
      
      this.afterTime = (new Date()).getTime()
    },
    reloadHighlights () {
      console.log('重新讀取')
      this.afterTime = null
      this.lib.RangyManager.removeHighlights()
      
      //console.log('哈囉？', this.afterTime)
      this.loadHighlights()
    }
  } // methods
}

export default AnnotationManager