import $ from 'jquery'

export default function (PACORTestManager) {
  
  PACORTestManager.methods.writeMainIdeaAnnotation = async function () {
    let mainIdeaConfig = this.lib.auth.mainIdeaConfig
    let enableEditorAdd = mainIdeaConfig.enableEditorAdd
    
    if (enableEditorAdd === false) {
      return false
    }
    
    let button = await this.waitForElementVisible('.AnnotationPanel .annotation-panel-buttons .ValidationButton', {
      timeout: 3000
    })
    if (button.hasClass('disabled') === false) {
      // 現在改成可以直接新增
      throw new Error('Add button should be disabled at default')
    }
    
    await this.sleep(1000)
    
    // 這邊要先確認是否有在導覽中
    await this.waitTutorial()
    
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