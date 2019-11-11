import AnnotationDiscussion from './AnnotationDiscussion/AnnotationDiscussion.vue'

import AnnotationModuleMainIdea from './MainIdea/MainIdea.vue'
import AnnotationModuleConfusedClarified from './ConfusedClarified/ConfusedClarified.vue'
import AnnotationModuleSectionMainIdea from './SectionMainIdea/SectionMainIdea.vue'
//import AnnotationModuleConfused from './Confused/Confused.vue'
//import AnnotationModuleClarified from './Clarified/Clarified.vue'

let AnnotationEditorModules = {
  props: ['lib', 'status', 'config'
    //, 'annotationModule', 'pinSelection', 'annotationInstance'
    //, 'rangy', 'heightPX', 'sectionsData'
    , 'panelData'
  ],
  data() {
    //this.$i18n.locale = this.config.locale
    return {
    }
  },
  components: {
    'annotation-discussion': AnnotationDiscussion,
    
    // 編輯器的元件
    'MainIdea': AnnotationModuleMainIdea,
    //'ConfusedClarified': AnnotationModuleConfusedClarified
    'Confused': AnnotationModuleConfusedClarified,
    'Clarified': AnnotationModuleConfusedClarified,
    "SectionMainIdea": AnnotationModuleSectionMainIdea
  },
  computed: {
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
    annotationConfig () {
      return this.lib.auth.currentStepAnnotationConfig
    },
    type () {
      if (typeof(this.annotationModule) === 'string') {
        return this.annotationModule
      }
      else if (this.annotationInstance !== null) {
        return this.annotationInstance.type
      }
    },
    editable () {
      return (typeof(this.annotationModule) === 'string' 
              || this.status.role !== 'reader'
              || ( this.annotationInstance !== null && this.annotationInstance.user_id === this.status.userID ))
    }
  },
  watch: {
    annotationInstance () {
      this._initHover()
    }
  },
  mounted() {
    this._initHover()
  },
  methods: {
    _initHover () {
      //console.log(this.annotationInstance)
      if (typeof(this.rangy) === 'object') {
        if (this.annotationInstance !== null 
                && typeof(this.annotationInstance) === 'object') {
          setTimeout(() => {
            this.rangy.hoverIn(this.annotationInstance, true)
          }, 100)
        }
        else {
          this.rangy.hoverOut(true)
        }
      }
    },
    reloadMyHighlights: async function () {
      // 先移除我的標註
      
      // @TODO 這件事情不應該在這裡做
      this.rangy.removeMyHighlights()
      //throw '等等'
      
      let data = {}
      let result = await this.lib.AxiosHelper.get('/client/Annotation/highlightsMy', data)
      //console.log(result)
      if (result !== 0) {
        this.rangy.deserializeAppend(result)
      }
    },
    onDelete: async function () {
      if (window.confirm(this.$t('Are you sure to delete this annotation?'))) {
        
        let data = {
          id: this.annotationInstance.id
        }
        
        await this.lib.AxiosHelper.get('/client/Annotation/destroy', data)
        await this.reloadMyHighlights()
        this.$emit('delete')

        return // 跟上層說關閉視窗
      }
    },
  } // methods
}

export default AnnotationEditorModules