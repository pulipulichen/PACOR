import $ from 'jquery'

export default function (AnnotationTypeSelector) {
  AnnotationTypeSelector.methods.setupTutorial = async function () {
    if (this.lib.auth.enableCollaboration === true) {
      return false
    }
    
    while (!this.lib.TutorialManager) {
      await this.lib.VueHelper.sleep(100)
    }
    
    
    //window.$ = $
    //window.el = $(this.$el)
    
    let $el = $(this.$el)
    let selection
    
    this.lib.TutorialManager.addAction({
      element: async () => {
        this.isTutorialMode = true
        this.lib.RangyManager.restoreLastSelectDemoText()
        
        //selection = this.selection
        //console.log(this.selection.anchorPositions)
        //console.log(this.lib.RangyManager.selection.anchorPositions)
        
        
        //this.lib.RangyManager.selectionLock = true
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
    
    this.setupMainIdeaTutorial()
    
  }
  
  AnnotationTypeSelector.methods.setupMainIdeaTutorial = function () {
    
    let mainIdeaConfig = this.lib.auth.mainIdeaConfig
    let enableEditorAdd = mainIdeaConfig.enableEditorAdd
    
    let $el = $(this.$el)
    
    
    let content = this.$t(`For example, if you choose "Main Idea" type...`)
    if (enableEditorAdd === false) {
      content = this.$t(`For example, if you choose "Main Idea" type, the selected text will be highlighted instantly.`)
    }
    
    this.lib.TutorialManager.addAction({
      element: async () => {
        if (this.lib.RangyManager.isSelecting() === false) {
          this.lib.RangyManager.restoreLastSelectDemoText()
        }

        let element = $el.find('.fab-item.MainIdea:not(.quick-add)')
        //console.log({'MainIdea fabMask': element.length})
        /*
        console.log({
          l: element.length,
          a: element.offset(),
          b: element[0].getBoundingClientRect(),
          c: element[0].getBoundingClientRect().top + window.scrollY
        })
        element.css('border', '3px solid red')
        */
        await this.lib.TutorialManager.showClick(element)

        let elements = $el.find(`.MainIdea:not(.quick-add) > .fabMask,.MainIdea:not(.quick-add) > .fab-item-title`)
        //console.log(element.length, element)
        //console.log('這時候好像就沒有選取了，為什麼呢？')
        return elements
      },
      content: content,
      order: 22,
      afterClick: async () => {
        if (enableEditorAdd === false) {
          this.lib.RangyManager.cancelSelection()
          this.isTutorialMode = false
          return false
        }
        
        //console.log('有執行嗎？')
        if (this.lib.RangyManager.isSelecting() === false) {
          this.lib.RangyManager.restoreLastSelectDemoText()
        }
        //this.lib.RangyManager.selectionLock = false
        //await this.lib.VueHelper.sleep(1000)
        //this.lib.RangyManager.onselect()
        //console.log('有選取嗎？')


        //await this.lib.RangyManager.restoreLastSelectDemoText()

        //await this.lib.RangyManager.restoreLastSelectDemoText()
        //await this.lib.VueHelper.sleep(1000)

        //this.selection = selection
        //console.log(this.selection.anchorParagraphIds)
        //$el.find('.MainIdea > .fabMask:first').click()  // 這個的確有點到
        this.addAnnotation('MainIdea')
        //
        //await this.lib.VueHelper.sleep(500)
        //setTimeout(() => {
          this.isTutorialMode = false


        //}, 100)
      },
      scroll: false
    })  // this.lib.TutorialManager.addAction({
  }
}