export default (List) => {

  List.methods.loadSummary = async function () {
    if (this.isActive === false) {
      return false
    }
    
    //if (Array.isArray(this.listPositions)) {
    let query = this.query
    //console.log(query)
    
    let url = '/client/Annotation/listSummary'

    let result = await this.lib.AxiosHelper.post(url, query)

    if (result === 0) {
      //console.error('not found.')
      this.annotations = []
      this.noMore = true
      return
      //return this.$emit('close')
    }
    //console.log(result)

    for (let key in result) {
      this[key] = result[key]
    }
    //}
  }

  List.methods.loadNextPage = async function () {
    if (this.isActive === false) {
      return false
    }
    
    this.page++

    //if (Array.isArray(this.listPositions)) {
    let query = this.query

    let url = '/client/Annotation/listNext'
    let result = await this.lib.AxiosHelper.post(url, query)
    //console.log(result)

    if (Array.isArray(result) && result.length > 0) {
      this.annotations = this.annotations.concat(result)
    } else {
      this.noMore = true
    }
    //}
  }
  
  List.methods.reload = async function () {
    if (this.isActive === false) {
      return false
    }
    
    this.annotations = []
    this.page = 0
    this.noMore = false
    
    await this.loadSummary()
  }
}