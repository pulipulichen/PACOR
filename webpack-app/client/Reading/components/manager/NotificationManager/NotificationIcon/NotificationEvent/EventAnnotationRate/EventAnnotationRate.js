import props from '../propsNotificationEvent.js'
import computed from '../computedNotificationEvent.js'
import methods from '../methodsNotificationEvent.js'

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
  //return this.$t('Like your annotation: "{0}"', [this.notification.summary.summary])
  return this.$t('Like your annotation')
}

EventAnnotationRate.computed.summary = function () {
  if (!this.notification.summary) {
    return undefined
  }
  let summary = this.notification.summary.summary
  return this.$t('"{0}"', [this.notification.summary.summary])
}

EventAnnotationRate.methods.read = function () {
  this.lib.AnnotationPanel.focusAnnotation(this.notification.anchor_model_id)
  this.$emit('read')
}

export default EventAnnotationRate