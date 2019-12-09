let WebpageAdminModal = {
  props: ['lib', 'status', 'config'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      contentURL: this.config.baseURL + '/admin'
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