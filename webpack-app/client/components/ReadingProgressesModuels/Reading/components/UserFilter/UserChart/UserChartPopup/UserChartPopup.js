let UserChartPopup = {
  props: ['lib', 'status', 'config'
    , 'filterData'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      popupFocusText: null
    }
  },
//  components: {
//  },
  computed: {
    otherIsAll () {
      return (!this.filterData.selectUser)
    },
    otherIsMe () {
      return (this.filterData.selectUser
              && this.filterData.selectUser.id === this.status.userID)
    },
    popupOptions () {
      return {
        popup: this.$refs.popup,
        hoverable: true
      }
    },
    myAvatar () {
      return this.status.avatar
    },
    myUsername () {
      let user = this.status
      if (typeof(user.displayName) === 'string') {
        return user.displayName
      }
      else {
        return user.username
      }
    },
    otherAvatar () {
      return this.filterData.selectUser.avatar_url
    },
    otherUsername () {
      let user = this.filterData.selectUser
      if (typeof(user.display_name) === 'string') {
        return user.display_name
      }
      else {
        return user.username
      }
    },
    popupMyCount () {
      let count = this.userJSON[this.popupFocusText]
      if (!count) {
        count = 0
      }
      return count
    },
    popupOtherCount () {
      let count
      let text = this.popupFocusText
      if (this.otherIsAll) {
        count = this.allJSON[text]
      }
      else if (!this.otherIsMe) {
        let userID = this.filterData.selectUser.id
        count = this.otherJSONMap[userID][text]
      }
      
      if (!count) {
        count = 0
      }
      return count
    }
  },
//  watch: {
//  },
  mounted() {
  },
  methods: {
    initPopup: function (ele) {
      this.popupFocusText = ele.innerText.trim()
      
      let $ele = $(ele)
      
      if ($ele.hasAttr('data-popup-inited') === true) {
        return null
      }
      
      $ele.popup(this.popupOptions)
      $ele.attr('data-popup-inited', true)
    },
    onPopupClick () {
      throw new Error('Search: ' + this.popupFocusText)
    }
  } // methods
}

export default UserChartPopup