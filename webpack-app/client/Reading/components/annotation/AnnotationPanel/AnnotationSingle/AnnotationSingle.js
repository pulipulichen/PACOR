import AnnotationDiscussion from './AnnotationDiscussion/AnnotationDiscussion.vue'
import AnnotationEditorHeader from './AnnotationEditorHeader/AnnotationEditorHeader.vue'

import AnnotationModuleMainIdea from './../../AnnotationTypeModules/MainIdea/MainIdea.vue'
import AnnotationModuleConfusedClarified from './../../AnnotationTypeModules/ConfusedClarified/ConfusedClarified.vue'
import AnnotationModuleSectionMainIdea from './../../AnnotationTypeModules/SectionMainIdea/SectionMainIdea.vue'
//import AnnotationModuleConfused from './Confused/Confused.vue'
//import AnnotationModuleClarified from './Clarified/Clarified.vue'

let AnnotationEditorModules = {
  props: ['lib', 'status', 'config'
    //, 'annotationModule', 'pinSelection', 'annotationInstance'
    //, 'rangy', 'heightPX', 'sectionsData'
    , 'panelData', 'annotation', 'heightPX'
  ],
  data() {
    //this.$i18n.locale = this.config.locale
    return {
      hook: {
        commentLike: null
      }
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
      return this.lib.auth.stepHighlightAnnotationConfig
    },
    enableDiscussion () {
      if (typeof(this.annotation.id) !== 'number') {
        return false
      }
      else {
        return this.annotationConfig.enableCollaboration
      }
    },
    computedGridClass () {
      let classList = []
      //console.log(this.annotationConfig)
      
      if (this.isEditable) {
        classList.push('edit-mode')
      }
      else {
        classList.push('display-mode')
      }
      
      if (this.enableDiscussion === true) {
        classList.push('two')
      }
      else {
        classList.push('one')
      }
      //console.log(classList)
      return classList.join(' ') + ' column grid'
      //return undefined
    },
    type () {
      if (this.annotation !== null) {
        return this.annotation.type
      }
    },
    componentHeightPX () {
      // 這個是header的高度
      return this.heightPX - 70
    },
    discussionHeightPX () {
      // 這個是header的高度
      return this.heightPX
    },
    isEditable: function () {
      return this.lib.AnnotationHelper.isEditable(this.annotation)
    },
    computedButtonsClass: function () {
      let vm = this
      if (vm.status.preference === null
              || vm.status.preference.leftHanded === false) {
        return 'right aligned column'
      } else {
        return 'column'
      }
    },
    computedContainerStyle () {
      return {
        'max-height': (this.heightPX - 10) + `px`
      }
    },
    computedEditorStyle () {
      return {
        'max-height': this.heightPX-10 + `px`
      }
    },
    displayTime () {
      return this.lib.DayJSHelper.fromNow(this.annotation.updated_at_unixms)
    }
    
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
      this.hook = {}
      this.initHover()
      this.scrollToAnnotation()
    }
  },
  destroyed () {
    this.lib.RangyManager.hoverOut(true)
  },
  mounted() {
    //console.log(this.annotation)
    this.initHover()
    this.scrollToAnnotation()
    //console.log(111)
  },
  methods: {
    initHover () {
      //console.log(this.annotationInstance)
      //console.log(this.annotation)
      
      if (typeof(this.annotation.id) === 'number') {
        if (typeof(this.lib.RangyManager) === 'object') {
          if (this.annotation !== null 
                  && typeof(this.annotation) === 'object') {
            setTimeout(() => {
              this.lib.RangyManager.hoverIn(this.annotation, true)
            }, 100)
          }
          else {
            this.lib.RangyManager.hoverOut(true)
          }
        }
      }
      else {
        //console.log('這裡要用pin')
        //this.lib.RangyManager.pinSelection()
      }
    },
    scrollToAnnotation () {
      if (!this.lib.RangyManager) {
        return null
      }
      
      let rect = this.lib.RangyManager.getRectFromAnchorPositions(this.annotation.anchorPositions)
      //console.log(rect)
      this.lib.AnnotationPanel.scrollToRect(rect)
    },
    reloadMyHighlights: async function () {
      if (!this.lib.RangyManager) {
        return null
      }
      
      if (this.annotation.anchorPositions[0].type !== 'textContent') {
        // 如果不是網頁上的，則不重新整理
        return false
      }
      
      await this.lib.RangyManager.reloadMyHighlights()
    },
    onAdd: function () {
      this.lib.AnnotationPanel.triggerEvent('add')
    },
    onUpdate: function () {
      //console.log('update')
      this.lib.AnnotationPanel.triggerEvent('update')
      this.$emit('update')
      //console.log('update')
    },
    onDelete: async function () {
      if (this.annotation 
              && typeof(this.annotation.id) !== 'number') {
        throw 'Annotation ID is not existed.'
      }
      
      let title = this.$t('Are you sure to delete this annotation?')
      let confirm = await this.lib.ConfirmModal.show(title)
      if (confirm === false) {
        return null
      }
      
      let data = {
        id: this.annotation.id
      }

      await this.lib.AxiosHelper.get('/client/AnnotationSave/destroy', data)

      await this.reloadMyHighlights()

      this.lib.AnnotationPanel.triggerEvent('delete')
      this.$emit('delete')

    },
    onAnnotationLike: async function () {
      let data = {
        annotationID: this.annotation.id
      }
      
      let result = await this.lib.AxiosHelper.get('/client/AnnotationRate/like', data)
      //console.log(result)
    },
    focusCommentInput: function () {
      this.$refs.AnnotationDisscussion.focusCommentInput()
    }
  } // methods
}

export default AnnotationEditorModules