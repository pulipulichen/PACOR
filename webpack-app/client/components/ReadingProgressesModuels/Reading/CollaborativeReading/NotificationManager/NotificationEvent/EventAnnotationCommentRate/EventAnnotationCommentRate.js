import props from '../propsNotificationEvent.js'
import computed from '../computedNotificationEvent.js'
import methods from '../methodsNotificationEvent.js'

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
  //return this.$t('Like your comment: "{0}"', [this.notification.summary.summary])
  return this.$t('Like your comment')
}

EventAnnotationCommentRate.computed.summary = function () {
  if (!this.notification.summary) {
    return
  }
  let summary = this.notification.summary.summary
  return this.$t('"{0}"', [this.notification.summary.summary])
}

EventAnnotationCommentRate.methods.read = function () {
  this.lib.AnnotationPanel.focusComment(this.notification.anchor_model_id)
  this.$emit('read')
}

export default EventAnnotationCommentRate