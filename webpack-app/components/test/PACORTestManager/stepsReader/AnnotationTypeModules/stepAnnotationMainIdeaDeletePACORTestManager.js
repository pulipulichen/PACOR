import $ from 'jquery'

export default function (PACORTestManager) {
  
  PACORTestManager.methods.deleteMainIdeaAnnotation = async function () {
    
    if ($('.my-MainIdea[data-pacor-highlight]').length === 0) {
      console.log('No Main Idea annotation')
      return false
    }
    
    console.log('Delete Annotation: Main Idea')
    
    if ($('.AnnotationFloatWidget.show.is-fixed:visible').length > 0) {
      // 已經顯示了，不用執行這個
      await this.waitForElementVisibleClick('.AnnotationFloatWidget.show.is-fixed:visible .close.icon')
    }
    
    let highlights = await this.waitForElementVisible('.my-MainIdea[data-pacor-highlight]', {
      timeout: 3000
    })
    
    let highlight = this.getRandomElement(highlights)
    highlight.mouseover()
    await this.sleep(500)
    highlight.click()
    
    await this.sleep(3000)
    let editSelector = '.AnnotationFloatWidget .AnnotationItem .meta'
    if ($('.AnnotationFloatWidget .list-button:visible').length > 0) {
      editSelector = '.AnnotationFloatWidget .list-button'
    }
    
    try {
      await this.waitForElementVisibleClick(editSelector, {
        timeout: 1000
      })
      await this.sleep(1000)
    }
    catch (e) {
      console.log('Float widget is not visible... retry: ' + editSelector)
      return await this.deleteMainIdeaAnnotation()
    }
    
    // 等待Summernote載入
    if ($('.AnnotationFloatWidget.show:visible > .segment').length > 0) {
      console.log('AnnotationFloatWidget還是開著 ', editSelector)
      return await this.deleteMainIdeaAnnotation()
    }
    
    if ($('.AnnotationPanel .html-editor-container.editable').length === 0
            || $('.AnnotationPanel .annotation-panel-buttons .delete-button:visible').length === 0) {
      // 這邊要先確認是否有在導覽中
      await this.waitTutorial()
      
      console.log('似乎是以列表的形式呈現，讓我點點看 stepAnnotationMainIdeaDeletePACORTestManager')
      try {
        await this.waitForElementVisibleClick('.MainList .AnnotationItem.my-annotation:first .meta', {
          timeout: 5000
        })
      }
      catch (e) {
        console.log('誤判嗎？ stepAnnotationMainIdeaDeletePACORTestManager')
      }
    }
    else {
      //await this.sleep(3000)
      // 這邊要先確認是否有在導覽中
      await this.waitTutorial()
    }
    
    try {
      await this.waitForElementVisibleClick('.AnnotationPanel .annotation-panel-buttons .delete-button', {
        timeout: 5000,
        errorMessage: 'stepAnnotationMainIdeaDeletePACORTestManager 是不是資料沒有輸入？或是寫不夠長？'
      })
    }
    catch (e) {
      console.log('stepAnnotationMainIdeaDeletePACORTestManager 沒找到刪除按鈕啊，全部重來一次好了')
      if ($('.AnnotationPanel .close.icon:visible').length > 0) {
        await this.waitForElementVisibleClick('.AnnotationPanel .close.icon', {
          timeout: 5000
        })
      }
      return await this.deleteMainIdeaAnnotation()
    }
    
    await this.sleep(3000)
    
    await this.waitForElementVisibleClick('.ConfirmModal .ok.button')
    
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
      }
    }
    
    await this.waitForElementHidden('.AnnotationPanel .segment', {
      timeout: 3000,
      errorMessage: '刪除完後，AnnotationPanel沒有消失. deleteMainIdeaAnnotation'
    })
  }
}