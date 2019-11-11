export default (List) => {
  List.methods.loadSummary = async function () {
    if (Array.isArray(this.listPositions)) {
      let query = {
        anchorPositions: this.query.anchorPositions,
        withCount: true,
        page: this.page,
        //t: (new Date()).getTime()
      }

      let url = '/client/Annotation/listSummary'

      let result = await this.lib.AxiosHelper.post(url, query)

      if (result === 0) {
        console.error('not found.')
        return
        //return this.$emit('close')
      }
      //console.log(result)

      for (let key in result) {
        this[key] = result[key]
      }
    }
  }

  List.methods.loadNextPage = async function () {
    this.page++

    if (Array.isArray(this.listPositions)) {
      let query = {
        anchorPositions: this.anchorPositions,
        withCount: true,
        page: this.page
      }

      let url = '/client/Annotation/listNext'
      let result = await this.lib.AxiosHelper.post(url, query)
      //console.log(result)
      
      if (Array.isArray(result) && result.length > 0) {
        this.annotations = this.annotations.concat(result)
      } else {
        this.noMore = true
      }
    }
  }
}