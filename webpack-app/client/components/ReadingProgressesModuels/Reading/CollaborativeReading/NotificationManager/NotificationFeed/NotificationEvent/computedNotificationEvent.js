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
    return this.notification.summary
  }
}