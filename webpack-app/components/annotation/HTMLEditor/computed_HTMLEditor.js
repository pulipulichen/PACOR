export default function (HTMLEditor) {

  HTMLEditor.computed.computedClass = function () {
    let classList = []
    if (this.editable) {
      classList.push('editable')
    } else {
      classList.push('secondary')
    }

    if (this.label) {
      classList.push('labeled')
    }
    
    if (this.lib.style.isLeftHanded) {
      classList.push('editor-left-handed')
    }

    return classList
  } // HTMLEditor.computed.computedClass = function () {

  HTMLEditor.computed.computedStyle = function () {
    if (this.editable === false) {
      return null
    }

    if (typeof (this.height) === 'string') {

      let calc = this.height
      if (calc.startsWith('calc')) {
        calc = calc.slice(5, -1)
      }

      let padding = 44
      //if (this.label) {
      //  padding = padding + 30
      //}

      calc = `calc(${calc} - ${padding}px)`
      //console.log(calc)
      setTimeout(() => {
        $(this.$refs.editorContainer).find('.note-editable:visible').css('max-height', calc)
        //console.log($(this.$refs.editorContainer).find('.note-editable:visible').length)
      }, 100)


      return {
        height: this.height,
        'max-height': this.height
                //border: '1px solid red'
      }
    }
  } // HTMLEditor.computed.computedStyle = function () {
  
  HTMLEditor.computed.computedLabelClassList = function () {
    if (this.lib.style.isLeftHanded) {
      return 'ui top right attached large label'
    }
    else {
      return 'ui top left attached large label'
    }
  }
}