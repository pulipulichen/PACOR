import EventAnnotationCommentRate from './../NotificationEvent/NotificationEvent.js'

EventAnnotationCommentRate.computed.action = function () {
  return this.$t('Like your comment')
}

EventAnnotationCommentRate.methods.read = function () {
  throw new Error('EventAnnotationCommentRate ' + this.notification)
}

export default EventAnnotationCommentRate