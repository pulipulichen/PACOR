let SearchInput = {
  props: ['status', 'lib'],
  data() {    
    return {
      enableShowList: false,
      count: 0
    }
  },
//  components: {
//  },
//  computed: {
//  },
  watch: {
    'status.search.keyword': async function (keyword) {
      //console.log()
      //this.count = 0
      if (keyword === '') {
        this.count = 0
        return false
      }
      
      let query = {
        withCount: true,
        keyword: keyword
        //t: (new Date()).getTime()
      }
      let url = '/client/Annotation/listCount'

      this.count = await this.lib.AxiosHelper.post(url, query)
    }
  },
//  mounted() {
//  },
  //methods: {
    //doSearch () {
      //throw '#TDOO: ' + this.keyword
    //  this.$emit('search', this.keyword)
    //}
  //} // methods
}

export default SearchInput