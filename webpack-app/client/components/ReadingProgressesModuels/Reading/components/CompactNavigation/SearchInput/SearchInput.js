let SearchInput = {
  props: ['lib', 'status', 'config'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      keyword: ''
    }
  },
//  components: {
//  },
//  computed: {
//  },
//  watch: {
//  },
//  mounted() {
//  },
  methods: {
    doSearch () {
      throw this.keyword
    }
  } // methods
}

export default SearchInput