import $ from 'jquery'

export default (RangyManager) => {
  
  RangyManager.methods.selectRandomRange = function () {
    
    // 先隨便選一個data-pacor-paragraph-seq-id
    let paragraphs = $('[data-pacor-paragraph-seq-id]')
    
    let paragraphIndex = Math.floor(Math.random() * paragraphs.length)
    let paragraph = paragraphs.eq(paragraphIndex)
    
    let maxLength = paragraph.text().length
    
    let point1 = Math.floor(Math.random() * maxLength)
    let point2 = Math.floor(Math.random() * maxLength)
    while (point1 === point2) {
      point2 = Math.floor(Math.random() * maxLength)
    }
    
    // --------------------------------
    
    let start_pos = Math.min(point1, point2)
    let end_pos = Math.max(point1, point2)
    let paragraphID = 'data-pacor-paragraph-seq-id'
    
    let selector = `[data-pacor-paragraph-seq-id="${paragraphIndex}"]`
    //PACORTestManager.log('selector', selector)
    
    let elm = paragraph[0]
    
    elm.scrollIntoView({
      behavior: 'smooth'
    })
    
    let fc = elm.firstChild
    let ec = elm.lastChild
    let range = document.createRange()
    let sel
    elm.focus()
    range.setStart(fc,start_pos)
    range.setEnd(ec,end_pos)
    sel = window.getSelection()
    sel.removeAllRanges()
    sel.addRange(range)
    
    this.onselect()
  } // RangyManager.methods.selectRandomRange = function () {
}

