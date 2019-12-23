import $ from 'jquery'

export default function (AnnotationTypeSelector) {
  AnnotationTypeSelector.methods.setupTutorial = function () {
    this.lib.TutorialManager.addAction({
      element: async () => {
        await this.lib.RangyManager.restoreLastSelectDemoText()
        let $el = $(this.$el)
        throw new Error('如果選取的是多個物件，那應該要為多個物件畫框才行')
        return $el.find('.fab-item-container,.fab-container,.fab-item-title')
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