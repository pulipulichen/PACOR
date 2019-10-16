let Template = {
  props: ['lib', 'status', 'config', 'progress', 'error', 'view'
    , 'modal-title', 'display-close-icon'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
    }
  },
  components: {
  },
  computed: {
  },
  watch: {
  },
  mounted() {
    this.show()
  },
  methods: {
    getModal: function () {
      return window.$(this.$refs.modal)
    },
    show: function () {
      this.getModal().modal('show')
    },
    hide: function () {
      this.getModal().modal('hide')
    },
  } // methods
}

export default Template