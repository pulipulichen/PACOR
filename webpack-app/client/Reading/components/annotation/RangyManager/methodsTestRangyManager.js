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
    
//    elm.scrollIntoView({
//      behavior: 'smooth'
//    })
    this.lib.style.scrollIntoView(elm, {
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
    
    let baseWordLength = 3
    let wordLength = 10
    let point1 = Math.floor(Math.random() * maxLength) - wordLength - baseWordLength
    if (point1 < 0) {
      point1 = 0
    }
    let point2 = point1 + Math.floor(Math.random() * wordLength) + baseWordLength
    if (point2 >= maxLength) {
      point2 = wordLength - 1
    }
    
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
      setTimeout(async () => {
        //console.log('selectRandomRange', 5)
        
        //console.log({isSelecting: this.isSelecting()})
        if (this.isSelecting() === false) {
          await this.selectRandomRange()
          resolve(true)
        }
        else {
          resolve(true)
          this.onselect()
        }
        //console.log('selectRandomRange', 6)
      }, 1000)
    })
  } // RangyManager.methods.selectRandomRange = function () {
  
  let demoSelection
  RangyManager.methods.selectDemoText = async function () {
    
    let paragraph
    
    paragraph = $('[data-pacor-paragraph-seq-id]:eq(1)')
    if (paragraph.length === 0) {
      paragraph = $('[data-pacor-paragraph-seq-id]:first')
    }
    
    if (paragraph.text().trim() === '') {
      let pIndex = 1
      do {
        pIndex++
        paragraph = $(`[data-pacor-paragraph-seq-id]:eq(${pIndex})`)
      } while (paragraph.text().trim() === '')
    }
    
    let elm = paragraph[0]
    //console.log(elm)
    
    let maxLength = paragraph.text().trim().length
    
    let startPos = Math.floor(Math.random() * maxLength) - 3
    if (startPos < 0) {
      startPos = 0
    }
    startPos = startPos + 30
    let randomLength = Math.floor(Math.random() * 3) + 3
    let endPos = startPos + randomLength
    if (endPos > maxLength) {
      endPos = maxLength
    }
    
    // ------------------------
    
    let range = this.rangy.createRange()
    range.selectCharacters(elm, startPos , endPos)
    this.rangy.getSelection().addRange(range)
    
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        //console.log('selectRandomRange', 5)
        this.onselect()
        demoSelection = this.rangy.saveSelection()
        resolve(paragraph)
        //console.log('selectRandomRange', 6)
      }, 500)
    })
  } // RangyManager.methods.selectRandomRange = function () {
  
  RangyManager.methods.restoreLastSelectDemoText = async function () {
    //console.log('有選取嗎？', demoSelection)
    if (this.isSelecting()) {
      this.cancelSelection()
      await this.lib.VueHelper.sleep(100)
    }
    this.rangy.restoreSelection(demoSelection)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        //console.log('selectRandomRange', 5)
        this.onselect()
        demoSelection = this.rangy.saveSelection()
        resolve(true)
        //console.log('selectRandomRange', 6)
      }, 1000)
    })
  }
  
  let otherHighlightedSection
  RangyManager.methods.getOhterHighlightedSection = function () {
    if (!otherHighlightedSection) {
      let element = $(`[data-pacor-paragraph-seq-id] [data-pacor-highlight][class^="others-"]`)
      if (element.length === 0) {
        element = $(`[data-pacor-paragraph-seq-id] [data-pacor-highlight]`)
      }

      if (element.length === 0) {
        //console.log('沒找到')
        return undefined
      }
      element = element.parents('[data-pacor-paragraph-seq-id]:first')
      otherHighlightedSection = element
    }
    //console.log(element)
    return otherHighlightedSection
  }
}

