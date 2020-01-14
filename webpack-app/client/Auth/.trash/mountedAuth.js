export default function (Auth) {
  Auth.mounted = async function () {
    if (typeof (this.config.username) !== 'string'
            && typeof (this.config.usernameQueryURL) === 'string') {
      this.config.username = await this.loadUsernameFromURL()
    }

    let result = false
    if (typeof (this.config.username) === 'string') {
      result = await this.attemptLoginViaUsername(this.config.username)
    }

    if (result === false) {
      await this.checkLogin()
    }
  }
}