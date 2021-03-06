import $ from 'jquery'

import stepAnnotationConfusedClarifiedPACORTestManager from './AnnotationTypeModules/stepAnnotationConfusedClarifiedPACORTestManager.js'
import stepAnnotationConfusedPACORTestManager from './AnnotationTypeModules/stepAnnotationConfusedPACORTestManager.js'
import stepAnnotationMainIdeaPACORTestManager from './AnnotationTypeModules/stepAnnotationMainIdeaPACORTestManager.js'

import stepAnnotationMainIdeaEditPACORTestManager from './AnnotationTypeModules/stepAnnotationMainIdeaEditPACORTestManager.js'
import stepAnnotationMainIdeaDeletePACORTestManager from './AnnotationTypeModules/stepAnnotationMainIdeaDeletePACORTestManager.js'

export default function (PACORTestManager) {
  PACORTestManager.methods.writeAnnotations = async function () {
    
    await this.sleep(3000)
    
    if (!this.lib.RangyManager) {
      return false
    }
    await this.lib.RangyManager.cancelSelection()
    
    //let min = 4
    //let max = 10
    
    //let min = 4
    //let max = 10
    
    let min = this.testConfig.minAnnotation
    let max = this.testConfig.maxAnnotation
    //let min = 3, max = 6
    //let min = 4, max = 10
    //let 
    
    
    let writeAnnotations = min + Math.floor(Math.random() *  (max - min))
    
    // 改用亂數排列的形式
    let iList = this.buildRandomIndexList(writeAnnotations)
    
    for (let j = 0; j < iList.length; j++) {
      let i = iList[j]
      
      //if (j === 0) {
      //  // 測試用，我第一個就想要看到疑問
      //  i = 2
      //}
      
      await this.retry(3, async () => {
        await this.sleep(100)
        let t = (i % 4)
        console.log('撰寫標註：' + (j+1) + '/' + (writeAnnotations) + ' (type: ' + t + ')' )
        await this.selectAnnotationType(i)
        if (t === 0) {
          await this.writeMainIdeaAnnotation()
          //await this.writeConfusedAnnotation()
        }
        else if (t === 1) {
          await this.writeConfusedClarifiedAnnotation()
          //await this.writeConfusedAnnotation()
        }
        else if (t === 2) {
          await this.writeConfusedAnnotation()
        }
        else {
          await this.writeMainIdeaAnnotation()
        }

        await this.sleep(100)
      })
    } // for (let j = 0; j < iList.length; j++) {
    
    await this.editMainIdeaAnnotation()
    await this.deleteMainIdeaAnnotation()
  }
  
  PACORTestManager.methods.selectAnnotationType = async function (i, errorCount = 0) {
    //this.log('selectAnnotationType', 1)
    if (!this.lib.RangyManager) {
      return false
    }
    
    //await this.lib.RangyManager.cancelSelection()
    
    await this.lib.RangyManager.selectRandomRange()
    
    //this.log('selectAnnotationType', 2)
    await this.sleep(1000)
    
    if (this.lib.RangyManager.isSelecting() === false) {
      errorCount++
      if (errorCount === 3) {
        throw new Error('Selecting is failed.')
      }
      
      await this.sleep(3000)
      return this.selectAnnotationType(i, errorCount)
    }
      
    let typeItemSelector = '.fab-main-container .fab-item-container .fab-container'

    //if (i % 2 === 0) {
    let t = i % 4
    let baseMargin = 0
    
    let mainIdeaConfig = this.status.readingConfig.annotationTypeModules.MainIdea
    if (mainIdeaConfig.enableQuickAdd === true
            && mainIdeaConfig.enableEditorAdd === true) {
      baseMargin = 1
    }
    
    if (t === 0 || t === 3) {
      // 選擇重點
      //typeItemSelector = typeItemSelector + `:eq(${0 + baseMargin})`
      typeItemSelector = typeItemSelector + `.MainIdea:not(.quick-add)`
    }
    else if (t === 1 || t === 2) {
      //typeItemSelector = typeItemSelector + `:eq(${1 + baseMargin})`
      typeItemSelector = typeItemSelector + `.Confused`
    }
    //else if (t === 2) {
      // 選擇已澄清
    //  typeItemSelector = typeItemSelector + `:eq(${1 + baseMargin})`
    //}
    
    typeItemSelector = typeItemSelector + ' .icon'
    
    try {
      await this.waitForElementVisibleClick(typeItemSelector, {
        timeout: 10 * 1000,
        errorMessage: '是不是太早選取了啊？'
      })
    }
    catch (e) {
      errorCount++
      if (errorCount >= 4) {
        throw e
      }
      return await this.selectAnnotationType(i, errorCount)
    }
    
    //console.log('有順利選擇嗎？')
    await this.sleep(3000)
    
//    let p = this.lib.AnnotationPanel.panelData.anchorPositions
//    console.log('anchorPositions', p)
//    if (p === null) {
//      throw new Error('AnnotationPanel.panelData.anchorPositions is null')
//    }
    //console.log('要確認是否有pinSelection')
    //await this.sleep(1000 * 3000)
    //this.log('selectAnnotationType', 3)
  }
  
  
  stepAnnotationConfusedClarifiedPACORTestManager(PACORTestManager)
  stepAnnotationConfusedPACORTestManager(PACORTestManager)
  stepAnnotationMainIdeaPACORTestManager(PACORTestManager)
  
  stepAnnotationMainIdeaDeletePACORTestManager(PACORTestManager)
  stepAnnotationMainIdeaEditPACORTestManager(PACORTestManager)
}