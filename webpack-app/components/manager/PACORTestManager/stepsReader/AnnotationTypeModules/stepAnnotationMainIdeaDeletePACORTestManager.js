import $ from 'jquery'

export default function (PACORTestManager) {
  
  PACORTestManager.methods.deleteMainIdeaAnnotation = async function () {
    console.log('Delete Annotation: Main Idea')
    
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
    
    // 等待Summernote載入
    await this.sleep(5000)
    
    if ($('.AnnotationPanel .html-editor-container.editable').length === 0
            || $('.AnnotationPanel .annotation-panel-buttons .delete-button:visible').length === 0) {
      console.log('似乎是以列表的形式呈現，讓我點點看')
      await this.waitForElementVisibleClick('.MainList .AnnotationItem.my-annotation:first .meta', {
        timeout: 3000
      })
    }
    
    await this.waitForElementVisibleClick('.AnnotationPanel .annotation-panel-buttons .delete-button', {
      timeout: 5000,
      errorMessage: ' writeMainIdeaAnnotation 是不是資料沒有輸入？或是寫不夠長？'
    })
    
    await this.sleep(3000)
    
    await this.waitForElementVisibleClick('.ConfirmModal .ok.button')
    
    await this.sleep(1000)
    if ($('.AnnotationPanel .segment:visible').length !== 0) {
      await this.waitForElementVisibleClick('.AnnotationPanel .close.icon', {
        timeout: 5000
      })
    }
    
    await this.waitForElementHidden('.AnnotationPanel .segment', {
      timeout: 3000,
      errorMessage: '刪除完後，AnnotationPanel沒有消失. deleteMainIdeaAnnotation'
    })
  }
}