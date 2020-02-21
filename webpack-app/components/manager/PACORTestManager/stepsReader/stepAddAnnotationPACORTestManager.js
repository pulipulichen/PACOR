import $ from 'jquery'

import stepAnnotationConfusedClarifiedPACORTestManager from './AnnotationTypeModules/stepAnnotationConfusedClarifiedPACORTestManager.js'
import stepAnnotationConfusedPACORTestManager from './AnnotationTypeModules/stepAnnotationConfusedPACORTestManager.js'
import stepAnnotationMainIdeaPACORTestManager from './AnnotationTypeModules/stepAnnotationMainIdeaPACORTestManager.js'

import stepAnnotationMainIdeaEditPACORTestManager from './AnnotationTypeModules/stepAnnotationMainIdeaEditPACORTestManager.js'
import stepAnnotationMainIdeaDeletePACORTestManager from './AnnotationTypeModules/stepAnnotationMainIdeaDeletePACORTestManager.js'

export default function (PACORTestManager) {
  PACORTestManager.methods.writeAnnotations = async function () {
    
    await this.sleep(3000)
    
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
      
    let typeItemSelector = '.fab-main-container .fab-item-container .fab-cantainer'

    //if (i % 2 === 0) {
    let t = i % 4
    let baseMargin = 0
    
    if (this.status.readingConfig.annotationTypeModules.MainIdea.enableQuickAdd === true) {
      baseMargin = 1
    }
    
    if (t === 0 || t === 3) {
      // 選擇重點
      typeItemSelector = typeItemSelector + `:eq(${0 + baseMargin})`
    }
    else if (t === 1) {
      typeItemSelector = typeItemSelector + `:eq(${1 + baseMargin})`
    }
    else if (t === 2) {
      // 選擇已澄清
      typeItemSelector = typeItemSelector + `:eq(${1 + baseMargin})`
    }
    
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
    //this.log('selectAnnotationType', 3)
  }
  
  
  stepAnnotationConfusedClarifiedPACORTestManager(PACORTestManager)
  stepAnnotationConfusedPACORTestManager(PACORTestManager)
  stepAnnotationMainIdeaPACORTestManager(PACORTestManager)
  
  stepAnnotationMainIdeaDeletePACORTestManager(PACORTestManager)
  stepAnnotationMainIdeaEditPACORTestManager(PACORTestManager)
}