import Editor from './../MainIdea/MainIdea.js'

Editor.mounted = function () {
  this.loadDraft()
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
    this.note = await this.lib.AxiosHelper.get('/client/Section/getMainIdeasInSection', {
      seq_id: this.annotation.anchorPositions[0].seq_id
    })
    //console.log(this.note)
    if (this.$refs.editor) {
      this.$refs.editor.html(this.note)
    }
  //}, 100)
}

export default Editor