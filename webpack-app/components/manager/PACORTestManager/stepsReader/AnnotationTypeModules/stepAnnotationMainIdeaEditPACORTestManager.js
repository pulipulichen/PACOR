import $ from 'jquery'

export default function (PACORTestManager) {
  //window.$ = $
  
  PACORTestManager.methods.editMainIdeaAnnotation = async function () {
    console.log('Edit Annotation: Main Idea')
    
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
    
    // 如果有一筆標註以上，那就會跳出列表
    if ($('.AnnotationPanel .html-editor-container.editable').length === 0) {
      await this.waitForElementVisibleClick('.MainList .AnnotationItem.my-annotation:first .meta', {
        timeout: 5000
      })
    }
    
    let editor = await this.waitForElementVisible('.AnnotationPanel .html-editor-container .note-editable', {
      timeout: 5000
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
    
    await this.sleep(1000)
    if ($('.AnnotationPanel .segment:visible').length !== 0) {
      await this.waitForElementVisibleClick('.AnnotationPanel .close.icon', {
        timeout: 5000
      })
    }
    
    await this.waitForElementHidden('.AnnotationPanel .segment', {
      timeout: 3000,
      errorMessage: '編輯完後，AnnotationPanel沒有消失. writeMainIdeaAnnotation'
    })
  }
}