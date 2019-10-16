let Template = {
  props: ['lib', 'status', 'config', 'progress', 'error', 'view'
    , 'modal_title', 'modal_display_close_icon', 'modal_cancal_action'],
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
    setTimeout(() => {
      this.show()
    }, 1000)
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