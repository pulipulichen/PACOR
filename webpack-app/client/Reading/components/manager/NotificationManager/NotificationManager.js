import NotificationModal from './NotificationIcon/NotificationModal/NotificationModal.vue'

let NotificationManager = {
  props: ['lib', 'status', 'config'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      
      afterTime: null,
      timer: null,
      //reloadIntervalSeconds: 30,
      //reloadIntervalSeconds: 1, // for test
      isLoading: false,
      pause: false
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
    },
    updateInterval () {
      return this.lib.auth.currentStepConfig.notification.updateInterval
    }
  },
//  watch: {
//  },
  mounted() {
    this.addFocusBlurEvent()
    this.loadNotificationData()
    
    //this.startReloadData()
  },
  destroyed () {
    this.stopReloadData()
    this.removeFocusBlurEvent()
  },
  methods: {
    addFocusBlurEvent () {
      window.addEventListener('focus', this.focusEvent) 
      window.addEventListener('blur', this.blurEvent)
    },
    removeFocusBlurEvent () {
      window.removeEventListener('focus', this.focusEvent) 
      window.removeEventListener('blur', this.blurEvent)
      this.pause = true
    },
    focusEvent () {
      //return false
      if (this.pause === true) {
        this.pause = false
        this.loadNotificationData()
      }
      //console.log('focus')
    },
    blurEvent () {
      if (this.status.role !== 'reader') {
        return false
      }
      
      this.pause = true
      //console.log('blur')
    },
    
    loadNotificationData: async function () {
      //console.log({isLoading: this.isLoading, pause: this.pause})
      if (this.isLoading === true || this.pause === true) {
        return null
      }
      
      if (this.afterTime 
              && this.lib.DayJSHelper.time() - this.afterTime < this.updateInterval) {
        this.startReloadData()
        return null
      }
      
      this.isLoading = true
      
      //if (this.status.notificationData.unreadNotifications.length > 0) {
      //  this.afterTime = parseInt(this.status.notificationData.unreadNotifications[0].created_at_unixms, 10)
      //}
      
      let query = {
      //  afterTime: this.afterTime
      }
      //console.log(this.isLoading)
      let result = await this.lib.AxiosHelper.get('/client/UserNotification/getNotification', query)
      //if (this.afterTime) {
        //console.log({result})
        //console.log({data})
      //}
      this.startReloadData()
      this.isLoading = false
      this.afterTime = this.lib.DayJSHelper.time()
      
      if (result === 0) {
        return null
      }
      
      
      for (let key in result) {
        this.status.notificationData[key] = result[key]
        
//        if (key === 'unreadNotifications') {
//          if (Array.isArray(this.status.notificationData.unreadNotifications) === false) {
//            this.status.notificationData.unreadNotifications = []
//          }
//          //this.status.notificationData.unreadNotifications = this.status.notificationData.unreadNotifications.concat(result[key])
//          this.status.notificationData.unreadNotifications = result[key]
//          
////          if (result[key].length > 0) {
////            //console.log(parseInt(result[key][0].created_at_unixms, 10), parseInt(result[key].slice(-1)[0].created_at_unixms, 10))
////            this.afterTime = parseInt(result[key].slice(-1)[0].created_at_unixms, 10)
////            //console.log(this.afterTime, typeof(this.afterTime))
////          }
//          //console.log(this.afterTime)
//        }
//        else {
//          this.status.notificationData[key] = result[key]
//        }
      }
      //this.show() // for test 20191123
      
      //result = await this.lib.AxiosHelper.get('/client/UserNotification/fullInit', data)
      //console.log(result)
    },
    startReloadData () {
      if (this.timer) {
        clearTimeout(this.timer)
      }
      let updateInterval = this.updateInterval
      //console.log(updateInterval)
      
      this.timer = setTimeout(() => {
        //console.log('重新讀取')
        if (this.timer === null) {
          //console.log('暫停了')
          return null
        }
        if (this.timer) {
          clearTimeout(this.timer)
        }
        //console.trace('讀了讀了')
        //return
        this.loadNotificationData()
      //}, this.reloadIntervalSeconds * 1000)
      }, updateInterval)
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