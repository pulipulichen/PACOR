let Pagination = {
  props: ['pageConfig'],
  data() {
    return {
    }
  },
  methods: {
    changePage: function (i) {
      //console.log(i, this.pageConfig.page)
      if (i === this.pageConfig.page) {
        return false
      }
      this.pageConfig.page = i
    },
  } // methods
}

export default Pagination