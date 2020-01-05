export default function (StyleManager) {
  
  StyleManager.methods.scrollTo = async function (options) {
    if (this.detectOS !== 'Mac OS') {
      window.scrollTo(options)
    }
    else {
      let pageYOffset = window.pageYOffset
      while (pageYOffset !== options.top) {
        let interval = options.top - pageYOffset 
        
        let nextTop 
        if (Math.abs(interval) < 50) {
          nextTop = options.top
        }
        else {
          nextTop = pageYOffset + (interval / 10)
        }
        
        window.scrollTo({
          top: nextTop
        })
        //console.log('有動嗎？', )
        await this.lib.VueHelper.sleep(10)
        pageYOffset = nextTop
      }
    }
  }
  
  StyleManager.methods.scrollIntoView = function (element, options) {
    if (this.detectOS !== 'Mac OS') {
      element.scrollIntoView(options)
    }
    else {
      let top = element.offsetTop
      this.scrollTo({
        top
      })
    }
  }
}