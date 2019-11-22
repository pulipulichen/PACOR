import props from '../NotificationEvent/propsNotificationEvent.js'
import computed from '../NotificationEvent/computedNotificationEvent.js'
import methods from '../NotificationEvent/methodsNotificationEvent.js'

let EventAnnotationComment = {
  props,
  data: function () {
    this.$i18n.locale = this.config.locale
    return {
    }
  },
  computed: {
    ...computed
  },
  methods: {
    ...methods
  }
}

EventAnnotationComment.computed.action = function () {
  // @TODO 現在還沒有回覆指定標註的功能
  return this.$t('Reply your annotation')
}

EventAnnotationComment.computed.summary = function () {
  if (!this.notification.summary) {
    return
  }
  let summary = this.notification.summary.summary
  
  //console.log(summary)
  if (summary.length > 0) {
    summary = summary.slice(0, 20) + this.$t('...')
  }
  return this.$t('"{0}"', [this.notification.summary.summary])
}


EventAnnotationComment.methods.read = function () {
  this.lib.AnnotationPanel.focusComment(this.notification.id)
  //console.log(this.notification)
  //throw new Error('EventAnnotationComment ' + this.notification)
}

export default EventAnnotationComment