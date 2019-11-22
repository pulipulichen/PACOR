import NotificationEvent from './../NotificationEvent/NotificationEvent.js'

NotificationEvent.computed.action = function () {
  // @TODO 現在還沒有回覆指定標註的功能
  return this.$t('Reply your annotation')
}

NotificationEvent.computed.summary = function () {
  let summary = this.notification.summary.summary
  if (summary.length > 0) {
    summary = summary.slice(0, 20) + $t('...')
  }
  return this.$t('"{0}"', [this.notification.summary.summary])
}

export default NotificationEvent