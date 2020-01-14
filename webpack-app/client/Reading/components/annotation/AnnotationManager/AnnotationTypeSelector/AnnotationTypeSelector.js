import './VueFab.js'

let debugEnableAutoList = false

/**
 * https://www.npmjs.com/package/vue-float-action-button
 */
let AnnotationTypeSelector = {
  props: ['status', 'config', 'lib'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      timer: null,
      selection: null,
      anchorPositions: null,
      anchorParagraphIds: null,
      isTutorialMode: false
    }
  },
  watch: {
    'selection': function () {
      if (this.isTutorialMode === true) {
        return false
      }
      let fab = this.$refs.fab
      clearTimeout(this.timer)
      
      //console.log('watch selection')
      if (this.selection !== null) {
        //console.log('open')
        this.timer = setTimeout(() => {
          //console.log(this.selection.anchorPositions)
          fab.onOffFab(true)
        }, 100)
      }
      else {
        this.timer = setTimeout(() => {
          fab.onOffFab(false)
        }, 100)
      }
      //if (this.selection !== null) {
      //  console.trace(this.selection)
      //}
      //fab.onOffFab((this.selection !== null))
    },
  },
  computed: {
    annotationModules: function () {
      let modules = []
      
      let currentStep = this.lib.auth.currentStep
      //console.log(currentStep)
      if (typeof(currentStep) === 'string') {
        
        let config = this.status.readingConfig
        if (typeof(config) === 'object') {
          let annotationTypes = config.readingProgressModules[currentStep].highlightAnnotation.types
          if (Array.isArray(annotationTypes)) {
            annotationTypes.forEach(type => {
              let module = config.annotationTypeModules[type]
              //console.log(module)
              if (typeof(module) === 'object'
                      && module.addable === true) {
                module.type = type
                modules.push(module)
              }
            })
          }
        }
      }
      //console.log(modules)
      modules.reverse()
      return modules
    },
    computedFABPosition () {
      //console.log(this.status.preference.leftHanded)
      if (this.lib.style.isLeftHanded === true) {
        return 'bottom-left'
      }
      else {
        return 'bottom-right'
      }
    },
    enableList () {
      return (this.selection !== null 
            && this.selection.highlights.length > 0)
    }
  },
  mounted() {
//    //console.log(this.status.preference.leftHanded)
    this.initRangyEvent()
    
    //this._testAdd()
  },
  methods: {
    initRangyEvent () {
      let rangy = this.lib.RangyManager
      rangy.addEventListener('select', (data) => {
        //console.log('取消')
        
        // 如果AnnotationPanel已經顯示，則不動作
        
        //console.log('this.lib.AnnotationPanel.isHide', this.lib.AnnotationPanel.isHide)
        
        if (this.lib.AnnotationPanel.isHide === false) {
          return false
        }
        
        //console.log(data.anchorPositions)
        //PACORTestManager.log('initRangyEvent', (this.selection === null))
        this.selection = data
        this.anchorPositions = data.anchorPositions
        this.anchorParagraphIds = data.anchorParagraphIds
        
        //console.log(this.selection.anchorPositions)
        
        // For test
        if (debugEnableAutoList) {
          setTimeout(() => {
            this.list()
          }, 100)
        }
      })
      
      rangy.addEventListener('selectcollapsed', (data) => {
        //PACORTestManager.log('selectcollapsed')
        if (this.isTutorialMode === true) {
          return false
        }
        //console.log('取消')
        //setTimeout(() => {
          this.selection = null
        //}, 50)
      })
      
      this.setupTutorial()
    },
    addAnnotation: function (type) {
      //this.lib.RangyManager.restoreLastSelection()
      //console.log({isSelecting: this.lib.RangyManager.isSelecting()})
      //if (this.lib.RangyManager.isSelecting() === false) {
      //  throw new Error('Selection lost')
      //}
      //console.log(this.anchorPositions)
      //console.log(this.selection.anchorPositions)
      if (this.selection.anchorPositions.length === 0) {
        this.selection.anchorPositions = this.anchorPositions
      }
      if (this.selection.anchorParagraphIds.length === 0) {
        this.selection.anchorParagraphIds = this.anchorParagraphIds
      }
//      event.stopPropagation()
//      event.preventDefault()
      //return
      
      
      //console.log('clickItem', type)
      //this.$emit('selectAnnotation', type)
      if (!this.selection) {
        return null
      }
      if (this.isTutorialMode) {
        let demoAnnotation = {
          anchorPositions: [],
          type: type
        }
        this.lib.AnnotationPanel.setAnnotation(demoAnnotation)
        this.selection = null
        return false
      }
      
      
      //console.log({sa: this.selection.anchorPositions})
      let anchorPositions = this.lib.RangyManager.getAnchorPositionsFromSelection(this.selection)
      //console.log({ap: anchorPositions})
      let annotation = {
        anchorPositions: anchorPositions,
        type: type
      }
      
      try {
        this.lib.AnnotationHelper.validate(annotation)
      }
      catch (e) {
        console.error(e)
        this.selection = null
        return null
      }
      
      this.lib.RangyManager.pinSelection(this.selection)
      
      this.lib.AnnotationPanel.setAnnotation(annotation, {
        'cancel': () => {
          // 如果取消的話，那就恢復選取
          //console.log('有嗎？')
          this.lib.RangyManager.unpinSelection(true)
        }
      })
      
      this.selection = null
    },
    list () {
      //this.$emit('list')
      
      let ancrhoPositions = this.lib.RangyManager.getAnchorPositionsFromSelection(this.selection)
      
      this.lib.AnnotationPanel.setAnchorPositions(ancrhoPositions)
      this.lib.RangyManager.cancelSelection()
      //throw '有改變嗎'
    },
    _testAdd () {
      let anchorPositions = [{
          seq_id: 0,
          paragraph_id: 'pacor-paragraph-id-4',
          start_pos: 5,
          end_pos: 8,
      }]
      let type = 'MainIdea'
    
      let annotation = {
        anchorPositions: anchorPositions,
        type: type
      }

      this.lib.AnnotationPanel.setAnnotation(annotation)
    }
  } // methods
}

import methodTutorialAnnotationTypeSelector from './methodTutorialAnnotationTypeSelector.js'
methodTutorialAnnotationTypeSelector(AnnotationTypeSelector)

export default AnnotationTypeSelector