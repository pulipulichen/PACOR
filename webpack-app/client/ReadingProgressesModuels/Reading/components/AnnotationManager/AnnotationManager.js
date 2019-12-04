//import RangyManager from './RangyManager/RangyManager.vue'
import AnnotationTypeSelector from './AnnotationTypeSelector/AnnotationTypeSelector.vue'
//import AnnotationPanel from './AnnotationPanel/AnnotationPanel.vue'
import AnnotationFloatWidget from './AnnotationFloatWidget/AnnotationFloatWidget.vue'
//import SectionAnnotationManager from './SectionAnnotationManager/SectionAnnotationManager.vue'

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
      loadHighlightInterval: 60 * 1000,
      
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
        if (this.afterTime === null) {
          highlightsURL = '/client/Annotation/highlights'
        }
        else {
          highlightsURL = '/client/Annotation/highlightsOthers'
        }
      }
      else {
        highlightsURL = '/client/Annotation/highlightsMy'
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
      if (!this.lib.auth.currentStepAnnotationConfig) {
        return null
      }
      
      let data = {}
      if (typeof(this.afterTime) === 'number') {
        data.afterTime = this.afterTime
      }
      
      this.lib.AnnotationHelper.filter(data)
      //console.log(data)
      
      let result = await this.lib.AxiosHelper.get(this.highlightsURL, data)
      if (!this.lib.RangyManager) {
        return false  // 似乎被移除了...
      }
      
      //console.log(result)
      this.afterTime = (new Date()).getTime()
      if (result !== 0) {
        await this.lib.RangyManager.deserializeAppend(result)
      }
      this.isLoaded = true
      //$('[data-pacor-highlight]:first').click() // for test
      
      if (this.lib.auth.isEnableCollaboration === false) {
        // 如果不是開放合作，那就不用讀取其他人的資料
        return false
      }
      
      setTimeout(() => {
        this.loadHighlights()
      }, this.loadHighlightInterval)
    },
    reloadHighlights () {
      this.afterTime = null
      this.lib.RangyManager.removeHighlights()
      
      //console.log('哈囉？', this.afterTime)
      this.loadHighlights()
    }
  } // methods
}

export default AnnotationManager