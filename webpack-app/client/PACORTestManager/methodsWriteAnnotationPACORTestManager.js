import $ from 'jquery'

export default function (PACORTestManager) {
  PACORTestManager.methods.writeAnnotations = async function () {
    
    //let min = 4
    //let max = 10
    
    let min = 3
    let max = 6
    let writeAnnotations = min + Math.floor(Math.random() *  (max - min))
    //writeAnnotations--

    for (let i = 0; i < writeAnnotations; i++) {
      await this.sleep(100)
      
      this.log('撰寫標註：' + (i+1) + '/' + (writeAnnotations) )
      await this.selectAnnotationType(i)
      
      if (i % 3 === 0) {
        await this.writeMainIdeaAnnotation()
      }
      else if (i % 3 === 1) {
        await this.writeConfusedClarifiedAnnotation()
        //await this.writeConfusedAnnotation()
      }
      else {
        await this.writeConfusedAnnotation()
      }
      
      await this.sleep(100)
    }
    
    this.log('writeAnnotations 結束了')
  }
  
  PACORTestManager.methods.selectAnnotationType = async function (i) {
    //this.log('selectAnnotationType', 1)
    await this.lib.RangyManager.selectRandomRange()
    
    //this.log('selectAnnotationType', 2)
    await this.sleep(100)
      
    let typeItemSelector = '.fab-main-container .fab-item-container .fab-cantainer'

    //if (i % 2 === 0) {
    if (i % 3 === 0) {
      // 選擇重點
      typeItemSelector = typeItemSelector + ':eq(0)'
    }
    else if (i % 3 === 1) {
      typeItemSelector = typeItemSelector + ':eq(1)'
    }
    else {
      // 選擇已澄清
      typeItemSelector = typeItemSelector + ':eq(1)'
    }
    
    await this.waitForElementVisibleClick(typeItemSelector)
    //this.log('selectAnnotationType', 3)
  }
  
  PACORTestManager.methods.writeMainIdeaAnnotation = async function () {
    let button = await this.waitForElementVisible('.annotation-panel-buttons .ValidationButton')
    if (button.hasClass('disabled') === false) {
      throw new Error('Add button should be disabled at default')
    }
    
    await this.sleep(100)
    
    let editor = await this.waitForElementVisible('.html-editor-container .note-editable')
    //editor.html(this.createRandomHtml())
    this.typeInput('.html-editor-container .note-editable', this.createRandomText())
    
    await this.sleep(100)
    
    await this.waitForElementVisibleClick('.annotation-panel-buttons .ValidationButton', 3000)
    
    await this.waitForElementHidden('.AnnotationPanel .segment', 3000)
    
    //await this.lib.RangyManager.cancelSelection()
    
    await this.sleep(100)
  }
  
  PACORTestManager.methods.writeConfusedClarifiedAnnotation = async function () {
    
    await this.sleep(100)
    
    let questionEditor = await this.waitForElementVisible('.QuestionEditor.html-editor-container .note-editable')
    //questionEditor.html(this.createRandomHtml())
    this.typeInput('.QuestionEditor.html-editor-container .note-editable', this.createRandomText))
    
    await this.sleep(100)
    
    await this.waitForElementVisibleClick('.annotation-panel-buttons .ValidationButton', 3000)
    
    await this.sleep(100)
    
    let answerEditor = await this.waitForElementVisible('.AnswerEditor.html-editor-container .note-editable')
    //answerEditor.html(this.createRandomHtml())
    this.typeInput('.AnswerEditor.html-editor-container .note-editable', this.createRandomText())
    
    await this.sleep(100)
    
    await this.waitForElementVisibleClick('.annotation-panel-buttons .ValidationButton:last', 3000)
    
    await this.waitForElementHidden('.AnnotationPanel .segment', 3000)
    
    //await this.lib.RangyManager.cancelSelection()
    
    await this.sleep(100)
  }
  
  
  PACORTestManager.methods.writeConfusedAnnotation = async function () {
    
    await this.sleep(100)
    
    let questionEditor = await this.waitForElementVisible('.QuestionEditor.html-editor-container .note-editable')
    //questionEditor.html(this.createRandomHtml())
    this.typeInput('.QuestionEditor.html-editor-container .note-editable', this.createRandomText())
    
    await this.sleep(100)
    
    await this.waitForElementVisibleClick('.annotation-panel-buttons .ValidationButton', 3000)
    
    await this.sleep(1000)
    
    await this.waitForElementVisibleClick('.annotation-panel-buttons .ui.button:first', 3000)
    
    await this.waitForElementHidden('.AnnotationPanel .segment', 3000)
    
    //await this.lib.RangyManager.cancelSelection()
    
    await this.sleep(100)
  }
  
  PACORTestManager.methods.confirmInstructionMessage = async function () {
    await this.sleep(100)
    await this.waitForElementVisibleClick('.ui.modal.InstructionMessage .actions > .button:last')
    await this.sleep(100)
  }
}