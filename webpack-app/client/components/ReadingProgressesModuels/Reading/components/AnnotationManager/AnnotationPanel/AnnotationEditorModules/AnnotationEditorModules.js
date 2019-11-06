import AnnotationDiscussion from './AnnotationDiscussion/AnnotationDiscussion.vue'

import AnnotationModuleMainIdea from './MainIdea/MainIdea.vue'
import AnnotationModuleConfusedClarified from './ConfusedClarified/ConfusedClarified.vue'

let AnnotationEditorModules = {
  props: ['lib', 'status', 'config'
    , 'annotationModule', 'pinSelection', 'annotationInstance'
    , 'rangy', 'heightPX'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
    }
  },
  components: {
    'annotation-discussion': AnnotationDiscussion,
    
    'MainIdea': AnnotationModuleMainIdea,
    'ConfusedClarified': AnnotationModuleConfusedClarified
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
    }
  } // methods
}

export default AnnotationEditorModules