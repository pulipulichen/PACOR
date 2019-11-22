let NotificationEvent = {
  props: ['lib', 'status', 'config', 'notification'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
    }
  },
  computed: {
    username () {
      let user = this.notification.triggerUser
      if (typeof(user.displayName) === 'string') {
        return user.displayName
      }
      else {
        return user.username
      }
    },
    action () {
      
    },
    avatar () {
      return this.notification.triggerUser.avatar_url
    },
    displayTime () {
      return this.lib.DayJSHelper.fromNow(this.notification.created_at_unixms)
    },
    summary () {
      return this.notification.summary
    }
  },
  methods: {
    read () {
      throw new Error('read' + this.notification)
    }
  } // methods
}

export default NotificationEvent