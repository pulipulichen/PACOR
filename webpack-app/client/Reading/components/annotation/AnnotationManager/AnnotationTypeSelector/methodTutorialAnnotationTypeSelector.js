import $ from 'jquery'

export default function (AnnotationTypeSelector) {
  AnnotationTypeSelector.methods.setupTutorial = function () {
    window.$ = $
    window.el = $(this.$el)
    
    this.lib.TutorialManager.addAction({
      element: async () => {
        await this.lib.RangyManager.restoreLastSelectDemoText()
        let $el = $(this.$el)
        //throw new Error('如果選取的是多個物件，那應該要為多個物件畫框才行')
        let elements = $el.find('.fab-container,.fabMask,.fab-item-title')
        console.log(elements.length)
        console.log(elements)
        return elements
      },
      content: this.$t('Select an annotation type to highlight the selected text.'),
      order: 21,
      scroll: false
    })
    
    this.lib.TutorialManager.addAction({
      element: async () => {
        await this.lib.RangyManager.restoreLastSelectDemoText()
        return $(this.$refs.fab.$el).find('.fab-container.MainIdea:visible:first')
      },
      content: this.$t(`For example, if you choose "Main Idea" type.`),
      order: 22,
      scroll: false
    })
  }
}