export default function (UserFilter) {
  UserFilter.methods.show = function () {
    if (this.status.filter.focusUser) {
      this.filterData.selectUser = this.status.filter.focusUser
    }
    //console.log(this.filterData.selectUser)

    this.$refs.PeerList.loadInit(peer => {
      if (this.lib.auth.currentStepConfig.UserFilter 
              && this.lib.auth.currentStepConfig.UserFilter.autoSelect) {
        //console.log(peer)
        if (this.status.filter.focusUser) {
          peer = this.status.filter.focusUser
        }
        this.filterData.selectUser = peer
      }
    })
    this.$refs.UserChart.loadInit()

    this.$refs.Modal.show(() => {
      this.checkTutorialAutoStart()
      this.$emit('show')
    })
    
  }
  UserFilter.methods.selectUser = function (id) {
    //console.log(id)
    this.filterData.tempSelectUserID = id
    this.show()
  }
  UserFilter.methods.hide = function () {
    this.$refs.Modal.hide()
    //console.log('有hide嗎？')
  }
  
  UserFilter.methods.submit = function () {
    if (this.filterData.selectUser 
            && this.filterData.selectUser !== this.status.filter.focusUser) {
      this.status.filter.focusUser = this.filterData.selectUser
    } else {
      this.status.filter.focusUser = null
    }
    //console.log(this.filterData.selectUser)

    this.$refs.Modal.hide()
  }
  UserFilter.methods.submitShowAll = function () {
    this.filterData.selectUser = null
    this.status.filter.focusUser = null
    this.$refs.Modal.hide()
  }
  UserFilter.methods.startUserFilterTutorial = function () {
    console.error('@TODO startUserFilterTutorial')
  }
}