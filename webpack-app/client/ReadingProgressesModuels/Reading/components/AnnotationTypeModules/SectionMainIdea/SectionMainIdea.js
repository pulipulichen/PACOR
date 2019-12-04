import Editor from './../MainIdea/MainIdea.js'

Editor.mounted = function () {
  this.validateAnnotation()
  
  this.loadDraft()
  //console.log(this.annotation)
}

Editor.computed.enableDelete = function () {
  return false
}

Editor.methods.loadDraft = async function () {
  //console.log(this.note)
  if (this.note && this.note !== '') {
    return false
  }
  
  //setTimeout(async () => {
  let note = await this.lib.AxiosHelper.get('/client/Section/getMainIdeasInSection', {
    seq_id: this.annotation.anchorPositions[0].seq_id
  })

  this.note = note
  //this.noteReset = note
  //console.log(this.note)
  if (this.$refs.editor) {
    this.$refs.editor.html(this.note)
  }
  //}, 100)
}

Editor.methods.validateAnnotation = function () {
  if (!this.annotation) {
    throw new Error('No annotation!')
  }
  
  if (this.annotation.anchorPositions.length !== 1) {
    console.log(this.annotation.anchorPositions)
    throw new Error('Annotation anchorPositions are too much.')
  }
  
  let pos = this.annotation.anchorPositions[0]
  if (pos.type !== 'section') {
    console.log(this.annotation.anchorPositions)
    throw new Error('First anchorPosition is not section')
  }
}

export default Editor