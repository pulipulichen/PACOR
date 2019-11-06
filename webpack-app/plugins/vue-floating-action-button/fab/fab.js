import util from './../util'

const handleClass = util.handleClass

export default {
  name: 'vue-fab',
  props: {
    /**
     * Options: 'bottom-left', 'bottom-right', 'top-left','top-right'
     */
    position: {
      type: String,
      default: 'bottom-right'
    },
    icon: {
      type: String,
      default: 'add'
    },
    mainBtnColor: {
      type: String,
      default: '#E64C3B'
    },
    activeIcon: {
      type: String,
      //default: 'add'
      default: null
    },
    iconType: {
      type: String,
      default: 'MaterialDesign'
    },
    shadow: {
      type: Boolean,
      default: true
    },
    autoHideThreshold: { // 滚动触发自动隐藏阈值
      type: Number,
      default: 50
    },
    fabAutoHideAnimateModel: {
      type: String,
      default: 'default'
    },
    fabItemAnimate: {
      type: String,
      default: 'default'
    },
    size: { // 尺寸 big/normal/small
      type: String,
      default: 'normal'
    },
    clickAutoClose: {
      type: Boolean,
      default: true
    },
    clickOutsideCloseMenu: {
      type: Boolean,
      default: true
    },
    deactiveAutoClose: {
      type: Boolean,
      default: false
    },
    activeIconRotate: {
      type: Boolean,
      default: true
    },
    clickAutoCloseType: {
      type: String,
      default: 'menu' // menu , fab
    },
    fabAnimateBezier: {
      type: String,
      default: 'linear'
    },
    fabAliveAnimateBezier: {
      type: String,
      default: '.16,1.01,.61,1.2'
    },
    zIndex: {
      type: Number,
      default: 5
    },
    scrollAutoHide: {
      type: Boolean,
      default: true
    },
    scrollAutoShow: {
      type: Boolean,
      default: true
    },
    hideOnStart: {
      type: Boolean,
      default: false
    },
    autoOpenMenu: {
      type: Boolean,
      default: false
    },
    transitionEnable: {
      type: Boolean,
      default: true
    },
    globalOptions: {
      type: Object,
      default: () => {
        return {
          spacing: 40,
          delay: 0
        }
      }
    },
    autoHideDirection: {
      type: String,
      default: 'all'
    },
    verticalMargin: {
      type: String,
      default: '10%'
    },
    horizontalMargin: {
      type: String,
      default: '20%'
    },
  },
  data () {
    return {
      handleClass: handleClass,
      active: false,
      scrollTop: 0,
      visible: true,
      scrollDirection: null, // 滚动方向 up/down
      changeDirectionScrollTop: 0, // 改变滚动方向时距离顶部的位置
      isInitHidden: false,  // 額外加上去的東西
      touchEventInfo: {
        startY: 0,
        offsetY: 0
      }
    }
  },
  watch: {
    active: function (val) {
      if (val === false && this.deactiveAutoClose === true) {
        this.onOffFab(false)
      }
    },
    visible: function (val) {
      //console.log(val, this.active)
      if (!val && this.active) {
        this.active = false
      }
      
      //console.log(this.autoOpenMenu, val, this.active)
      /*
      if (this.autoOpenMenu === true && val === true) {
        setTimeout(() => {
          this.openMenuForce()
        }, 200)
      }
      */
    }
  },
  computed: {
    computedStyle: function () {
      switch (this.position) {
        case 'bottom-right': 
          return {
            'bottom': this.verticalMargin,
            'right': this.horizontalMargin
          }
          break
        case 'bottom-left': 
          return {
            'bottom': this.verticalMargin,
            'left': this.horizontalMargin
          }
          break
        case 'top-right': 
          return {
            'top': this.verticalMargin,
            'right': this.horizontalMargin
          }
          break
        case 'top-left': 
          return {
            'bottom': this.verticalMargin,
            'right': this.horizontalMargin
          }
          break
      }
      
      
    },
    computedTransitionName: function () {
      if (this.transitionEnable === false
              || this.activeIconRotate === false) {
        return
      }
      
      if (this.activeIcon === this.icon) {
        return 'fab-icon'
      } else {
        return this.active ? 'fab-active-icon' : 'fab-icon'
      }
    },
    computedSemanticUIIconClass: function () {
      let icon
      if (this.active) {
        // 啟動的時候
        if (this.activeIcon !== null) {
          icon = this.activeIcon
        }
        else {
          icon = this.icon
        }
      }
      else {
        icon = this.icon
      }
      //console.log(icon, this.activeIcon, this.icon)
      if (this.active === true) {
        icon = 'fab-active ' + icon
      }
      if (this.activeIconRotate === false) {
        icon = 'disable-rotate ' + icon
      }
      
      return icon + ' icon'
    },
    overflowThreshold: function () {
      // 滑动不超过阈值
      return (Math.abs(this.touchEventInfo.offsetY) > this.autoHideThreshold)
    },
    fabClass: function () {
      return {
        transitionTimingFunction: /,/.test(this.fabAnimateBezier) ? `cubic-bezier(${this.fabAnimateBezier})` : this.fabAnimateBezier,
        zIndex: this.zIndex,
        background: this.mainBtnColor,
        boxShadow: this.shadow ? '0px 2px 8px #666' : '',
      }
    },
    // 是否无需改变隐藏状态
    notChangeHideStatus: function () {
      if (this.autoHideDirection === 'up') {
        return (this.scrollDirectionUpAndHidden || this.scrollDirectionDownAndShow)
      } else if (this.autoHideDirection === 'down') {
        return (this.scrollDirectionUpAndShow || this.scrollDirectionDownAndHidden)
      }
      else {
        return false
      }
    },
    scrollDirectionUpAndHidden: function () {
      return this.scrollDirection === 'up' && this.visible === true
    },
    scrollDirectionDownAndShow: function () {
      return this.scrollDirection === 'down' && this.visible === false
    },
    scrollDirectionUpAndShow: function () {
      return this.scrollDirection === 'up' && this.visible === false
    },
    scrollDirectionDownAndHidden: function () {
      return this.scrollDirection === 'down' && this.visible === true
    },
    transitionName: function () {
      if (this.transitionEnable === false) {
        return
      }
      return 'fab-' + this.fabAutoHideAnimateModel
    }
  },
  methods: {
    clickoutside: function (e) {
      if (this.clickOutsideCloseMenu === true) {
        this.active = false
      }
    },
    /**
     * @method testPCMobile 判断用户设备信息 PC/Mobile
     * @return { Boolean } true(Mobile)/false(PC)
     */
    testPCMobile: function () {
      if (navigator.userAgent.match(/Android/i) ||
        navigator.userAgent.match(/webOS/i) ||
        navigator.userAgent.match(/iPhone/i) ||
        navigator.userAgent.match(/iPad/i) ||
        navigator.userAgent.match(/iPod/i) ||
        navigator.userAgent.match(/BlackBerry/i) ||
        navigator.userAgent.match(/Windows Phone/i)
      ) {
        return true
      } else {
        return false
      }
    },
    /**
     * @method onOffFab 显示隐藏Fab
     * @param { Boolean } onOff 是否显示Fab
     */
    onOffFab: function (onOff) {
      this.visible = onOff
      //console.log(this.autoOpenMenu, val, this.active)
      if (this.autoOpenMenu === true && onOff === true) {
        setTimeout(() => {
          this.openMenuForce()
        }, 0)
      }
    },
    /**
     * @method openMenu 打开或关闭菜单
     */
    openMenu: function () {
      if (this.$children.length > 1) {
        //console.trace('openMenu', this.active)
        this.active = !this.active
        if (this.active === true) {
          this.$emit('clickMainBtn')
        }
      }
    },
    openMenuForce: function () {
      if (this.$children.length > 1) {
        //console.trace('openMenu', this.active)
        this.active = true
      }
    },
    recordScrollTopByChangeDirection: function (_scrollTop) {
      let direction = this.checkDirection(_scrollTop)
      this.scrollTop = _scrollTop
      if (this.scrollDirection !== direction) {
        this.changeDirectionScrollTop = _scrollTop
        this.scrollDirection = direction
      }
    },
    /**
     * @method scrollerEventListener 监听滚动事件
     */
    scrollerEventListener: function () {
      //console.log(this.visible, this.scrollAutoShow, this.scrollAutoHide)
      if (this.visible === false && this.scrollAutoShow === false) {
        return false
      }
      else if (this.visible === true && this.scrollAutoHide === false) {
        return false
      }
      
      let _scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      this.recordScrollTopByChangeDirection(_scrollTop)
      // 偏移量等于当前距离顶部距离与改变方向时记录距离顶部距离值的差
      let offset = Math.abs(_scrollTop - this.changeDirectionScrollTop)
      if (this.computedOffsetOver(offset)) {
        return false
      }
      if (this.notChangeHideStatus) {
        return false
      }
      // 偏移量
      this.visible = this.computedShowHideByOffset()
      return true
    },
    computedOffsetOver: function (offset) {
      return (offset < this.autoHideThreshold)
    },
    computedShowHideByOffset () {
      if (this.autoHideDirection === 'all') {
        return false
      }
      else {
        return this.scrollDirection === this.autoHideDirection
      }
    },
    /**
     * @method checkDirection 检测滚动方向
     * @return { String } up/down
     */
    checkDirection: function (_scrollTop) {
      return _scrollTop > this.scrollTop ? 'up' : 'down'
    },
    removeScrollAutoHideListener: function () {
      document.removeEventListener('scroll', this.scrollerEventListener)
    },
    listenTouchEvent: function () {
      document.addEventListener('touchstart', this.listenTouchStart)
      document.addEventListener('touchmove', this.listenTouchMove)
    },
    removeTouchEvent: function () {
      document.removeEventListener('touchstart', this.listenTouchStart)
      document.removeEventListener('touchmove', this.listenTouchMove)
    },
    listenTouchStart: function (e) {
      this.touchEventInfo.startY = e.touches[0].clientY
    },
    listenTouchMove: function (e) {
      this.touchEventInfo.offsetY = e.touches[0].clientY - this.touchEventInfo.startY
      if (!this.overflowThreshold) {
        return false
      }
      if (this.touchEventInfo.offsetY > 0) {
        this.visible = this.autoHideDirection !== 'up'
      } else {
        this.visible = this.autoHideDirection === 'up'
      }
      this.touchEventInfo.offsetY = 0
    },
    // 根据PC还是移动端以及是否启用自动 隐藏来卸载不同的事件监听函数
    unloadEvent: function () {
      if (this.scrollAutoHide || this.scrollAutoShow) {
        if (this.testPCMobile()) {
          this.removeTouchEvent()
        } else {
          this.removeScrollAutoHideListener()
        }
      }
    },
    initTouchEvent: function () {
      // 区分PC和移动端 使用不同的动画交互方式
      if (this.scrollAutoHide || this.scrollAutoShow) {
        if (this.testPCMobile()) {
          this.listenTouchEvent()
        } else {
          document.addEventListener('scroll', this.scrollerEventListener)
        }
      }
    }
  },
  mounted () {
    
    if (this.hideOnStart === true) {
      this.isInitHidden = true
      this.onOffFab(false)
      setTimeout(() => {
        this.isInitHidden = false
      }, 500)
    }
    else {
      if (this.autoOpenMenu === true) {
        this.openMenu()
      }
    }
    
    this.initTouchEvent()
  },
  activated () {
    this.initTouchEvent()
  },
  destroyed () {
    this.unloadEvent()
  },
  deactivated () {
    this.unloadEvent()
  }
}