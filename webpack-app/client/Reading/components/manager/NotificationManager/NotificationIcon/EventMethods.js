let debugSkipRead = true

if (debugSkipRead === true) {
  console.log('@TEST debugSkipRead')
}

export default (VM) => {
  VM.methods.eventType = function (notification) {
    //return 'NotificationEvent'  // for test

    return 'Event' + notification.trigger_model
  }

  VM.methods.onRead = async function (notification) {
    let data = {
      id: notification.id
    }

    if (debugSkipRead !== true) {
      let result = await this.lib.AxiosHelper.get('/client/UserNotification/read', data)
      //console.log(result)
      if (result !== 1) {
        throw new Error(this.$t('Set notification read error'))
      }
    }

    if (notification.has_read === false) {
      notification.has_read = true
      this.notificationData.unreadCount--
    }
    
    this.afterOnRead(notification)
  }
}