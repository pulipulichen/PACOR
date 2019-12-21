import $ from 'jquery'

import stepAnnotationConfusedClarifiedPACORTestManager from './AnnotationTypeModules/stepAnnotationConfusedClarifiedPACORTestManager.js'
import stepAnnotationConfusedPACORTestManager from './AnnotationTypeModules/stepAnnotationConfusedPACORTestManager.js'
import stepAnnotationMainIdeaPACORTestManager from './AnnotationTypeModules/stepAnnotationMainIdeaPACORTestManager.js'

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
    
    //for (let i = 0; i < writeAnnotations; i++) {
    iList.forEach(async (i) => {
      await this.retry(3, async () => {
        await this.sleep(100)

        this.log('撰寫標註：' + (i+1) + '/' + (writeAnnotations) )
        await this.selectAnnotationType(i)
        if (i % 3 === 0) {
          await this.writeMainIdeaAnnotation()
          //await this.writeConfusedAnnotation()
        }
        else if (i % 3 === 1) {
          await this.writeConfusedClarifiedAnnotation()
          //await this.writeConfusedAnnotation()
        }
        else {
          await this.writeConfusedAnnotation()
        }

        await this.sleep(100)
      })
    })  // iList.forEach(i, () => {
    //}
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
    
    await this.waitForElementVisibleClick(typeItemSelector, {
      timeout: 10 * 1000,
      errorMessage: '是不是太早選取了啊？'
    })
    //this.log('selectAnnotationType', 3)
  }
  
  
  stepAnnotationConfusedClarifiedPACORTestManager(PACORTestManager)
  stepAnnotationConfusedPACORTestManager(PACORTestManager)
  stepAnnotationMainIdeaPACORTestManager(PACORTestManager)
}