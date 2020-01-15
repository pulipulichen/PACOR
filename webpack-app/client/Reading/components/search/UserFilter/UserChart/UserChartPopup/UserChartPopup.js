import $ from 'jquery'

let UserChartPopup = {
  props: ['lib', 'status', 'config'
    , 'filterData'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      popupFocusText: null,
      boundary: null
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
      let popup = this.$refs.popup
      let isOpened = false
      return {
        popup: popup,
        hoverable: true,
        distanceAway: -10,
        //position: 'top center',
        //duration: 0,
        exclusive: true,
        on: "click",
        onShow: function (...args) {
          //console.log($(popup).popup('is hidden'))
          if (isOpened === true) {
            isOpened = false
            return false
          }
          isOpened = true
        },
        boundary: this.boundary
      }
      // jqcloud-wrapper
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
      //console.log(this.otherIsAll, this.filterData.chart.allJSON)
      if (this.otherIsAll) {
        if (this.filterData.chart.allJSON) {
          count = this.filterData.chart.allJSON[text]
        }
      }
      else if (!this.otherIsMe) {
        if (this.filterData.chart.othersJSONMap) {
          let userID = this.filterData.selectUser.id
          if (this.filterData.chart.othersJSONMap[userID]) {
            count = this.filterData.chart.othersJSONMap[userID][text]
          }
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
    initPopup: async function (ele) {
      this.popupFocusText = ele.innerText.trim()
      
      let $ele = $(ele)
      if ($ele.attr('data-popup-inited') !== undefined) {
        return null
      }
      
      if (!this.boundary) {
        this.boundary = $ele.parents('.jqcloud-container.jqcloud:first')
      }
      
      await this.lib.VueHelper.sleep(10)
      //$ele.popup(this.popupOptions)
      $ele.attr('data-popup-inited', true)
      //$ele.click()
      let popup = $(this.$refs.popup).clone(true)
      popup.css('display', 'block')
      let _this = this
      popup.find('.focus-word').click(() => {
        _this.onPopupClick()
      })
      
      this.lib.tippy.tippy(ele, {
        theme: 'tippy-semantic-ui-popup',
        content: popup[0],
        trigger: 'click',
        interactive: true,
        boundary: this.boundary
      }).show()
    },
    onPopupClick () {
      this.$parent.$parent.hide()
      
      //throw new Error('Search: ' + this.popupFocusText)
      this.status.search.keyword = this.popupFocusText
      
      
      // 先設定篩選條件
      this.lib.AnnotationPanel.findKeyword(this.status.search.keyword)
      
      // 再來顯示
      this.lib.AnnotationPanel.setAnchorPositions()
    }
  } // methods
}

export default UserChartPopup