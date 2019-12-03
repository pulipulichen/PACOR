import $ from 'jquery'

export default function (PACORTestManager) {
  PACORTestManager.methods.writeAnnotations = async function () {
    await this.waitForElementVisible('[data-pacor-paragraph-seq-id]')
    
    let min = 4
    let max = 10
    let writeAnnotations = min + Math.floor(Math.random() *  (max - min - 1))

    for (let i = 0; i < writeAnnotations; i++) {
      this.log('撰寫標註：' + i)
      await this.selectAnnotationType(i)
      
      if (true) {
        await this.writeMainIdeaAnnotation()
      }
      else if (i % 3 === 1) {
        await this.writeConfusedClarifiedAnnotation()
      }
      else {
        await this.writeConfusedAnnotation()
      }
    }
  }
  
  PACORTestManager.methods.selectAnnotationType = async function (i) {
    await this.lib.RangyManager.selectRandomRange()
    
    await this.sleep(1000)
      
    let typeItemSelector = '.fab-main-container .fab-item-container .fab-cantainer'

    //if (i % 2 === 0) {
    if (true) {
      // 選擇重點
      typeItemSelector = typeItemSelector + ':eq(0)'
    }
    else if (true) {
      typeItemSelector = typeItemSelector + ':eq(1)'
    }
    else {
      // 選擇已澄清
      typeItemSelector = typeItemSelector + ':eq(2)'
    }
    
    await this.waitForElementVisibleClick(typeItemSelector)
  }
  
  PACORTestManager.methods.writeMainIdeaAnnotation = async function () {
    let button = await this.waitForElementVisible('.annotation-panel-buttons .ValidationButton')
    if (button.hasClass('disabled') === false) {
      //throw new Error('Add button should be disabled at default')
    }
    
    let editor = await this.waitForElementVisible('.html-editor-container .note-editable')
    editor.html(this.createRandomHtml())
    
    await this.sleep(3000)
    
    await this.waitForElementVisibleClick('.annotation-panel-buttons .ValidationButton', 3000)
    
    await this.waitForElementHidden('.AnnotationPanel .segment', 3000)
    
  }
}