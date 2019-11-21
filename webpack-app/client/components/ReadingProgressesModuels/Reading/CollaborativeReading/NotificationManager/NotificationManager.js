let NotificationManager = {
  props: ['lib', 'status', 'config'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
    }
  },
  components: {
  },
  computed: {
    notificationCount () {
      return 0
    }
  },
  watch: {
  },
  mounted() {
  },
  methods: {
  } // methods
}

export default NotificationManager