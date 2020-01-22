import $ from 'jquery'
import NotificationUnreadFeed from './NotificationUnreadFeed/NotificationUnreadFeed.vue'

let NotificationIcon = {
  props: ['lib', 'status', 'config'
    , 'position'],
  data() {    
    this.$i18n.locale = this.config.locale
    
    return {
      inited: false
    }
  },
  components: {
    "notification-unread-feed": NotificationUnreadFeed,
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
    },
    unreadCount () {
      return this.lib.NumberHelper.parseRoughNumber(this.$t, this.notificationData.unreadCount)
    },
    computedContainerClassList () {
      let classList = []
      
      //console.log(this.position)
      if (this.position) {
        classList.push(this.position)
      }
      
      if (this.status.notificationData.hasNotification === false) {
        classList.push('disabled')
      }
      
      return classList.join(' ')
    },
    computedPopupClassList () {
      let classList = []
      
      if (this.lib.style.isLeftHanded) {
        classList.push('left-handed')
      }
      
      return classList.join(' ')
    }
  },
  methods: {
    initPopup () {
      if (this.inited === true || !this.lib.NotificationManager) {
        return false
      }
      
      if (this.status.notificationData.hasNotification === false) {
        return false
      }
      
      let anchor = $(this.$refs.anchor)
      
      let popupOptions = {
          popup: this.$refs.popup,
          inline     : true,
          hoverable  : true,
          on    : 'click',
          distanceAway: 20,
          position: "top right",
          onShow: () => {
            if (this.notificationData.unreadNotifications.length === 0
                    || window.innerHeight < 400) {
              this.showFull()
              return false
            }
            else {
              this.$refs.feed.scrollToBottom()
            }
            this.lib.NotificationManager.stopReloadData()
          },
          onHidden: () => {
            this.lib.NotificationManager.startReloadData()
          }
      }
      
      if (this.lib.style.isLeftHanded) {
        popupOptions.position = 'top left'
      }
      
      anchor.popup(popupOptions)
//      console.log('initPopup')
      anchor.click
      
      this.inited = true
    },
    show () {
      if (this.status.notificationData.hasNotification === false) {
        return false
      }
      this.$refs.anchor.click()
      //throw new Error('show')
    },
    showFull () {
      if (this.status.notificationData.hasNotification === false) {
        return false
      }
      this.lib.NotificationManager.showFull()
    }
  } // methods
}

export default NotificationIcon