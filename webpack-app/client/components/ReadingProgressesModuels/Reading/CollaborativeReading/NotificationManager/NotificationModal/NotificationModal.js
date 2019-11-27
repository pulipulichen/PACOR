let NotificationModal = {
  props: ['lib', 'status', 'config'
    , 'notificationData'],
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
  },
  methods: {
    show () {
      this.$refs.Modal.show()
    },
    hide () {
      this.$refs.Modal.hide()
    }
  } // methods
}

export default NotificationModal