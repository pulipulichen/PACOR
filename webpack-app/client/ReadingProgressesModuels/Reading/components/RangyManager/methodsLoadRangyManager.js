export default (RangyManager) => {

  RangyManager.methods.reloadMyHighlights = async function () {
    this.removeMyHighlights()
    let data = {}
    let result = await this.lib.AxiosHelper.get('/client/Highlight/highlightsMy', data)
    //console.log(result)
    if (result !== 0) {
      this.deserializeAppend(result)
    }
  }

}

