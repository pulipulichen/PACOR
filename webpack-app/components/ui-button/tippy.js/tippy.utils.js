import $ from 'jquery'
import tippy from './tippy.webpack.js'

let tippyUtils = {}

tippyUtils.popupUser = function (_this, user, event) {

  let element = $(event.target)
  if (element.hasClass('user-container') === false) {
    element = element.parents('.user-container:first')
  }

  let className = element.prop('className')
  //console.log(element.classList.value.indexOf('username'))

  if (className.indexOf('popup-user-inited') > -1) {
    return false
  }

  _this.popup = tippy(element[0], {
    theme: 'tippy-semantic-ui-popup',
    content: this._buildPopupContent(_this, user),
    //content: this.$refs.popup,
    boundary: element.parents('.annotation-list:first')[0],
    trigger: 'click',
    interactive: true
  })
  _this.popup.show()
  element.addClass('popup-user-inited')
}

tippyUtils._buildPopupContent = function (_this, user) {
  let username = _this.lib.auth.getUsername(user)
  let avatarURL = user.avatar_url

  let element = $(`<div class="user-popup">
    <img src="${avatarURL}" class="user-avatar" />
    ${username}
    <button type="button" class="ui compact mini positive button">${_this.$t('Assist')}</button>
</div>`)

  element.find('button').click(() => {
    //console.log(user)
    _this.status.filter.focusUser = user
    _this.popup.hide()
  })

  return element[0]
}

export default tippyUtils