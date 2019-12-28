import $ from 'jquery'

export default function (PACORTestManager) {
  
  PACORTestManager.methods.editAnnotation = async function () {
    let highlights = await this.waitForElementVisible('[data-pacor-highlight][class*="my-"]', {
      timeout: 3000
    })
    
    let highlight = this.getRandomElement(highlights)
    highlight.click()
    
    await this.waitForElementVisibleClick('.AnnotationFloatWidget .list-button', {
      timeout: 3000
    })
    
    await this.waitForElementVisibleClick('.MainList .AnnotationItem.my-annotation:first .meta', {
      timeout: 3000
    })
    
    if (button.hasClass('disabled') === false) {
      throw new Error('Add button should be disabled at default')
    }
    
    await this.sleep(1000)
    
    let editor = await this.waitForElementVisible('.AnnotationPanel .html-editor-container .note-editable', {
      timeout: 3000
    })
    //editor.html(this.createRandomHtml())
    await this.typeInput(editor, this.createRandomText())
    await this.sleep(500)
    await this.typeInput(editor, this.createRandomText())
    await this.sleep(500)
    
    
    await this.waitForElementVisibleClick('.AnnotationPanel .annotation-panel-buttons .ValidationButton:not(.disabled)', {
      timeout: 3000,
      errorMessage: ' writeMainIdeaAnnotation 是不是資料沒有輸入？或是寫不夠長？'
    })
    
    await this.waitForElementHidden('.AnnotationPanel .segment', {
      timeout: 3000,
      errorMessage: '是不是傳送儲存花太多時間了？ writeMainIdeaAnnotation'
    })
    
    //await this.lib.RangyManager.cancelSelection()
    
    await this.sleep(100)
  }
}