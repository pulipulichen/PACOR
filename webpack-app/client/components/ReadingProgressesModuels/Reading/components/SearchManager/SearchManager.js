let SearchInput = {
  props: ['status', 'lib'],
  data() {    
    return {
      enableShowList: false,
      count: 0,
      composition: false
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
      
      if (this.status.search.keyword === '') {
        this.count = 0
        return false
      }
    }
  },
//  mounted() {
//  },
//  methods: {
//  } // methods
}

export default SearchInput