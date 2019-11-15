export default function (HTMLEditor) {

  HTMLEditor.methods._callbacksOnChange = function (contents) {
    if (contents === '<p><br></p>'
            || contents === '<p></p>') {
      contents = ''
    }

    if (contents !== ''
            && contents.indexOf('<p>') === -1
            && contents.startsWith('<') === false
            && contents.startsWith('>') === false) {
      contents = `<p>${contents}</p>`
    }

    if (this.lastChangedContents === contents) {
      return false
    }

    this.$emit('input', contents)
    //this.editorConfig.contents = contents

    this.lastChangedContents = contents

    //console.log('onChange:', contents, $editable);
  }
}