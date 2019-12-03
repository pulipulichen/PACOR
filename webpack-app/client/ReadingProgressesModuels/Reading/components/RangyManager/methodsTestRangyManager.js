import $ from 'jquery'

export default (RangyManager) => {
  
  RangyManager.methods.selectRandomRange = async function () {
    
    // 先隨便選一個data-pacor-paragraph-seq-id
    let paragraphs = $('[data-pacor-paragraph-seq-id]')
    
    let paragraphIndex = Math.floor(Math.random() * paragraphs.length)
    let paragraph = paragraphs.eq(paragraphIndex)
    
    
    // --------------------------------
    
    let elm = paragraph[0]
    
    elm.scrollIntoView({
      behavior: 'smooth'
    })
    
    let fc = elm.firstChild
    let ec = fc
    elm.focus()
    
    let maxLength = ec.length
    
    let point1 = Math.floor(Math.random() * maxLength)
    let point2 = Math.floor(Math.random() * maxLength)
    
    while (point1 === point2) {
      point2 = Math.floor(Math.random() * maxLength)
    }
    
    // -------------------------------
    
    
    let start_pos = Math.min(point1, point2)
    let end_pos = Math.max(point1, point2)
    let paragraphID = 'data-pacor-paragraph-seq-id'
    
    let selector = `[data-pacor-paragraph-seq-id="${paragraphIndex}"]`
    //PACORTestManager.log('selector', selector)
    
    // ------------------------
    
    let range = document.createRange()
    range.setStart(fc,start_pos)
    range.setEnd(ec,end_pos)
    
    let sel = window.getSelection()
    sel.removeAllRanges()
    sel.addRange(range)
    
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.onselect()
        resolve(true)
      }, 1000)
    })
  } // RangyManager.methods.selectRandomRange = function () {
}

