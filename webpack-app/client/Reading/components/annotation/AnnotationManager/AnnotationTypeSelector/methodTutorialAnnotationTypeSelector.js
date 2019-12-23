import $ from 'jquery'

export default function (AnnotationTypeSelector) {
  AnnotationTypeSelector.methods.setupTutorial = function () {
    this.lib.TutorialManager.addAction({
      element: () => {
        return this.$refs.fab
      },
      content: this.$t('Select an annotation type to highlight the selected text.'),
      order: 21
    })
    
    this.lib.TutorialManager.addAction({
      element: () => {
        return $(this.$refs.fab.$el).find('.fab-container.MainIdea:visible:first')
      },
      content: this.$t(`For example, if you choose "Main Idea" type.`),
      order: 22
    })
  }
}