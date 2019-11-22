import EventAnnotationRate from './../NotificationEvent/NotificationEvent.js'

EventAnnotationRate.computed.action = function () {
  return this.$t('Like your annotation')
}

EventAnnotationRate.methods.read = function () {
  throw new Error('EventAnnotationRate ' + this.notification)
}

export default EventAnnotationRate