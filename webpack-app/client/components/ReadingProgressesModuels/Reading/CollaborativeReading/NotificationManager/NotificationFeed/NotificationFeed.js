import $ from 'jquery'

import EventAnnotationComment from './EventAnnotationComment/EventAnnotationComment.vue'
import EventAnnotationCommentRate from './EventAnnotationCommentRate/EventAnnotationCommentRate.vue'
import EventAnnotationRate from './EventAnnotationRate/EventAnnotationRate.vue'

let NotificationFeed = {
  props: ['lib', 'status', 'config'
    , 'notificationData'],
  data() {    
    //this.$i18n.locale = this.config.locale
    
    let noOlder = false
    if (this.notificationData.notifications.length === 0) {
      noOlder = true
    }
    
    return {
      noOlder: noOlder,
      loadLock: false,
      
      feed: null,
      basetime: null
    }
  },
  components: {
    EventAnnotationComment,
    EventAnnotationCommentRate,
    EventAnnotationRate
  },
//  computed: {
//    basetime () {
//      this.notificationData.notifications[0].created_at_unixms
//    }
//  },
  watch: {
    'notificationData.notifications' () {
      if (this.notificationData.notifications.length < 3) {
        return null
      }
      
      if (!this.basetime) {
        this.scrollToBottom()
      }
      
      this.noOlder = (this.notificationData.notifications.length === 0)
      
      if (Array.isArray(this.notificationData.notifications)
              && this.notificationData.notifications.length > 0) {
        this.basetime = parseInt(this.notificationData.notifications[0].created_at_unixms, 10)
      }
    }
  },
//  mounted() {
//  },
  methods: {
    onScrollList (event) {
      if (this.loadLock === true) {
        event.preventDefault()
        event.stopPropagation()
        //console.log('prevent default')
        return null
      }
      
      let element = event.target
      //console.log(element.scrollTop, this.noMoreOlder, this.noMoreNewer, this.loadLock)
      if (element.scrollTop === 0) {
        if (this.noOlder === true) {
          return false
        }
        //console.log('scrolled');
        this.loadOlderNotifications()
      }
    },
    scrollToBottom: async function () {
      if (this.notificationData.notifications.length < 3) {
        return null
      }
      
      await this.lib.VueHelper.sleep(100)
      //console.log('有捲動嗎？')
      if (!this.feed) {
        this.feed = $(this.$refs.feed)
      }
      
      let event = this.feed.children('.event:last')
      event[0].scrollIntoView()
    },
    loadOlderNotifications: async function () {
      if (this.loadLock === true) {
        return null
      }
      this.loadLock = true
      
      let focusComment = this.feed.children('.event:first')
      
      let data = {
        basetime: this.basetime
      }
      //console.log(this.notificationData.notifications)
      //console.log(data.basetime)
      //return
      
      let notifications = await this.lib.AxiosHelper.get('/client/UserNotification/older', data)
      //console.log(notifications)
      if (notifications.length === 0) {
        this.noOlder = true
        this.loadLock = false
        return null
      }
      
      this.notificationData.notifications = notifications.concat(this.notificationData.notifications)
      
      
      await this.lib.VueHelper.sleep(100)
      focusComment[0].scrollIntoView()
      
      await this.lib.VueHelper.sleep(100)
      this.loadLock = false
    },
    eventType (notification) {
      //return 'NotificationEvent'  // for test
      
      return 'Event' + notification.model
    },
    onRead: async function (notification) {
      let data = {
        id: notification.id
      }
      
      let result = await this.lib.AxiosHelper.get('/client/UserNotification/read', data)
      //console.log(result)
      if (result !== 1) {
        throw new Error(this.$t('Set notification read error'))
      }
      
      notification.has_read = true
      this.notificationData.unreadCount--
    }
  } // methods
}

export default NotificationFeed