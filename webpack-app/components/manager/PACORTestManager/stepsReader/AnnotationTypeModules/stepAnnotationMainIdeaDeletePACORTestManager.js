import $ from 'jquery'

export default function (PACORTestManager) {
  
  PACORTestManager.methods.deleteMainIdeaAnnotation = async function () {
    this.log('Delete Annotation: Main Idea')
    
    let highlights = await this.waitForElementVisible('.my-MainIdea[data-pacor-highlight]', {
      timeout: 3000
    })
    
    let highlight = this.getRandomElement(highlights)
    highlight.mouseover()
    await this.sleep(500)
    highlight.click()
    
    await this.waitForElementVisibleClick('.AnnotationFloatWidget .list-button', {
      timeout: 3000
    })
    
    await this.sleep(1000)
    if ($('.AnnotationPanel .html-editor-container .note-editable').length === 0) {
      await this.waitForElementVisibleClick('.MainList .AnnotationItem.my-annotation:first .meta', {
        timeout: 3000
      })
    }
    
    await this.waitForElementVisibleClick('.AnnotationPanel .annotation-panel-buttons .delete-button', {
      timeout: 3000,
      errorMessage: ' writeMainIdeaAnnotation 是不是資料沒有輸入？或是寫不夠長？'
    })
    
    await this.sleep(3000)
    
    await this.waitForElementVisibleClick('.ConfirmModal .ok.button')
    
    await this.waitForElementHidden('.AnnotationPanel .segment', {
      timeout: 3000,
      errorMessage: '是不是傳送儲存花太多時間了？ writeMainIdeaAnnotation'
    })
  }
}