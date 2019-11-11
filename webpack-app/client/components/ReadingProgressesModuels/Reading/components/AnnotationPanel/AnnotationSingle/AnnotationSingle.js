import AnnotationDiscussion from './AnnotationDiscussion/AnnotationDiscussion.vue'
import AnnotationEditorHeader from './components/AnnotationEditorHeader/AnnotationEditorHeader.vue'

import AnnotationModuleMainIdea from './MainIdea/MainIdea.vue'
import AnnotationModuleConfusedClarified from './ConfusedClarified/ConfusedClarified.vue'
import AnnotationModuleSectionMainIdea from './SectionMainIdea/SectionMainIdea.vue'
//import AnnotationModuleConfused from './Confused/Confused.vue'
//import AnnotationModuleClarified from './Clarified/Clarified.vue'

let AnnotationEditorModules = {
  props: ['lib', 'status', 'config'
    //, 'annotationModule', 'pinSelection', 'annotationInstance'
    //, 'rangy', 'heightPX', 'sectionsData'
    , 'panelData', 'annotation'
  ],
  data() {
    //this.$i18n.locale = this.config.locale
    return {
    }
  },
  components: {
    'annotation-editor-header': AnnotationEditorHeader,
    'annotation-discussion': AnnotationDiscussion,
    
    // 編輯器的元件
    'MainIdea': AnnotationModuleMainIdea,
    //'ConfusedClarified': AnnotationModuleConfusedClarified
    'Confused': AnnotationModuleConfusedClarified,
    'Clarified': AnnotationModuleConfusedClarified,
    "SectionMainIdea": AnnotationModuleSectionMainIdea
  },
  computed: {
    annotationConfig () {
      return this.lib.auth.currentStepAnnotationConfig
    },
    computedGridClass () {
      let classList = []
      if (this.annotationConfig.enableCollaboration === true) {
        classList.push('two')
      }
      else {
        classList.push('one')
      }
      
      return classList.join(' ') + ' column grid'
    },
    type () {
      if (this.annotation !== null) {
        return this.annotation.type
      }
    },
//    isAdding () {
//      return (this.annotation
//              && typeof(this.annotation.id) === 'number' )
//    },
//    editable () {
//      return (this.isAdding 
//              || this.status.role !== 'reader'
//              || ( this.annotation !== null && this.annotation.user_id === this.status.userID ))
//    }
  },
  watch: {
    annotation () {
      this.initHover()
    }
  },
  mounted() {
    this.initHover()
    this.scrollToAnnotation()
  },
  methods: {
    initHover () {
      //console.log(this.annotationInstance)
      if (typeof(this.lib.RangyManager) === 'object') {
        if (this.annotation !== null 
                && typeof(this.annotation) === 'object') {
          setTimeout(() => {
            this.RangyManager.hoverIn(this.annotation, true)
          }, 100)
        }
        else {
          this.RangyManager.hoverOut(true)
        }
      }
    },
    scrollToAnnotation () {
      //throw '@TODO'
      let rect = this.lib.RangyManager.getRectFromAnchorPositions(this.annotation.anchorPositions)
      this.lib.AnnotationPanel.scrollToRect(rect)
    },
    reloadMyHighlights: async function () {
      if (this.annotation.anchorPositions[0].type !== 'textContent') {
        // 如果不是網頁上的，則不重新整理
        return false
      }
      
      this.rangy.removeMyHighlights()
      //throw '等等'
      
      let data = {}
      let result = await this.lib.AxiosHelper.get('/client/Annotation/highlightsMy', data)
      //console.log(result)
      if (result !== 0) {
        this.rangy.deserializeAppend(result)
      }
    },
    onAdd: async function () {
      this.lib.AnnotationPanel.triggerEvent('add')
    },
    onUpdate: async function () {
      this.lib.AnnotationPanel.triggerEvent('update')
    },
    onDelete: async function () {
      if (this.annotation 
              && typeof(this.annotation.id) !== 'number') {
        throw 'Annotation ID is not existed.'
      }
      
      if (window.confirm(this.$t('Are you sure to delete this annotation?'))) {
        
        let data = {
          id: this.annotation.id
        }
        
        await this.lib.AxiosHelper.get('/client/Annotation/destroy', data)
        
        await this.reloadMyHighlights()
        
        //this.$emit('delete')
        this.lib.AnnotationPanel.triggerEvent('delete')

        //return // 跟上層說關閉視窗
      }
    },
  } // methods
}

export default AnnotationEditorModules