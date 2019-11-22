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
  mounted() {
    this.initNotificationData()
    
    //console.log('@TODO 自動重新讀取notification data的功能還沒做')
    this.startReloadData()
  },
  methods: {
    initNotificationData: async function () {
      let data = {
        afterTime: this.afterTime
      }
      
      let result = await this.lib.AxiosHelper.get('/client/UserNotification/init', data)
      
      this.afterTime = (new Data()).getTime()
      if (result === 0) {
        return null
      }
      
      //console.log(result)
      //console.log(result.notifications[0].triggerUser)
      for (let key in result) {
        this.notificationData[key] = result[key]
      }
    },
    initPopup () {
      let anchor = $(this.$refs.anchor)
      
      anchor.popup({
          popup: this.$refs.popup,
          inline     : true,
          hoverable  : true,
          on    : 'click',
          distanceAway: 20,
          onVisible: () => {
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