let SearchInput = {
  props: ['status', 'lib', 'size'],
  data() {    
    return {
      enableShowList: false,
      //count: 0,
      composition: false
    }
  },
//  components: {
//  },
  computed: {
    count () {
      return this.lib.NumberHelper.parseRoughNumber(this.$t, this.status.search.count)
    },
    computedInputClassList () {
      let classList = []
      if (this.size) {
        classList.push(this.size)
      }
      return classList.join(' ')
    }
  },
  methods: {
    searchAnnotation () {
      this.$emit('search')
      
      // 先設定篩選條件
      this.lib.AnnotationPanel.findKeyword(this.status.search.keyword)
      
      // 再來顯示
      this.lib.AnnotationPanel.setAnchorPositions({
        'delete': () => {
          this.status.search.count--
        }
      })
    }
  } // methods
}

export default SearchInput