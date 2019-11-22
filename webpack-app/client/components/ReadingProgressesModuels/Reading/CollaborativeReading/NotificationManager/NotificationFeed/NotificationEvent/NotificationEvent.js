let NotificationEvent = {
  props: ['lib', 'status', 'config', 'notification'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
    }
  },
//  components: {
//  },
  computed: {
    avatar () {
      return this.notification.triggerUser.avatar_url
    },
    displayTime () {
      return this.lib.DayJSHelper.fromNow(this.notification.created_at_unixms)
    },
    summary () {
      return `<a>Helen Troy</a> added 2 photos`
    }
  },
//  watch: {
//  },
//  mounted() {
//  },
  methods: {
    read () {
      throw new Error('read')
    }
  } // methods
}

export default NotificationEvent