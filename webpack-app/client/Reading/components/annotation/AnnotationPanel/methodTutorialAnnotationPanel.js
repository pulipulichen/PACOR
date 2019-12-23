import $ from 'jquery'

export default function (AnnotationPanel) {
  AnnotationPanel.methods.setupTutorial = function () {
    this.lib.TutorialManager.addAction({
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