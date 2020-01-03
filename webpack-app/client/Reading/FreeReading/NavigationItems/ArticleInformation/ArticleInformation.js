let ArticleInformation = {
  props: ['lib', 'status', 'config'],
  data() {    
    this.$i18n.locale = this.config.locale
  },
//  components: {
//  },
  methods: {
    show () {
      this.$refs.Modal.show()
    },
  } // methods
}

export default ArticleInformation