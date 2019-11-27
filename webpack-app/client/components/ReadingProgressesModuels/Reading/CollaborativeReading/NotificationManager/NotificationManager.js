import $ from 'jquery'
import NotificationFeed from './NotificationFeed/NotificationFeed.vue'

let NotificationManager = {
  props: ['lib', 'status', 'config'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      notificationData: {
        unreadCount: 0,
        hasNotifications: true,
      },
      
      afterTime: null,
      timer: null,
      reloadIntervalSeconds: 30
    }
  },
  components: {
    "notification-feed": NotificationFeed
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
    
    //console.log('@TODO 自動重新讀取notification data的功能還沒做')
    //this.startReloadData()
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
      
      this.notificationData.unreadCount = result.unreadCount
      this.notificationData.hasNotifications = result.hasNotifications
      
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