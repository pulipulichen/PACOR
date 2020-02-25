import $ from 'jquery'

export default function (PACORTestManager) {
  //window.$ = $
  
  PACORTestManager.methods.editMainIdeaAnnotation = async function () {
    
    if ($('.my-MainIdea[data-pacor-highlight]').length === 0) {
      console.log('No Main Idea annotation')
      return false
    }
    
    console.log('Edit Annotation: Main Idea')
    
    let highlights = await this.waitForElementVisible('.my-MainIdea[data-pacor-highlight]', {
      timeout: 3000
    })
    
    let highlight = this.getRandomElement(highlights)
    highlight.mouseover()
    await this.sleep(500)
    highlight.click()
    
    try {
      await this.waitForElementVisibleClick('.AnnotationFloatWidget .list-button', {
        timeout: 3000
      })
    }
    catch (e) {
      console.log('Float widget is not visible... retry')
      return await this.editMainIdeaAnnotation()
    }
    
    // 等待Summernote載入
    await this.sleep(5000)
    
    // 如果有一筆標註以上，那就會跳出列表
    if ($('.AnnotationPanel .html-editor-container.editable').length === 0
            || $('.AnnotationPanel .html-editor-container .note-editable').length === 0) {
      console.log('似乎是以列表的形式呈現，讓我點點看 stepAnnotationMainIdeaEditPACORTestManager')
      try {
        await this.waitForElementVisibleClick('.MainList .AnnotationItem.my-annotation[data-annotation-type="MainIdea"]:first .meta', {
          timeout: 3000
        })
      }
      catch (e) {
        console.log('誤判嗎？ stepAnnotationMainIdeaEditPACORTestManager')
      }
    }
    
    let editor
    try {
      editor = await this.waitForElementVisible('.AnnotationPanel .html-editor-container .note-editable', {
        timeout: 5000
      })
    }
    catch (e) {
      console.log('stepAnnotationMainIdeaEditPACORTestManager 沒找到編輯框啊，全部重來一次好了')
      if ($('.AnnotationPanel .close.icon:visible').length > 0) {
        await this.waitForElementVisibleClick('.AnnotationPanel .close.icon', {
          timeout: 5000
        })
      }
      
      await this.sleep(1000)
      if ($('.ConfirmModal i.checkmark.icon:visible').length > 0) {
        await this.waitForElementVisibleClick('.ConfirmModal i.checkmark.icon:visible', {
          timeout: 5000
        })
      }
      return await this.editMainIdeaAnnotation()
    }
    //editor.html(this.createRandomHtml())
    await this.typeInput(editor, this.createRandomText())
    await this.sleep(500)
    await this.typeInput(editor, this.createRandomText())
    await this.sleep(500)
    
    await this.waitForElementVisibleClick('.AnnotationPanel .annotation-panel-buttons .ValidationButton:not(.disabled)', {
      timeout: 3000,
      errorMessage: 'writeMainIdeaAnnotation 是不是資料沒有輸入？或是寫不夠長？'
    })
    
    await this.sleep(1000)
    if ($('.AnnotationPanel .segment:visible').length !== 0
            || $('.AnnotationPanel .close.icon:visible').length > 0) {
      try {
        await this.waitForElementVisibleClick('.AnnotationPanel .close.icon', {
          timeout: 5000
        })
      }
      catch (e) {
        console.log('誤判嗎？ stepAnnotationMainIdeaEditPACORTestManager')
        if ($('.ConfirmModal i.checkmark.icon:visible').length > 0) {
          await this.waitForElementVisibleClick('.ConfirmModal i.checkmark.icon:visible', {
            timeout: 5000
          })
        }
      }
    }
    
    await this.waitForElementHidden('.AnnotationPanel .segment', {
      timeout: 3000,
      errorMessage: '編輯完後，AnnotationPanel沒有消失. writeMainIdeaAnnotation'
    })
  }
}