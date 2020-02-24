let debugForceGrid = false
if (debugForceGrid === true) {
  console.log('@TEST debugForceGrid')
}

export default function (PACORTestManager) {
  
  /**
   * 不行，這個沒用
   */
  PACORTestManager.methods.setWindowGrid = async function () {
    if (typeof(window.PACORTestManagerDisplayIndex) !== 'function') {
      if (debugForceGrid !== true) {
        return null
      }
    }
    
    let index
    if (debugForceGrid !== true) {
      index = await window.PACORTestManagerDisplayIndex()
    }
    else {
      index = 3
    }
    
    console.log(index)
    if (typeof(index) !== 'number') {
      return null
    }
    index = index % 4
    
    // 0 top left
    // 1 top right
    // 2 bottom left
    // 3 bottom right
    let top = 0
    let left = 0
    
    let height = window.screen.availHeight / 2
    let width = window.screen.availWidth / 2
    
    if (index === 2 || index === 3) {
      top = height
    }
    if (index === 1 || index === 3) {
      left = width
    }
    console.log(height, width, top, left)
    window.resizeBy(height, width)
    window.resizeTo(top, left)
  }
}