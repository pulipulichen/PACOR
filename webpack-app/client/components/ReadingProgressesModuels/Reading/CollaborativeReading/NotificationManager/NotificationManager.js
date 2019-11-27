import $ from 'jquery'
import NotificationFeed from './NotificationFeed/NotificationFeed.vue'
import NotificationModal from './NotificationModal/NotificationModal.vue'

let NotificationManager = {
  props: ['lib', 'status', 'config'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      notificationData: {
        unreadCount: 0,
        unreadNotifications: [],
        hasNotification: true,
      },
      
      afterTime: null,
      timer: null,
      reloadIntervalSeconds: 30
    }
  },
  components: {
    "notification-feed": NotificationFeed,
    "notification-modal": NotificationModal
  },
  computed: {
//    unreadCount () {
//      return this.notificationData.unreadCount
//    },
    computedBellClassList () {
      if (this.notificationData.unreadCount === 0) {
        return 'disabled'
      }
    }
  },
//  watch: {
//  },
  mounted() {
    this.initNotificationData()
    
    this.startReloadData()
  },
  methods: {
    initNotificationData: async function () {
      let data = {
        afterTime: this.afterTime
      }
      
      let result = await this.lib.AxiosHelper.get('/client/UserNotification/init', data)
      
      this.afterTime = (new Date()).getTime()
      this.startReloadData()
      if (result === 0) {
        return null
      }
      
      for (let key in result) {
        this.notificationData[key] = result[key]
      }
      //this.show() // for test 20191123
    },
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
            this.stopReloadData()
          },
          onHidden: () => {
            this.startReloadData()
          }
      })
//      console.log('initPopup')
      anchor.click()
    },
    startReloadData () {
      this.timer = setTimeout(() => {
        //console.log('重新讀取')
        this.initNotificationData()
      }, this.reloadIntervalSeconds * 1000)
    },
    stopReloadData () {
      clearTimeout(this.timer)
    },
    show () {
      this.$refs.anchor.click()
      //throw new Error('show')
    }
  } // methods
}

export default NotificationManager