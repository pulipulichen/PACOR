import $ from 'jquery'

export default function (AnnotationManager) {
  AnnotationManager.methods.setupTutorial = function () {
      if (this.tutorialInited === true) {
        return false
      }
      
      this.tutorialInited = true
      
      if (this.lib.auth.isEnableCollaboration) {
        this.setupTutorialCollaborationReading()
      }
      else {
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
            return undefined
          }
          element = element.parents('[data-pacor-paragraph-seq-id]:first')
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
      throw new Error('@TODO')
    }
}