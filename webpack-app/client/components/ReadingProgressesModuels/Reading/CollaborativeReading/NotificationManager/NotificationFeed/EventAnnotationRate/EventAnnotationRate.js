import props from '../NotificationEvent/propsNotificationEvent.js'
import data from '../NotificationEvent/dataNotificationEvent.js'
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
  throw new Error('EventAnnotationRate ' + this.notification)
}

export default EventAnnotationRate