let ArticleInformation = {
  props: ['lib', 'status', 'config'],
  data() {    
    this.$i18n.locale = this.config.locale
    
    let contentURL = this.config.baseURL + '/admin#/referer/?url=' + location.href
    //console.log(contentURL)
    return {
      contentURL,
      webpage: null
    }
  },
//  components: {
//  },
  methods: {
    show () {
      this.initWebpageDashboard()
      this.$refs.Modal.show()
    },
  } // methods
}

export default ArticleInformation