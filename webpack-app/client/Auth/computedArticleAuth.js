import $ from 'jquery'

export default function (Auth) {
  
  Auth.computed.article = function () {
    let articleSelector = this.status.readingConfig.selector.article
    for (let i = 0; i < articleSelector.length; i++) {
      let node = $(articleSelector[i])
      if (node.length > 0) {
        return node
        break
      }
    }
    
    throw this.$t('Cannot found any article node.')
    return false
  }
  
  Auth.computed.sections = function () {
    let sectionSelector = this.status.readingConfig.selector.section
    
    let children = this.article.children()
    for (let i = 0; i < sectionSelector.length; i++) {
      let nodes = children.filter(sectionSelector[i])
      if (nodes.length > 0) {
        return nodes
        break
      }
    }

    throw this.$t('Cannot found any section node.')
    return false
  }
  
  Auth.computed.paragraphs = function () {
    if (!this.sections) {
      return null
    }
    
    let paragraphs = []
    this.sections.each((i, section) => {
      $(section).children().each((i, paragraph) => {
        paragraphs.push($(paragraph))
      })
    })
    
    return paragraphs
  }
}