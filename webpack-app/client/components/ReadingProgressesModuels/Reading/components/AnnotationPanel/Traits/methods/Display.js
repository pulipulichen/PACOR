const transitionMode = 'slide up'

export default (AnnotationPanel) => {

  AnnotationPanel.methods.show = function () {
    //console.log(this.lib.rangy) // for test
    this.isHide = false
    this.placeholder.transition(transitionMode)
    
    // @TODO Semantic UI的jQuery
    window.$(this.$refs.panel).transition(transitionMode, () => {
      //this.placeholder.show()
    })

    this.scrollToPinSelection()
  }
  AnnotationPanel.methods.hide = function (doUnpin) {
    
    // 這個太怪了，根本就不應該在這裡使用
    if (this.sectionsData.sectionAnnotation.instance !== null) {
      this.sectionsData.sectionAnnotation.instance = null
      return false
    }

    this.lib.rangy.hoverOut(true)
    this.placeholder.transition(transitionMode)
    
    // @TODO Semantic UI的jQuery
    window.$(this.$refs.panel).transition(transitionMode, () => {
      if (this.isHide === true) {
        return false
      }
      this.isHide = true
    })
    if (this.status.search.showAnnotationList === true) {
      this.status.search.showAnnotationList = false
    }
    this.$emit('hide', doUnpin)
  }

  AnnotationPanel.methods.scrollToPinSelection = function () {
    if (this.pinSelection === null) {
      return false
    }

    let rect = this.pinSelection.rect
    let viewportHeight = window.innerHeight

    throw '捲動到指定位置的功能還沒做完'

    //if (rect.middle < viewportHeight / 2) {
    if (rect.bottom < (viewportHeight - this.heightPX)) {
      return false  // 不做捲動
    }

    //let middle = this.pinSelection.rect.middle
    let middle = ((viewportHeight - this.heightPX) / 2)
    let scrollTop = this.getScrollTop()
    //console.log(scrollTop, rect.middle, middle)

    window.scrollTo({
      top: (scrollTop + rect.middle - middle), // 等於是往上捲半個可顯示的畫面
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
}