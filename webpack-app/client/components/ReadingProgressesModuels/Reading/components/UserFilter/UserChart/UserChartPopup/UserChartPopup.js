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
        hoverable: true,
        distanceAway: -10,
        position: 'top center',
        //duration: 0,
        exclusive: true,
        on: "click"
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
      if (!this.filterData.chart.userJSON) {
        return 0
      }
      
      let count = this.filterData.chart.userJSON[this.popupFocusText]
      if (!count) {
        count = 0
      }
      return count
    },
    popupOtherCount () {
      let count
      let text = this.popupFocusText
      if (this.otherIsAll && this.filterData.chart.allJSON) {
        count = this.filterData.chart.allJSON[text]
      }
      else if (!this.otherIsMe && this.filterData.chart.otherJSONMap) {
        let userID = this.filterData.selectUser.id
        if (this.filterData.chart.otherJSONMap[userID]) {
          count = this.filterData.chart.otherJSONMap[userID][text]
        }
      }
      
      if (!count) {
        count = 0
      }
      return count
    }
  },
//  watch: {
//  },
//  mounted() {
//  },
  methods: {
    initPopup: function (ele) {
      this.popupFocusText = ele.innerText.trim()
      
      let $ele = $(ele)
      
      if ($ele.attr('data-popup-inited') !== undefined) {
        return null
      }
      
      $ele.popup(this.popupOptions)
      $ele.attr('data-popup-inited', true)
      $ele.click()
    },
    onPopupClick () {
      //throw new Error('Search: ' + this.popupFocusText)
      this.status.search.keyword = this.popupFocusText
      this.lib.UserFilter.hide()
      
      // 先設定篩選條件
      this.lib.AnnotationPanel.findKeyword(this.status.search.keyword)
      
      // 再來顯示
      this.lib.AnnotationPanel.setAnchorPositions()
    }
  } // methods
}

export default UserChartPopup