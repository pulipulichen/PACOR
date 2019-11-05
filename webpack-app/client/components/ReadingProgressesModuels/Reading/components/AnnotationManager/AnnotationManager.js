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
      highlightPosLock: false,
      //loadHighlightInterval: 3 * 1000  // for test
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
    toggleHighlightPos (pos) {
      if (this.highlightPos === null) {
        this.highlightPos = pos
        this.highlightPosLock = true
      }
      else {
        this.highlightPos = null
        this.highlightPosLock = false
      }
    },
    onHighlightPosMouseover (pos) {
      if (this.highlightPosLock === false) {
        this.highlightPos = pos
      }
    },
    onHighlightPosMouseout () {
      if (this.highlightPosLock === false
           && this.highlightPos !== null) {
        this.highlightPos = null
      }
    }
  } // methods
}

export default AnnotationManager