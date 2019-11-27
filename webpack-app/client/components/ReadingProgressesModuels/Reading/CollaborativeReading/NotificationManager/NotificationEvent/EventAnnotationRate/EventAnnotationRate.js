import props from '../NotificationEvent/propsNotificationEvent.js'
import computed from '../NotificationEvent/computedNotificationEvent.js'
import methods from '../NotificationEvent/methodsNotificationEvent.js'

let EventAnnotationRate = {
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

EventAnnotationRate.computed.action = function () {
  return this.$t('Like your annotation')
}

EventAnnotationRate.methods.read = function () {
  this.lib.AnnotationPanel.focusAnnotation(this.notification.summary.annotation_id)
  this.$emit('read')
}

export default EventAnnotationRate