export default {
  username() {
    let user = this.notification.triggerUser
    if (typeof (user.displayName) === 'string') {
      return user.displayName
    } else {
      return user.username
    }
  },
  action() {

  },
  avatar() {
    return this.notification.triggerUser.avatar_url
  },
  displayTime() {
    return this.lib.DayJSHelper.fromNow(this.notification.created_at_unixms)
  },
  summary() {
    return
  },
  computedEventClassList () {
    let classList = []
    if (this.notification.has_read === true) {
      //console.log(this.notification)
      classList.push('has-read')
    }
    //classList.push('has-read')
    //console.log(classList)
    return classList.join(' ')
  }
}