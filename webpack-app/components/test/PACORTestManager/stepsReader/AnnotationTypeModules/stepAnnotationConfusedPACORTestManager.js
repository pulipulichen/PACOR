import $ from 'jquery'

export default function (PACORTestManager) {
  
  PACORTestManager.methods.writeConfusedAnnotation = async function () {
    
    let p = this.lib.AnnotationPanel.panelData.anchorPositions
    console.log('anchorPositions', this.lib.AnnotationPanel.panelData.anchorPositions)
    
    //throw new Error('困惑 走錯路了！是誰？')
    await this.waitTutorial()
        
    let questionEditor = await this.waitForElementVisible('.AnnotationPanel .QuestionEditor.html-editor-container .note-editable', {
      timeout: 3000
    })
    
    //questionEditor.html(this.createRandomHtml())
    await this.typeInput(questionEditor, this.createRandomText())
    await this.sleep(500)
    await this.typeInput(questionEditor, this.createRandomText())
    await this.sleep(100)
    
    if (!this.lib.AnnotationPanel.panelData.anchorPositions) {
      this.lib.AnnotationPanel.panelData.anchorPositions = p
    }
    
    await this.waitForElementVisibleClick('.AnnotationPanel .annotation-panel-buttons .ValidationButton:not(.disabled)', {
      timeout: 3000,
      errorMessage: 'writeConfusedAnnotation 是不是沒有寫到QuestionEditor? '
    })
    
    await this.waitTutorial()
    
    //await this.log('這邊我要確認一下'); await this.sleep(60 * 1000)
    
    await this.waitForElementVisibleClick('.AnnotationPanel .annotation-panel-buttons .ui.button:eq(1):not(.disabled)', {
      timeout: 3000,
      errorMessage: 'writeConfusedAnnotation 這裡很奇怪？是不是儲存沒有存好？'
    })
    
    await this.waitForElementHidden('.AnnotationPanel .segment', {
      timeout: 3000,
      errorMessage: 'writeConfusedAnnotation 應該只會看到前面'
    })
    
    //await this.lib.RangyManager.cancelSelection()
    
    await this.sleep(100)
  }
}