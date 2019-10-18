import tocbot from './tocbot/tocbot.webpack.js'
import template from './TOCHelper.tpl'
import style from './../../style.config'

let inited = false

let TOCHelper = function (doDestroy) {
  
  let init = (options) => {
    initContainer()
    
    options = initOptions(options)
    setTimeout(() => {
      console.log(options)
      tocbot.init(options)
      //console.trace('inited')
    }, 0)
  }
  
  let initOptions = (options) => {
    let height = style.TopMenuHeight
    if (height.endsWith('px')) {
      height = height.slice(0, -2)
    }
    if (typeof(height) === 'string'){
      height = parseInt(height, 10)
    }
    
    let defaultOptions = {
      // Where to render the table of contents.
      tocSelector: '.js-toc',
      // Where to grab the headings to build the table of contents.
      contentSelector: '.non-invasive-web-style-framework',
      // Which headings to grab inside of the contentSelector element.
      headingSelector: 'h3, h4',
      // For headings inside relative or absolute positioned containers within content.
      hasInnerContainers: true,
      fixedSidebarOffset: height,
    }
    
    for (let name in options) {
      defaultOptions[name] = options[name]
    }
    
    return defaultOptions
  }
  
  let initContainer = () => {
    window.$(template)
            .appendTo('body')
  }
  
  let removeContainer = () => {
    window.$('#tocbotNavContainer').remove()
  }
  
  let refresh = () => {
    setTimeout(() => {
      tocbot.refresh()
      console.log('refresh')
    }, 0)
  }
  
  let reset = () => {
    inited = false
    tocbot.destroy()
    //console.log('reset')
    removeContainer()
  }
  
  
  if (typeof(doDestroy) !== 'undefined'
          && typeof(doDestroy) !== 'object') {
    return reset()
  }
  if (inited === false) {
    init(doDestroy)
    inited = true
  }
  else {
    refresh()
  }
}

export default TOCHelper