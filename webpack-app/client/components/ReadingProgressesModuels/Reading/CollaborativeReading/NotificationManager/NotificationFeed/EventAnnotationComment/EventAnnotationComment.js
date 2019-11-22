import EventAnnotationComment from './../NotificationEvent/NotificationEvent.js'

EventAnnotationComment.computed.action = function () {
  // @TODO 現在還沒有回覆指定標註的功能
  return this.$t('Reply your annotation')
}

EventAnnotationComment.computed.summary = function () {
  let summary = this.notification.summary.summary
  if (summary.length > 0) {
    summary = summary.slice(0, 20) + $t('...')
  }
  return this.$t('"{0}"', [this.notification.summary.summary])
}


EventAnnotationComment.methods.read = function () {
  throw new Error('EventAnnotationComment ' + this.notification)
}

export default EventAnnotationComment