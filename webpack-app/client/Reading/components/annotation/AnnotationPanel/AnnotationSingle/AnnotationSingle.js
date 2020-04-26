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
      },
      enableScrollToAnnotation: true,
      headerPadding: 25
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
      let enableDiscussion
      if (typeof(this.annotation.id) !== 'number') {
        enableDiscussion = false
      }
      else {
        //return this.annotationConfig.enableCollaboration
        enableDiscussion = this.lib.auth.isEnableCollaboration
      }
      this.panelData.enableDiscussion = enableDiscussion
      return enableDiscussion
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
      let h = this.heightPX - 60 - this.headerPadding
      
      if (this.enableDiscussion === true) {
        h = h - 60
      }
      return h
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
      if (vm.lib.style.isLeftHanded === false) {
        return 'right aligned column'
      } else {
        return 'column'
      }
    },
    computedContainerStyle () {
      let h = this.heightPX - this.headerPadding
      
      if (window.innerWidth < 768) {
        h = h - 60
      }
      else if (this.enableDiscussion === true) {
        return undefined
      }
      
      if (this.enableDiscussion === true) {
        h = h - 20
      }
      
      return {
        'max-height': h + `px`
      }
    },
    computedEditorStyle () {
      let padding = this.headerPadding
      
      let h = (this.heightPX- padding)
      if (this.enableDiscussion === true) {
        h = h - 40
      }
      
      return {
        'max-height': h + `px`
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
    },
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
              if (this.lib.AnnotationHelper.isPublicSectionAnnotation(this.annotation)) {
                this.lib.RangyManager.glowSectionAnnotation(this.annotation)
              }
              else {
                this.lib.RangyManager.hoverIn(this.annotation, true)
              }
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
      //console.trace(this.enableScrollToAnnotation, this.$refs.AnnotationTypeModule.quickAddMode)
      if (this.enableScrollToAnnotation === false
              || (this.$refs.AnnotationTypeModule && this.$refs.AnnotationTypeModule.quickAddMode === true)
              || (this.lib.AnnotationPanel && this.lib.AnnotationPanel.isHide)) {
        return false
      }
      
      if (!this.lib.RangyManager) {
        return null
      }
      
      let rect
      if (this.lib.AnnotationHelper.isPublicSectionAnnotation(this.annotation)) {
        rect = this.lib.RangyManager.getRectFromSectionAnnotation(this.annotation)
        //console.log('是', rect)
      }
      else {
        rect = this.lib.RangyManager.getRectFromAnchorPositions(this.annotation.anchorPositions)
        //console.log('不是', rect)
      }
      
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
    quickAdd: async function () {
      while (!this.$refs.AnnotationTypeModule) {
        await this.lib.VueHelper.sleep(100)
      }
      
      this.enableScrollToAnnotation = false
      await this.$refs.AnnotationTypeModule.quickAdd()
      this.enableScrollToAnnotation = true
    },
    onAdd: function () {
      // 能不能...scrollIntoView呢？
      this.scrollToAnnotation()
      
      this.lib.AnnotationPanel.triggerEvent('add')
    },
    onUpdate: function () {
      this.scrollToAnnotation()
      
      //console.log('update')
      this.lib.AnnotationPanel.triggerEvent('update')
      this.$emit('update')
      //console.log('update')
    },
    onDelete: async function () {
      if (this.annotation 
              && typeof(this.annotation.id) !== 'number') {
        throw new Error('Annotation ID is not existed.')
      }
      await this.lib.AnnotationPanel.deleteAnnotation(this.annotation)
    },
    onAnnotationLike: async function () {
      let data = {
        annotationID: this.annotation.id
      }
      
      let result = await this.lib.AxiosHelper.get('/client/AnnotationRate/like', data)
      //console.log(result)
    },
    focusCommentInput: function () {
      if (this.$refs.AnnotationDisscussion) {
        this.$refs.AnnotationDisscussion.focusCommentInput()
      }
      else {
        this.$refs.AnnotationTypeModule.focusEditor()
      }
    },
    focusEditor () {
      this.$refs.AnnotationTypeModule.focusEditor()
    }
  } // methods
}

export default AnnotationEditorModules