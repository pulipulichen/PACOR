import $ from 'jquery'

export default function (PACORTestManager) {
  PACORTestManager.methods.writeAnnotations = async function () {
    let min = 3
    let max = 10
    let writeAnnotations = min + Math.floor(Math.random() *  (max - min - 1))

    for (let i = 0; i < writeAnnotations; i++) {
      // 隨意寫標註
      //this.log('撰寫' + i)
      
      this.lib.RangyManager.selectRandomRange()
      
      if (i % 2 === 0) {
        // 選擇重點
        
      }
      else {
        // 選擇已澄清
        
      }
    }
  }
}