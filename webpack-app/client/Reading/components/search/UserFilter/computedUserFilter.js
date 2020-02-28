export default function (UserFilter) {
  UserFilter.computed.peer = function () {
    //return this.status.filter.focusUser
    return this.filterData.selectUser
  }
  UserFilter.computed.peerIsMe = function () {
//      return (this.status.filter.focusUser 
//              && this.status.filter.focusUser.id === this.status.userID)
    return (this.filterData.selectUser
            && this.filterData.selectUser.id === this.status.userID)
  }
  UserFilter.computed.username = function () {
    if (this.peer) {
      let user = this.peer

      if (typeof (user.displayName) === 'string') {
        return user.displayName
      } else {
        return user.username
      }
    }
  }
  UserFilter.computed.selectUsername = function () {
    if (!this.filterData.selectUser) {
      return undefined
    }

    let user = this.filterData.selectUser

    if (typeof (user.displayName) === 'string') {
      return user.displayName
    } else {
      return user.username
    }
  }
  UserFilter.computed.isSelectAnotherUser = function () {
    if (!this.filterData.selectUser && !this.status.filter.focusUser) {
      return false
    } else if (this.filterData.selectUser) {
      if (!this.status.filter.focusUser) {
        return true
      }
      return (this.filterData.selectUser.id !== this.status.filter.focusUser.id)
    } else if (this.status.filter.focusUser) {
      if (!this.filterData.selectUser) {
        return true
      }
      return (this.filterData.selectUser.id !== this.status.filter.focusUser.id)
    } else if (!this.filterData.selectUser) {
      return false
    }
  }
  UserFilter.computed.isNotSelectAllUser = function () {
    return (this.status.filter.focusUser)
  }
  UserFilter.computed.computedSubmitButtonClassList = function () {
    //if (!this.peerIsMe && this.filterData.selectUser) {
    if (this.filterData.selectUser) {
      return 'green'
    }
  }

}