import props from '../NotificationEvent/propsNotificationEvent.js'
import computed from '../NotificationEvent/computedNotificationEvent.js'
import methods from '../NotificationEvent/methodsNotificationEvent.js'

let EventAnnotationCommentRate = {
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

EventAnnotationCommentRate.computed.action = function () {
  return this.$t('Like your comment')
}

EventAnnotationCommentRate.methods.read = function () {
  this.lib.AnnotationPanel.focusComment(this.notification.summary.comment_id)
  this.$emit('read')
}

export default EventAnnotationCommentRate