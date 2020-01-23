let debugEnableAutoList = false

export default function (AnnotationTypeSelector) {
  AnnotationTypeSelector.methods.initRangyEvent = function () {
    let rangy = this.lib.RangyManager
    rangy.addEventListener('select', (data) => {
      //console.log(data, data.highlights.length)

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
        console.log('@TEST debugEnableAutoList')
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
  }
  AnnotationTypeSelector.methods.addAnnotation = function (type) {
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
    } catch (e) {
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
  }
  AnnotationTypeSelector.methods.list = function () {
    //this.$emit('list')

    let ancrhoPositions = this.lib.RangyManager.getAnchorPositionsFromSelection(this.selection)

    this.lib.AnnotationPanel.setAnchorPositions(ancrhoPositions)
    this.lib.RangyManager.cancelSelection()
    //throw '有改變嗎'
  }
  AnnotationTypeSelector.methods._testAdd = function () {
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
  
  AnnotationTypeSelector.methods.getModuleKey = function (module) {
    let key = module.type

    if (module.quickAdd) {
      key = key + '-quick-add'
    }

    return key
  }
  
  AnnotationTypeSelector.methods.getModuleTitle = function (module) {
    let title = this.$t('ANNOTATION_TYPE.' + module.type)
    
    if (module.quickAdd === true) {
      title = title + ' (' + this.$t('Quick Add') + ')'
    }
    
    return title
  }
  
  AnnotationTypeSelector.methods.getModuleClassList = function (module) {
    let classList = [module.type]
    
    if (module.quickAdd === true) {
      classList.push('quick-add')
    }
    
    return classList
  }
  
  AnnotationTypeSelector.methods.buildQuickModule = function (module) {
    let quickModule = {
      ...module
    }
    quickModule.quickAdd = true

    return quickModule
  }
}