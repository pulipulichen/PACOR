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
      if (this.lib.auth.currentStepAnnotationConfig.enableCollaboration === true) {
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
//    isSelectorVisible () {
//      //return (this.annotatioModule === null && this.listPositions === null)
//      //return true
//      //console.log(this.annotationModule, this.listPositions)
//      return (this.annotationModule === null
//              && (this.listPositions === null || this.listPositions.length === 0))
//    },
//    isEnableSectionAnnotation () {
//      return this.lib.auth.currentStepAnnotationConfig.enableSectionAnnotation
//    }
//    enableHover () {
//      console.log(['enableHover', this.listPositions])
//      return (this.listPositions === null 
//        || (Array.isArray(this.listPositions) && this.listPositions.length === 0))
//    }
  },
  watch: {
//    "highlightPos": function (highlightPos) {
//      if (highlightPos !== null) {
//        console.log(highlightPos)
//      }
//      else {
//        console.log('cancel highlight')
//      }
//    }
  },
  mounted () {
    this.initRangyEvent()    
    
    // 最後讀取
    this.loadHighlights()
    
    //console.log(this.$refs.RangyManager)
    //this._testPanel()
    //this.searchInArticle('天')
    
    //this.lib.rangy = this.$refs.RangyManager
    
  },
  methods: {
    initRangyEvent () {
      let rangy = this.lib.RangyManager
      
//      rangy.addEventListener('select', (data) => {
//        this.onselect(data)
//      })
//      
//      rangy.addEventListener('selectcollapsed', (data) => {
//        this.onselectcollapsed(data)
//      })
      
      rangy.addEventListener('highlightClick', (data) => {
        this.toggleHighlightPos(data)
      })
      
      rangy.addEventListener('highlightMouseover', (data) => {
        this.onHighlightPosMouseover(data)
      })
      
      rangy.addEventListener('highlightMouseout', (data) => {
        this.onHighlightPosMouseout(data)
      })
    },
//    _testPanel () {
//      this.annotationModule = 'Confused'
//      this.$refs.AnnotationPanel.show()
//    },
    loadHighlights: async function () {
      let data = {}
      if (typeof(this.afterTime) === 'number') {
        data.afterTime = this.afterTime
      }
      
      let annotationInitURL = this.highlightURL
      let result = await this.lib.AxiosHelper.get(annotationInitURL, data)
      //console.log(result)
      this.afterTime = (new Date()).getTime()
      if (result !== 0) {
        this.$refs.RangyManager.deserializeAppend(result)
      }
      this.isLoaded = true
      //$('[data-pacor-highlight]:first').click() // for test
      
      if (this.lib.auth.currentStepAnnotationConfig.enableCollaboration === false) {
        // 如果不是開放合作，那就不用讀取其他人的資料
        return false
      }
      
      setTimeout(() => {
        this.loadHighlights()
      }, this.loadHighlightInterval)
    },
//    onselect: function (selection) {
//      if (this.pinSelection !== null) {
//        this.unpin()
//        //return false
//      }
//      //console.log(selection)
//      this.selection = selection
//    },
//    onselectcollapsed: function () {
//      //console.log('collapsed')
//      this.selection = null
//    },
//    pin: function (type) {
//      this.restoreSelection = this.selection
//      this.selection = null
//      this.annotationModule = type
//      this.pinSelection = this.$refs.RangyManager.pinSelection()
//      //this.$refs.AnnotationPanel.show()
//      //console.log(type)
//      
//      this.onHighlightPosMouseout(true)
//    },
//    listFromSelection () {
//      //this.selection = null
//      this.listPositions = this.$refs.RangyManager.pinSelection().anchorPositions
//    },
//    unpin: function (doUnpin) {
//      //console.log(this.selection)
//      //console.trace(doSelect)
//      //this.selection = null
//      this.pinSelection = null
//      this.onHighlightPosMouseout(true)
//      this.findAnnotation = null
//      this.findUser = null
//      this.findType = null
//      this.annotationModule = null
//      this.listPositions = null
//      
//      //this.selection = this.restoreSelection
//      if (doUnpin !== false) {
//        this.$refs.RangyManager.unpinSelection(true)
//        //this.selection = this.restoreSelection
//      }
//      //this.$refs.AnnotationTypeSelector.show()
//      //console.log('unpin', 'float widget有顯示嗎？', this.selection)
//    },
//    toggleHighlightPos (data) {
//      if (this.selection !== null) {
//        return false
//      } 
//      
//      //console.log(this.listPositions)
////      if (!this.enableHover) {
////        return false
////      }
//      
//      /*
//      if (this.highlightPos === null) {
//        this.highlightPos = pos
//        this.highlightPosLock = true
//      }
//      else {
//        this.highlightPos = null
//        this.highlightPosLock = false
//      }
//       */
//      if (this.highlightPos !== null && this.highlightPosLock !== true) {
//        //console.log('這個時機對嗎')
//        this.onHighlightPosMouseout(true)
//        this.onList(this.highlightPos)
//        //this.highlightPosLock = !this.highlightPosLock
//        return false
//      }
//      else {
//        // 在觸控的情況下
//        // 
//        //console.log('toggleHighlightPos 直接 click', data)
//        
//        if (this.highlightPos === null) {
//          clearTimeout(this.highlightPosLockTimer)
//          this.highlightPos = data.anchorPositions
//          this.highlightEvent = data.event
//          this.highlightPosLock = true
//        }
//        else {
//          this.highlightPos = null
//          this.highlightEvent = null
//          this.highlightPosLock = false
//        }
//      }
//    },
//    onHighlightPosMouseover (data) {
//      if (this.selection !== null) {
//        return false
//      } 
//      
//      if (this.highlightPosLock === false) {
//        clearTimeout(this.highlightPosLockTimer)
//        if (data.event.which !== 0) {
//          return false
//        }
//
//        this.highlightPos = data.anchorPositions
//        this.highlightEvent = data.event
//      }
//    },
//    onHighlightPosMouseout (doUnlock) {
//      if (doUnlock === true) {
//        this.highlightPosLock = false
//      }
//      
//      if (this.highlightPosLock === false
//           && this.highlightPos !== null) {
//        // 延遲一點再消失吧
//        this.highlightPosLockTimer = setTimeout(() => {
//          this.highlightPos = null
//          this.highlightEvent = null
//        }, 0)
//      }
//    },
//    onList (anchorPositions) {
//      //throw '列出annotation ' +  anchorPositions.length
//      this.listPositions = anchorPositions
//      this.highlightPos = null
//      this.findAnnotation = null
//    },
//    onFindAnnotation (annotation) {
//      //console.log('onFindAnnotation', annotation)
//      //throw '編輯annotation ' +  annotation.id
//      this.findAnnotation = annotation
//      this.listPositions = this.highlightPos
//      this.highlightPos = null
//    },
//    onFindUser (user) {
//      this.findUser = user
//      this.listPositions = this.highlightPos
//      this.highlightPos = null
//    },
//    onFindType (type) {
//      this.findType = type
//      this.listPositions = this.highlightPos
//      this.highlightPos = null
//    },
  } // methods
}

export default AnnotationManager