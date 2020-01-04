import $ from 'jquery'

export default function (AnnotationManager) {
  AnnotationManager.methods.setupTutorial = function () {
    //console.log('setupTutorial', 1)

    if (this.tutorialInited === true) {
      return false
    }

    this.tutorialInited = true

    //console.log('setupTutorial', 2)
    if (this.lib.auth.isEnableCollaboration === true) {
      this.setupTutorialCollaborationReading()
    } else {
      this.setupTutorialIndividualReading()
    }
  }
  AnnotationManager.methods.setupTutorialCollaborationReading = function () {
//      this.lib.TutorialManager.addAction(() => {
//        let element = $(`[data-pacor-paragraph-seq-id] [data-pacor-highlight][class^="others-"]`)
//        if (element.length === 0) {
//          element = $(`[data-pacor-paragraph-seq-id] [data-pacor-highlight]`)
//        }
//        
//        if (element.length === 0) {
//          return undefined
//        }
//        element = element.parents('[data-pacor-paragraph-seq-id]:first')
//        
//        return {
//          element,
//          content: this.$t(`You can read other's annotations.`),
//          scroll: 'start',
//          order: 1
//        }
//      })

    this.lib.TutorialManager.addAction({
      element: () => {
        let element = $(`[data-pacor-paragraph-seq-id] [data-pacor-highlight][class^="others-"]`)
        if (element.length === 0) {
          element = $(`[data-pacor-paragraph-seq-id] [data-pacor-highlight]`)
        }

        if (element.length === 0) {
          //console.log('沒找到')
          return undefined
        }
        element = element.parents('[data-pacor-paragraph-seq-id]:first')
        //console.log(element)
        return element
      },
      content: this.$t(`You can read other's annotations.`),
      scroll: 'start',
      order: 1
    })

//      this.lib.TutorialManager.addAction(() => {
//        let element = $(`[data-pacor-paragraph-seq-id] [data-pacor-highlight][class^="others-"]`)
//        if (element.length === 0) {
//          element = $(`[data-pacor-paragraph-seq-id] [data-pacor-highlight]`)
//        }
//        
//        if (element.length === 0) {
//          return undefined
//        }
//        element = element.parents('[data-pacor-paragraph-seq-id]:first')
//        
//        return {
//          element,
//          content: this.$t(`You can read other's annotations.`),
//          scroll: 'start',
//          order: 1
//        }
//      })
  }
  AnnotationManager.methods.setupTutorialIndividualReading = function () {
    //console.log('有新增嗎？')
    this.lib.TutorialManager.addAction({
      element: async () => {
        let paragraph
        while (true) {
          paragraph = await this.lib.RangyManager.selectDemoText()
          this.lib.RangyManager.onselect()
          
          if (this.lib.RangyManager.isSelecting()) {
            break
          }
        }
        
        var sel = await this.lib.RangyManager.rangy.getSelection();
        var range = sel.getRangeAt(0).cloneRange();
        var rect = range.getBoundingDocumentRect();
        //console.log(rect)
        
        this.lib.TutorialManager.showClick(rect)
        
        //console.log(this.lib.RangyManager.selection.anchorPositions)
        return paragraph
      },
      content: this.$t(`Select text to highlight.`),
      scroll: 'start',
      order: 1
    })
  }
}