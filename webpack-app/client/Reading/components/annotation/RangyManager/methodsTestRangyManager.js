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
}
