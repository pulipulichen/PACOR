import $ from 'jquery'
import NotificationFeed from './NotificationFeed/NotificationFeed.vue'

let NotificationManager = {
  props: ['lib', 'status', 'config'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      notificationData: {
        unreadCount: 0,
        notifications: []
      }
    }
  },
  components: {
    "notification-feed": NotificationFeed
  },
  computed: {
    notificationCount () {
      return this.notificationData.unreadCount
    },
    computedBellClassList () {
      if (this.notificationCount === 0) {
        return 'disabled'
      }
    }
  },
//  watch: {
//  },
//  mounted() {
//  },
  methods: {
    initPopup () {
      let anchor = $(this.$refs.anchor)
      
      anchor.popup({
          popup: this.$refs.popup,
          inline     : true,
          hoverable  : true,
          on    : 'click'
      })
//      console.log('initPopup')
      anchor.click()
    },
    show () {
      this.$refs.anchor.click()
      //throw new Error('show')
    }
  } // methods
}

export default NotificationManager