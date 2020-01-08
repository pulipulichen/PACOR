export default function (StyleManager) {
  
  StyleManager.methods.scrollTo = async function (options) {
    if (!this.detectIsIOS) {
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
          let step = (interval / 20)
          if (Math.abs(step) < 50) {
            if (step > 0) {
              step = 50
            }
            else {
              step = -50
            }
          }
          nextTop = pageYOffset + step
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
      
      if (options.block === 'center') {
        let height = element.clientHeight
        top = top + (height / 2)
      }
      
      this.scrollTo({
        top
      })
    }
  }
}