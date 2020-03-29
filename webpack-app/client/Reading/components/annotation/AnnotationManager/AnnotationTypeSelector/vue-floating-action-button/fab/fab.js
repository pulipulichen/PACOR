import util from './../util'

const handleClass = util.handleClass

let fab = {
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
    mainColor: {
      type: String,
      default: '#FFFFFF'
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
      default: function () {
        let spacing = 1
        if (this.size === 'big') {
          spacing = 2
        }
        else if (this.size === 'normal') {
          spacing = 1.5
        }
          
        return {
          spacing,
          delay: 0
        }
      }
    },
    autoHideDirection: {
      type: String,
      default: 'all'
    },
    disablePrimaryActionButton: {
      type: Boolean,
      default: false
    },
    verticalMargin: {
      type: String,
      default: '10%'
    },
    horizontalMargin: {
      type: String,
      default: function () {
        let baseMargin = '1em'
        if (this.size === 'big') {
          return `calc(5em + ${baseMargin})`
        }
        else if (this.size === 'normal') {
          return `calc(4em + ${baseMargin})`
        }
        else if (this.size === 'small') {
          return `calc(3em + ${baseMargin})`
        }
      }
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
        return undefined
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
        color: this.mainColor,
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
        return undefined
      }
      return 'fab-' + this.fabAutoHideAnimateModel
    },
    computedFabMainContainerClassList () {
      // {hidden: isInitHidden, 'semantic-ui': (iconType === 'SemanticUI')}
      let classList = []
      
      if (this.isInitHidden) {
        classList.push('hidden')
      }
      
      if (this.iconType === 'SemanticUI') {
        classList.push('semantic-ui')
      }
      
      if (this.disablePrimaryActionButton) {
        classList.push('disable-primary-action-button')
      }
      
      return classList.join(' ')
    }
  },
  methods: {},  // 轉移到 methdosFab
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

import methdosFab from './methdosFab.js'
methdosFab(fab)

export default fab