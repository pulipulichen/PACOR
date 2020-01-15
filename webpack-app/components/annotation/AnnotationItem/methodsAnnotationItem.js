import $ from 'jquery'

export default function (AnnotationItem) {
  AnnotationItem.methods.popupUser = function (user, event) {

    let element = $(event.target)
    if (element.hasClass('user-container') === false) {
      element = element.parents('.user-container:first')
    }

    let className = element.prop('className')
    //console.log(element.classList.value.indexOf('username'))

    if (className.indexOf('popup-user-inited') > -1) {
      return false
    }

    /*
     element
     .popup({
     popup : $(this.$refs.popup),
     on    : 'click',
     inline: true,
     boundary: this.$refs.AnnotationList
     })
     .popup('show')
     */
    
    this.popup = this.lib.tippy(element[0], {
      theme: 'tippy-semantic-ui-popup',
      content: this._buildPopupContent(user),
      //content: this.$refs.popup,
      boundary: element.parents('.annotation-list:first')[0],
      trigger: 'click',
      interactive: true
    })
    this.popup.show()
    element.addClass('popup-user-inited')
    $(this.$refs.popup).show()
  }
  
  AnnotationItem.methods._buildPopupContent = function (user) {
    let username = this.lib.auth.getUsername(user)
    let avatarURL = user.avatar_url
    
    let element = $(`<div class="user-popup">
    <img src="${avatarURL}" class="user-avatar" />
    ${username}
    <button type="button" class="ui compact mini positive button">${this.$t('Assist')}</button>
</div>`)
    
    element.find('button').click(() => {
      //console.log(user)
      this.status.filter.focusUser = user
      this.popup.hide()
    })
    
    return element[0]
  }
}