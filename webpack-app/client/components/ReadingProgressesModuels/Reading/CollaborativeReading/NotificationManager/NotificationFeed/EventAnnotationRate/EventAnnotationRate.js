import NotificationEvent from './../NotificationEvent/NotificationEvent.js'

NotificationEvent.computed.summary = function () {
  return this.notification.model
}

export default NotificationEvent