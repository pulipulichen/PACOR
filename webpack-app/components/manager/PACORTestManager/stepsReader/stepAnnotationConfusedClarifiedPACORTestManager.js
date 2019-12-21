import $ from 'jquery'

export default function (PACORTestManager) {
  
  PACORTestManager.methods.writeConfusedClarifiedAnnotation = async function () {
    
    await this.sleep(1000)
    
    let questionEditor = await this.waitForElementVisible('.AnnotationPanel .QuestionEditor.html-editor-container .note-editable', {
      timeout: 3000
    })
    //questionEditor.html(this.createRandomHtml())
    await this.typeInput(questionEditor, this.createRandomText())
    await this.sleep(500)
    await this.typeInput(questionEditor, this.createRandomText())
    
    
    await this.sleep(100)
    
    await this.waitForElementVisibleClick('.AnnotationPanel .annotation-panel-buttons .ValidationButton:not(.disabled)', {
      timeout: 3000,
      errorMessage: 'writeConfusedClarifiedAnnotation 是不是沒有寫到QuestionEditor? 或是寫不夠長？'
    })
    
    await this.sleep(100)
    
    let answerEditor = await this.waitForElementVisible('.AnnotationPanel .AnswerEditor.html-editor-container .note-editable', {
      timeout: 6000,
      errorMessage: '是不是傳送儲存花太多時間了？ writeConfusedClarifiedAnnotation'
    })
    //answerEditor.html(this.createRandomHtml())
    await this.typeInput(answerEditor, this.createRandomText())
    await this.sleep(500)
    await this.typeInput(questionEditor, this.createRandomText())
    await this.sleep(3000)
    
    await this.waitForElementVisibleClick('.AnnotationPanel .annotation-panel-buttons .ValidationButton:not(.disabled):last', {
      timeout: 3000,
      errorMessage: 'writeConfusedClarifiedAnnotation 是不是沒有寫到 answerEditor? 或是寫不夠長？'
    })
    
    await this.waitForElementHidden('.AnnotationPanel .segment', {
      timeout: 6000,
      errorMessage: '是不是傳送更新花太多時間了？ writeConfusedClarifiedAnnotation'
    })
    
    //await this.lib.RangyManager.cancelSelection()
    
    await this.sleep(100)
  }
  
}