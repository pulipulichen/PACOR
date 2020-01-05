import $ from 'jquery'

export default (RangyManager) => {

  RangyManager.methods._initOnSelectEventListener = function () {

    let triggerSelect = () => {
      //if (this.lib.TutorialManager.isPlaying === true) {
      //  return false
      //}
      if (this.selectionLock === true) {
        return false
      }
      
      setTimeout(() => {
        this.onselect()
      }, 0)
    }

    
    document.body.addEventListener('keyup', triggerSelect)
    document.body.addEventListener('mouseup', triggerSelect)
    document.body.addEventListener('mousedown', triggerSelect)
    document.body.addEventListener('contextmenu', triggerSelect)
    document.body.addEventListener('touchend', triggerSelect)

    this._initSelectionApplier()
  }
  
  RangyManager.methods._initSelectionApplier = function () {
    // Enable buttons
    let classApplierModule = this.rangy.modules.ClassApplier

    // Next line is pure paranoia: it will only return false if the browser has no support for ranges,
    // selections or TextRanges. Even IE 5 would pass this test.
    if (this.rangy.supported && classApplierModule && classApplierModule.supported) {
      let options = {
        tagNames: ["span", "a", "b", "img"],
        ignoreWhiteSpace: true,
      }
      
      let selectionApplier = this.rangy.createClassApplier("pacor-selection", options)
      this.selectionHighlighter = this.rangy.createHighlighter()
      this.selectionHighlighter.addClassApplier(selectionApplier)

      let hoverApplier = this.rangy.createClassApplier("pacor-hover", options)
      this.hoverHighlighter = this.rangy.createHighlighter()
      this.hoverHighlighter.addClassApplier(hoverApplier)
      
      let rectApplier = this.rangy.createClassApplier("pacor-rect", options)
      this.rectHighlighter = this.rangy.createHighlighter()
      this.rectHighlighter.addClassApplier(rectApplier)
    }
  }

  RangyManager.methods._initAnchorPosition = function () {
    if (document.querySelector('[data-pacor-section-seq-id]') !== null) {
      return false // 已經初始化完成
    }
    
    for (let i = 0; i < this.rangyConfig.articleSelector.length; i++) {
      let node = $(this.rangyConfig.articleSelector[i])
      if (node.length > 0) {
        this.articleNode = node
        break
      }
    }

    if (this.articleNode === null) {
      //console.warn('Cannot found any article node.')
      throw this.$t('Cannot found any article node.')
      return false
    }

    let children = this.articleNode.children()
    for (let i = 0; i < this.rangyConfig.sectionSelector.length; i++) {
      let nodes = children.filter(this.rangyConfig.sectionSelector[i])
      if (nodes.length > 0) {
        this.sectionNodes = nodes
        break
      }
    }

    if (this.sectionNodes === null) {
      //console.warn('Cannot found any article node.')
      throw this.$t('Cannot found any section node.')
      return false
    }

    this.sectionNodes.each((i, node) => {
      //node = window.$(node)
      //node.attr('data-pacor-section-seq-id', i)

      node.setAttribute('data-pacor-section-seq-id', i)
    })

    this.sectionNodes.children().each((i, node) => {
      //node = window.$(node)
      //node.attr('data-pacor-section-seq-id', i)

      node.setAttribute('data-pacor-paragraph-seq-id', i)
      //console.log(typeof(node.id), node.id)
      if (typeof (node.id) !== 'string' || node.id === '') {
        let id = 'pacor-paragraph-id-' + i
        node.setAttribute('id', id)
      }
    })
  }

}

