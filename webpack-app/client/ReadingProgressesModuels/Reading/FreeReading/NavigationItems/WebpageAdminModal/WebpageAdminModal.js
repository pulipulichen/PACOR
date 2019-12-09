let WebpageAdminModal = {
  props: ['lib', 'status', 'config'],
  data() {    
    this.$i18n.locale = this.config.locale
    
    let contentURL = this.config.baseURL + '/admin#/referer/?url=' + location.href
    //console.log(contentURL)
    return {
      contentURL
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
    show () {
      this.$refs.Modal.show()
    }
  } // methods
}

export default WebpageAdminModal