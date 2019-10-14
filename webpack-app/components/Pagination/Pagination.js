let Pagination = {
  props: ['pageConfig', 'pathPrefix'],
  data() {
    return {
    }
  },
  methods: {
    changePage: function (i) {
      if (i === this.pageConfig.page) {
        return false
      }
      this.pageConfig.page = i
      this.$router.push(this.pathPrefix + i)
    },
  } // methods
}

export default Pagination