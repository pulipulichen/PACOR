let AdminModal = {
  props: ['lib', 'status', 'config'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
    }
  },
//  components: {
//  },
  computed: {
  },
  watch: {
  },
  mounted: function () {
    setTimeout(() => {
      this.$refs.Modal.show()
    }, 3000)
  },
  methods: {
  } // methods
}

export default AdminModal