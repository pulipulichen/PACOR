let NotificationModal = {
  props: ['lib', 'status', 'config'
    , 'notificationData'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      notifications: [],
      triggerUsers: [],
      
      noOlder: false,
      loadLock: false,
      
      feed: null,
      basetime: null
    }
  },
  components: {}, // EventComponents 會用到
//  computed: {},
//  watch: {},
//  mounted() {},
  methods: {
    show: async function () {
      let result = await this.lib.AxiosHelper.get('/client/UserNotification/fullInit')
      
      if (result === 0) {
        throw new Error('No notification')
        return null
      }
      //console.log(result)
      for (let key in result) {
        //console.log(key)
        this[key] = result[key]
      }
      
      this.$refs.Modal.show()
    },
    hide () {
      this.$refs.Modal.hide()
    },
    
    onScrollList (event) {
      if (this.loadLock === true) {
        event.preventDefault()
        event.stopPropagation()
        //console.log('prevent default')
        return null
      }
      
      let element = event.target
      //console.log(element.scrollTop, this.noMoreOlder, this.noMoreNewer, this.loadLock)
      if (element.scrollHeight - element.scrollTop === element.clientHeight) {
        if (this.noOlder === true) {
          return false
        }
        //console.log('scrolled');
        this.loadOlderNotifications()
      }
    },
    loadOlderNotifications: async function () {
      if (this.loadLock === true) {
        return null
      }
      this.loadLock = true
      
//      let focusComment = this.feed.children('.event:first')
      if (this.notifications.length > 0) {
        this.basetime = parseInt(this.notifications.slice(-1)[0].created_at_unixms, 10)
      }
      
      let data = {
        basetime: this.basetime
      }
      //console.log(this.notificationData.notifications)
      //console.log(data.basetime)
      //return
      //console.log(data)
      
      let notifications = await this.lib.AxiosHelper.get('/client/UserNotification/older', data)
      //console.log(notifications)
      if (notifications.length === 0) {
        this.noOlder = true
        this.loadLock = false
        return null
      }
      
      this.notifications = this.notifications.concat(notifications)
      
      //await this.lib.VueHelper.sleep(100)
      //focusComment[0].scrollIntoView()
      
      await this.lib.VueHelper.sleep(100)
      this.loadLock = false
    },
    afterOnRead () {
      if (typeof(this.hide) === 'function') {
        this.hide()
      }
    } 
  } // methods
}

import EventComponents from './../EventComponents.js'
EventComponents(NotificationModal)

import EventMethods from './../EventMethods.js'
EventMethods(NotificationModal)

export default NotificationModal