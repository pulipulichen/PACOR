export default (AnnotationPanel) => {

  AnnotationPanel.methods.scrollToRect = function (rect) {
    if (this.enableScrollToAnnotation === false) {
      return false
    }
    
    if (!rect) {
      return false
    }
    
    let viewportHeight = window.innerHeight

    let panelHeight = this.panelData.heightPX
    let visibleHeight = viewportHeight - panelHeight
    
    //if (rect.middle < viewportHeight / 2) {
    
    let visibleTop = this.getScrollTop()
    let visibleBottom = visibleTop + visibleHeight
    
    if ( rect.height < visibleHeight ) {
      if ( rect.top > visibleTop
              && rect.bottom < visibleBottom) {
        // 還在可顯示的畫面中，不做處理
        //console.log('不處理', rect, visibleHeight, visibleTop, visibleBottom)
        return false
      }
    }
    else if ( !(rect.bottom < visibleTop || rect.top > visibleBottom) ) {
      // 雖然大小超出畫面了，但還有顯示到部分內容，所以也不捲動
      return false
    }
    
    //let middle = this.pinSelection.rect.middle
    //let middle = ((viewportHeight - this.panelData.heightPX) / 2)
    
    let top
    if ( rect.height < visibleHeight ) {
      top = rect.top - ((visibleHeight - rect.height) / 2)
    }
    else {
      top = rect.top + (visibleHeight / 10)
    }
    
    //console.log(scrollTop, rect.middle, middle)

    this.lib.style.scrollTo({
      top: top, // 等於是往上捲半個可顯示的畫面
      behavior: 'smooth'
    })
  }
  
  /**
   * @author http://www.eion.com.tw/Blogger/?Pid=1154
   */
  AnnotationPanel.methods.getScrollTop = function () {
    let bodyTop = 0;
    if (typeof window.pageYOffset !== "undefined") {
      bodyTop = window.pageYOffset;

    } else if (typeof document.compatMode === "undefined"
            && document.compatMode !== "BackCompat") {
      bodyTop = document.documentElement.scrollTop;

    } else if (typeof document.body !== "undefined") {
      bodyTop = document.body.scrollTop;
    }
    /*顯示出捲動後的高度值*/
    return bodyTop
  }
  
//  AnnotationPanel.methods.stopScrollPropagation = function (event) {
//    event.stopPropagation(true)
//    //event.preventDefault(true)
//    //console.log('滾動了')
//    return false
//  }
}