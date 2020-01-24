let Pagination = {
  props: ['pageConfig', 'buildPageLink'],
  data() {
    return {
    }
  },
  methods: {
    changePage: function (i, event) {
      event.stopPropagation()
      event.preventDefault()
      
      //console.log(i, this.pageConfig.page)
      if (i === this.pageConfig.page) {
        return false
      }
      this.pageConfig.page = i
    },
    pageLink(i) {
      if (typeof(this.buildPageLink) === 'function') {
        return this.buildPageLink(i)
      }
      else {
        return undefined
      }
    }
  } // methods
}

export default Pagination