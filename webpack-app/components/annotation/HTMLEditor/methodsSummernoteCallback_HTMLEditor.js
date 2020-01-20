export default function (HTMLEditor) {

  HTMLEditor.methods._callbacksOnChange = function (contents) {
    if (contents === '<p><br></p>'
            || contents === '<p></p>') {
      contents = ''
    }
    
    if (contents.endsWith('<p></p>')) {
      contents = contents.slice(0, -7)
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
  
  HTMLEditor.methods._onImageUpload = async function (files) {
    // upload image to server and create imgNode...
    //$summernote.summernote('insertNode', imgNode);
    //console.log('_onImageUpload', files)
    if (files.length === 0) {
      return false
    }
    
    let imageURL = await this.lib.AxiosHelper.upload('/client/File/upload', {
      file: files[0]
    })
      
    //let imageURL = result
    //console.log(imageURL)
    let message = `<a href="${imageURL}" target="_blank"><img src="${imageURL}" /></a>`
    
    this.editor.summernote('editor.insert', message)
  }
}