import $ from 'jquery'
import tippy from './tippy.webpack.js'

let tippyUtils = {
  tippy
}

tippyUtils.popupUser = function (_this, user, event) {

  let element = $(event.target)
  if (element.hasClass('user-container') === false
          && element.parents('.user-container:first').legnth > 0) {
    element = element.parents('.user-container:first')
  }

  let className = element.prop('className')
  //console.log(element.classList.value.indexOf('username'))

  if (className.indexOf('popup-user-inited') > -1) {
    return false
  }
  
  let contentElement = this._buildPopupContent(_this, user)
  //console.log(_this.status)
  if (user.id === _this.status.userID) {
    contentElement.addClass('is-you')
  }
  else if (_this.status.filter.focusUser) {
      contentElement.addClass('has-focus-user')
  }

  let options = {
    theme: 'tippy-semantic-ui-popup',
    content: contentElement[0],
    //content: this.$refs.popup,
    //boundary: element.parents('.annotation-list:first')[0],
    trigger: 'click',
    interactive: true
  }
  
  let boundary = element.parents('.annotation-list:first')
  if (boundary.length > 0) {
    options.boundary = boundary[0]
  }

  _this.popup = tippy(element[0], options)
  _this.popup.show()
  element.addClass('popup-user-inited')
}

tippyUtils._buildPopupContent = function (_this, user) {
  let username = _this.lib.auth.getUsername(user)
  let avatarURL = user.avatar_url

  let element = $(`<div class="user-popup">
    <img src="${avatarURL}" class="user-avatar" />
    ${username}
    <button type="button" class="assist-submit ui compact mini positive button">${_this.$t('Assist')}</button>
    <button type="button" class="cancel-assist-submit ui compact mini negative button">${_this.$t('Cancel Assist')}</button>
    <button type="button" class="only-you-submit ui compact mini positive button">${_this.$t('Focus yourself')}</button>
</div>`)

  element.find('.assist-submit,.only-you-submit').click(() => {
    //console.log(user)
    _this.status.filter.focusUser = user
    _this.popup.hide()
  })
  
  element.find('.cancel-assist-submit').click(() => {
    //console.log(user)
    _this.status.filter.focusUser = null
    _this.popup.hide()
  })

  return element
}

export default tippyUtils