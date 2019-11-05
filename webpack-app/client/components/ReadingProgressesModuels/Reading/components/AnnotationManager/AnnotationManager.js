import RangyManager from './RangyManager/RangyManager.vue'
import AnnotationTypeSelector from './AnnotationTypeSelector/AnnotationTypeSelector.vue'
import AnnotationPanel from './AnnotationPanel/AnnotationPanel.vue'
import AnnotationFloatWidget from './AnnotationFloatWidget/AnnotationFloatWidget.vue'

let AnnotationManager = {
  props: ['lib', 'status', 'config'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      selection: null,
      pinSelection: null,
      annotationModule: null,
      //annotationModule: 'MainIdea', // for test
      afterTime: null,
      loadHighlightInterval: 60 * 1000,
      
      highlightPos: null,
      highlightEvent: null,
      highlightPosLock: false,
      highlightPosLockTimer: null,
      //loadHighlightInterval: 3 * 1000  // for test
      
      findAnnotation: null,
      listPositions: null
    }
  },
  components: {
    'rangy': RangyManager,
    'annotation-type-selector': AnnotationTypeSelector,
    'annotation-panel': AnnotationPanel,
    'annotation-float-widget': AnnotationFloatWidget,
  },
  computed: {
    rangyConfig: function () {
      let output = {}
      if (typeof(this.status) === 'object'
              && typeof(this.status.readingConfig) === 'object') {
        output.articleSelector = this.status.readingConfig.articleSelector
        output.sectionSelector = this.status.readingConfig.sectionSelector
        output.annotationTypeModules = this.status.readingConfig.annotationTypeModules
      }
      return output
    },
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
    }
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
    this.loadHighlights()
  },
  methods: {
    loadHighlights: async function () {
      let data = {}
      if (typeof(this.afterTime) === 'number') {
        data.afterTime = this.afterTime
      }
      
      let result = await this.lib.AxiosHelper.get(this.highlightsURL, data)
      //console.log(result)
      this.afterTime = (new Date()).getTime()
      if (result !== 0) {
        this.$refs.RangyManager.deserialize(result)
      }
      
      $('[data-pacor-highlight]:first').click() // for test
      
      if (this.lib.auth.currentStepAnnotationConfig.enableCollaboration === false) {
        // 如果不是開放合作，那就不用讀取其他人的資料
        return false
      }
      
      setTimeout(() => {
        this.loadHighlights()
      }, this.loadHighlightInterval)
    },
    onselect: function (selection) {
      if (this.pinSelection !== null) {
        this.unpin()
        //return false
      }
      //console.log(selection)
      this.selection = selection
    },
    onselectcollapsed: function () {
      //console.log('collapsed')
      this.selection = null
    },
    pin: function (type) {
      this.selection = null
      this.annotationModule = type
      this.pinSelection = this.$refs.RangyManager.pinSelection()
      //this.$refs.AnnotationPanel.show()
      //console.log(type)
    },
    unpin: function (doUnpin) {
      //console.trace(doSelect)
      if (doUnpin !== false) {
        this.$refs.RangyManager.unpinSelection(true)
      }
      //this.selection = null
      this.pinSelection = null
    },
    toggleHighlightPos (data) {
      /*
      if (this.highlightPos === null) {
        this.highlightPos = pos
        this.highlightPosLock = true
      }
      else {
        this.highlightPos = null
        this.highlightPosLock = false
      }
       */
      if (this.highlightPos !== null && this.highlightPosLock !== true) {
        this.highlightPosLock = !this.highlightPosLock
        return false
      }
      else {
        // 在觸控的情況下
        //console.log(data)
        if (this.highlightPos === null) {
          clearTimeout(this.highlightPosLockTimer)
          this.highlightPos = data.anchorPositions
          this.highlightEvent = data.event
          this.highlightPosLock = true
        }
        else {
          this.highlightPos = null
          this.highlightEvent = null
          this.highlightPosLock = false
        }
      }
    },
    onHighlightPosMouseover (data) {
      if (this.highlightPosLock === false) {
        clearTimeout(this.highlightPosLockTimer)
        this.highlightPos = data.anchorPositions
        this.highlightEvent = data.event
      }
    },
    onHighlightPosMouseout () {
      if (this.highlightPosLock === false
           && this.highlightPos !== null) {
        // 延遲一點再消失吧
        this.highlightPosLockTimer = setTimeout(() => {
          this.highlightPos = null
          this.highlightEvent = null
        }, 0)
      }
    },
    onFindAnnotation (annotation) {
      //throw '編輯annotation ' +  annotation.id
      this.findAnnotation = annotation
      this.listPositions = this.highlightPos
    },
    onList (anchorPositions) {
      //throw '列出annotation ' +  anchorPositions.length
      this.listPositions = anchorPositions
    }
  } // methods
}

export default AnnotationManager