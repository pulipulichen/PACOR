let Pagination = {
  props: ['pageConfig'],
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
    },
  } // methods
}

export default Pagination