let NotificationFeed = {
  props: ['lib', 'status', 'config'
    , 'notificationData'],
  data() {    
    //this.$i18n.locale = this.config.locale
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
    eventType (notification) {
      return 'NotificationEvent'  // for test
      
      return 'Event' + notification.model
    }
  } // methods
}

export default NotificationFeed