import $ from 'jquery'

export default (RangyManager) => {
  
  RangyManager.methods.selectRandomRange = async function () {
    
//    let range = this.rangy.createRange()
//    let paragraph = $('[data-pacor-paragraph-seq-id="1"]')[0]
//    range.selectCharacters(paragraph, 2 , 10)
//    
//    this.rangy.getSelection().addRange(range)
//    
//    console.log('selectRandomRange', 1)
    
    // 先隨便選一個data-pacor-paragraph-seq-id
    
    let paragraphs = $('[data-pacor-paragraph-seq-id]')
    
    let paragraphIndex = Math.floor(Math.random() * paragraphs.length)
    let paragraph = paragraphs.eq(paragraphIndex)
    
    let elm = paragraph[0]
    
    elm.scrollIntoView({
      behavior: 'smooth'
    })
    
    //console.log('selectRandomRange', 2, paragraphIndex)
    
    // --------------------------------
    
    let maxLength = paragraph.text().trim().length
    
    //console.log('selectRandomRange', 3, maxLength)
    
    if (maxLength < 3) {
      //console.log('沒有選到...', elm)
      return await this.selectRandomRange()
    }
    
    let point1 = Math.floor(Math.random() * maxLength)
    let point2 = Math.floor(Math.random() * maxLength)
    
    while (point1 === point2) {
      point2 = Math.floor(Math.random() * maxLength)
    }
    
    // -------------------------------
    
    
    let start_pos = Math.min(point1, point2)
    let end_pos = Math.max(point1, point2)
    //let paragraphID = 'data-pacor-paragraph-seq-id'
    
    //let selector = `[data-pacor-paragraph-seq-id="${paragraphIndex}"]`
    //PACORTestManager.log('selector', selector)
    
    // ------------------------
    
    let range = this.rangy.createRange()
    range.selectCharacters(elm, start_pos , end_pos)
    this.rangy.getSelection().addRange(range)
    
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        //console.log('selectRandomRange', 5)
        this.onselect()
        resolve(true)
        //console.log('selectRandomRange', 6)
      }, 1000)
    })
  } // RangyManager.methods.selectRandomRange = function () {
  
  let demoSelection
  RangyManager.methods.selectDemoText = async function () {
    
    let paragraph = $('[data-pacor-paragraph-seq-id]:eq(1)')
    if (paragraph.length === 0) {
      paragraph = $('[data-pacor-paragraph-seq-id]:first')
    }
    let elm = paragraph[0]
    //console.log(elm)
    
    let maxLength = paragraph.text().trim().length
    
    let startPos = Math.floor(Math.random() * maxLength) - 3
    if (startPos < 0) {
      startPos = 0
    }
    let randomLength = Math.floor(Math.random() * 3) + 3
    let endPos = startPos + randomLength
    if (endPos > maxLength) {
      endPos = maxLength
    }
    
    // ------------------------
    
    let range = this.rangy.createRange()
    range.selectCharacters(elm, startPos , endPos)
    this.rangy.getSelection().addRange(range)
    demoSelection = this.rangy.saveSelection()
    
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        //console.log('selectRandomRange', 5)
        this.onselect()
        resolve(paragraph)
        //console.log('selectRandomRange', 6)
      }, 1000)
    })
  } // RangyManager.methods.selectRandomRange = function () {
  
  RangyManager.methods.restoreLastSelectDemoText = async function () {
    this.rangy.restoreSelection(demoSelection)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        //console.log('selectRandomRange', 5)
        this.onselect()
        resolve(true)
        //console.log('selectRandomRange', 6)
      }, 1000)
    })
  }
}

