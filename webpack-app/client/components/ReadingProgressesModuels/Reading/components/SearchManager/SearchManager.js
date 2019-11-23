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
      
      this.lib.AnnotationHelper.filter(query)

      this.count = await this.lib.AxiosHelper.post(url, query)
      
      if (this.status.search.keyword === '') {
        this.count = 0
        return false
      }
    },
    searchAnnotation () {
      
      // 先設定篩選條件
      this.lib.AnnotationPanel.findKeyword(this.status.search.keyword)
      
      // 再來顯示
      this.lib.AnnotationPanel.setAnchorPositions({
        'delete' () {
          this.count--
        }
      })
    }
  } // methods
}

export default SearchInput