import $ from 'jquery'

export default function (AnnotationTypeSelector) {
  AnnotationTypeSelector.methods.setupTutorial = function () {
    //window.$ = $
    //window.el = $(this.$el)
    
    let $el = $(this.$el)
    
    this.lib.TutorialManager.addAction({
      element: async () => {
        await this.lib.RangyManager.restoreLastSelectDemoText()
        
        this.lib.RangyManager.selectionLock = true
        //let $el = $(this.$el)
        //throw new Error('如果選取的是多個物件，那應該要為多個物件畫框才行')
        let elements = $el.find('.fab-container,.fabMask,.fab-item-title')
        //console.log(elements.length)
        //console.log(elements)
        return elements
      },
      content: this.$t('Select an annotation type to highlight the selected text.'),
      order: 21,
      scroll: false
    })
    
    this.lib.TutorialManager.addAction({
      element: async () => {
        //await this.lib.RangyManager.restoreLastSelectDemoText()
        let element = $el.find('.MainIdea > .fabMask:first')
        //console.log(element.length, element)
        return element
      },
      content: this.$t(`For example, if you choose "Main Idea" type.`),
      order: 22,
      afterClick: async () => {
        console.log('有執行嗎？')
        this.lib.RangyManager.selectionLock = false
        await this.lib.RangyManager.restoreLastSelectDemoText()
        this.lib.RangyManager.onselect()
        console.log('有選取嗎？')
        await this.lib.VueHelper.sleep(1000)
        $el.find('.MainIdea > .fabMask:first').click()  // 這個的確有點到
        await this.lib.VueHelper.sleep(500)
      },
      scroll: false
    })
  }
}