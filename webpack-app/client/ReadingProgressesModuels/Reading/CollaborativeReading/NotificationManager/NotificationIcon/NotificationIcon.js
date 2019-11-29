import $ from 'jquery'
import NotificationFeed from './NotificationFeed/NotificationFeed.vue'

let NotificationIcon = {
  props: ['lib', 'status', 'config'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
    }
  },
  components: {
    "notification-feed": NotificationFeed,
  },
  computed: {
    notificationData () {
      return this.status.notificationData
    },
//    unreadCount () {
//      return this.notificationData.unreadCount
//    },
    computedBellClassList () {
      if (this.notificationData.unreadCount === 0) {
        return 'disabled'
      }
    }
  },
  methods: {
    initPopup () {
      let anchor = $(this.$refs.anchor)
      
      anchor.popup({
          popup: this.$refs.popup,
          inline     : true,
          hoverable  : true,
          on    : 'click',
          distanceAway: 20,
          position: "top center",
          onShow: () => {
            if (this.notificationData.unreadNotifications.length === 0) {
              this.showFull()
              return false
            }
            this.stopReloadData()
          },
          onHidden: () => {
            this.startReloadData()
          }
      })
//      console.log('initPopup')
      anchor.click()
    },
    show () {
      this.$refs.anchor.click()
      //throw new Error('show')
    },
    showFull () {
      this.lib.NotificationManager.showFull()
    }
  } // methods
}

export default NotificationIcon