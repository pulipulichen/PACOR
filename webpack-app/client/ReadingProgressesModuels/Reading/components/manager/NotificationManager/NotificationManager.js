import NotificationModal from './NotificationIcon/NotificationModal/NotificationModal.vue'

let NotificationManager = {
  props: ['lib', 'status', 'config'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      
      afterTime: null,
      timer: null,
      reloadIntervalSeconds: 30,
      isLoading: false
    }
  },
  components: {
    "notification-modal": NotificationModal
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
//  watch: {
//  },
  mounted() {
    this.initNotificationData()
    
    //this.startReloadData()
  },
  destroyed () {
    this.stopReloadData()
  },
  methods: {
    initNotificationData: async function () {
      if (this.isLoading === true) {
        return null
      }
      this.isLoading = true
      
      let data = {
        afterTime: this.afterTime
      }
      //console.log(this.isLoading)
      let result = await this.lib.AxiosHelper.get('/client/UserNotification/init', data)
      console.log(result)
      this.afterTime = (new Date()).getTime()
      this.startReloadData()
      this.isLoading = false
      if (result === 0) {
        return null
      }
      
      for (let key in result) {
        this.status.notificationData[key] = result[key]
      }
      //this.show() // for test 20191123
      
      //result = await this.lib.AxiosHelper.get('/client/UserNotification/fullInit', data)
      //console.log(result)
    },
    startReloadData () {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        //console.log('重新讀取')
        if (this.timer === null) {
          return null
        }
        clearTimeout(this.timer)
        //console.trace('讀了讀了')
        //return
        this.initNotificationData()
      }, this.reloadIntervalSeconds * 1000)
    },
    stopReloadData () {
      clearTimeout(this.timer)
      this.timer = null
    },
    showFull () {
      this.$refs.NotificationModal.show()
    }
  } // methods
}

export default NotificationManager