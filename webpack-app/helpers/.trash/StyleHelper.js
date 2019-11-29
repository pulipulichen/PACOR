let StyleHelper = {
  config: null,
  setConfig (config) {
    this.config = config.styleConfig
    return this
  },
  isStackWidth () {
    let StackWidth = this.config.StackWidth
    return (window.innerWidth < StackWidth)
  },
  isSmallHeight() {
    return (window.innerHeight < this.config.SmallHeight)
  },
  getClientHeight (unit) {
    let height = window.innerHeight
    
    if (typeof(unit) === 'string') {
      height = height + unit
    }
    
    return height
  }
}

export default StyleHelper