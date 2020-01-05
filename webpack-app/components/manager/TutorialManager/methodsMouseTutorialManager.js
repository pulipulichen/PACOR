import $ from 'jquery'

export default function (TutorialManager) {
  let $clickImage
  
  let isScrolling = false
  let lastPageYOffset
  let _this, element
  let timer
  
  let onWindowScrollEvent = () => {
    isScrolling = true
    if (timer) {
      clearTimeout(timer)
    }
    
    timer = setTimeout(() => {
      if (lastPageYOffset !== window.pageYOffset) {
        lastPageYOffset = window.pageYOffset
        onWindowScrollEvent()
        return false
      }
      
      isScrolling = false
      //console.log(isScrolling)
      if (_this) {
        //console.log('continue')
        _this.showClickExecute(element)
      }
    }, 200)
  }
  
  TutorialManager.methods.showClick = async function (e) {
    lastPageYOffset = window.pageYOffset
    element = e
    _this = this
    window.addEventListener('scroll', onWindowScrollEvent)
    
    await this.lib.VueHelper.sleep(200)
    if (isScrolling === false) {
      //console.log('first')
      this.showClickExecute(element)
    }
  }
   
  TutorialManager.methods.showClickExecute = async function (element) {
    window.removeEventListener('scroll', onWindowScrollEvent)
    if (!$clickImage) {
      $clickImage = $(this.$refs.ClickImage)
    }
    
    let width, height
    if (typeof(element.offset) === 'function') {
      width = element.width()
      height = element.height()
      element = element.offset()
    }
    
    //console.log(element)
    if (typeof(element.width) === 'function') {
      width = element.width()
      height = element.height()
    }
    else if (typeof(element.width) === 'number') {
      width = element.width
      height = element.height
    }
    else if (typeof(element.clientWidth) === 'number') {
      width = element.clientWidth
      height = element.clientHeight
    }
    
    let {top, left, bottom} = element
    
    if (typeof(top) === 'number' 
            && typeof(bottom) === 'number'
            && top + bottom > window.innerHeight) {
      top = top - window.pageYOffset
    }
    
    if (this.lib.style.detectIsMacOS) {
      top = top - 50
    }
    
    if (typeof(width) !== 'number') {
      width = 2
      height = 2
    }
    
    let middle = top + (height / 2)
    let center = left + (width / 2)
    
    
    let padding = 0
    
    //console.log(top, left)
    //let fromTop = true
    //let fromLeft = true
    
    let beforeTop = middle - 50
    let beforeLeft = center - 50
    
    let beforeStyle = {}
    let afterStyle = {}
    
    if (beforeTop > 0) {
      beforeStyle.top = beforeTop + 'px'
    }
    else {
      beforeTop = top + 50
      beforeStyle.top = beforeTop + 'px'
    }
    afterStyle.top = (middle + padding)
    
    if (beforeLeft > 0) {
      beforeStyle.left = beforeLeft + 'px'
    }
    else {
      beforeLeft = left + 50
      beforeStyle.left = beforeLeft + 'px'
    }
    afterStyle.left = (center + padding)
    //afterStyle.left = (left + 10)
    
    //console.log(beforeStyle, afterStyle)
//    alert(JSON.stringify({
//      ...afterStyle,
//      pageYOffset: window.pageYOffset
//    }, null , 2))
    $clickImage.css(beforeStyle)
    
    //$clickImage.animate(afterStyle, 1000, () => {})
    
    return new Promise((resolve) => {
      $clickImage.fadeIn('fast', async () => {
        $clickImage.animate(afterStyle, 500)
        await this.lib.VueHelper.sleep(1000)

        resolve(true)
        $clickImage.fadeOut()
      })
    })
    //throw new Error('@showClick')
  }
}