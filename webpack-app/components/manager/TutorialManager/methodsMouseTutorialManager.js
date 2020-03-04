/* global HTMLElement */

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
  
  TutorialManager.methods.showClick = async function (e, options) {
    if (this.lib.style.detectIsIOS && window.innerWidth < 768) {
      // 太小了，不使用指標
      return false
    }
    
    if (!options) {
      options = {}
    }
    
    lastPageYOffset = window.pageYOffset
    element = e
    _this = this
    window.addEventListener('scroll', onWindowScrollEvent)
    
    await this.lib.VueHelper.sleep(200)
    if (isScrolling === false) {
      //console.log('first')
      if (options.awaitExecute === true) {
        await this.showClickExecute(element)
      }
      else {
        this.showClickExecute(element)
      }
    }
  }
  
  TutorialManager.methods.showFixedClick = async function (e) {
    this.clickFixed = true
    await this.showClick(e)
  }
   
  TutorialManager.methods.showClickExecute = async function (element, limitedRect) {
    window.removeEventListener('scroll', onWindowScrollEvent)
    //console.log('showClickExecute')
    if (!$clickImage) {
      $clickImage = $(this.$refs.ClickImage)
    }
    
    let width, height
    if (element instanceof HTMLElement) {
      element = $(element)
    }
    //console.log(element)
    
    
    if (typeof(element.offset) === 'function') {
      width = element.width()
      height = element.height()
      
      //console.log(element[0].getBoundingClientRect())
      
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
    else if (typeof(top) === 'number' 
            && typeof(bottom) !== 'number'
            && top > window.innerHeight) {
      top = top - window.pageYOffset
    }
    
    //console.log(top, this.lib.style.detectIsIOS)
    if (this.lib.style.detectIsIOS) {
      top = top - 50
    }
    
    if (limitedRect 
            && (top > limitedRect.bottom || top < limitedRect.top) ) {
      top = top - window.scrollY
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
    
    //console.log({beforeStyle, afterStyle, vh: window.innerHeight, vw: window.innerWidth})
    
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
        $clickImage.fadeOut(() => {
          this.clickFixed = false
        })
      })
    })
    //throw new Error('@showClick')
  }
}