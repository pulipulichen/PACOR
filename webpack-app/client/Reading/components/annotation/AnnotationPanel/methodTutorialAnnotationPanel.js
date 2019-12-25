import $ from 'jquery'

export default function (AnnotationPanel) {
    
  AnnotationPanel.methods.setupTutorial = function () {
    
      if (this.lib.auth.currentStep !== 'IndividualReading') {
        return false
      }
    
    this.lib.TutorialManager.addAction({
      //backgroundFadeOut: true,
      element: () => {
        return this.$refs.panel
      },
      content: this.$t('You can add note for the annotation.'),
      order: 31
    })
  
    this.lib.TutorialManager.addAction({
      element: () => {
        return $(this.$refs.panel).find('.AnnotationSingle .add-button.ValidationButton:visible:first')
      },
      content: this.$t('Click "ADD" to save it.'),
      order: 32
    })
  }
}