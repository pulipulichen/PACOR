let SearchManager = {
  props: ['status', 'lib', 'config'],
  data() {    
    return {
    }
  },
  watch: {
    'status.search.keyword': function () {
      this.countSearchResult()
    }
  },
  mounted() {
    if (this.status.search.keyword !== '') {
      this.countSearchResult()
    }
  },
  methods: {
    countSearchResult: async function () {
      //console.log()
      //this.count = 0
      if (this.status.search.keyword === '') {
        this.count = 0
        return false
      }
      
      let query = {
        withCount: true,
        keyword: this.status.search.keyword
        //t: (new Date()).getTime()
      }
      let url = '/client/Annotation/listCount'
      
      this.lib.AnnotationHelper.filterQuery(query)

      this.status.search.count = await this.lib.AxiosHelper.post(url, query)
      
      if (this.status.search.keyword === '') {
        this.count = 0
        return false
      }
    },
  } // methods
}

export default SearchManager