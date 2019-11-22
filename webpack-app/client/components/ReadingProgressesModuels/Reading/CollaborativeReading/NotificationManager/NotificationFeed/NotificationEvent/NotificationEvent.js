let NotificationEvent = {
  props: ['lib', 'status', 'config', 'notificationData'],
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
  mounted() {
  },
  methods: {
  } // methods
}

export default NotificationEvent