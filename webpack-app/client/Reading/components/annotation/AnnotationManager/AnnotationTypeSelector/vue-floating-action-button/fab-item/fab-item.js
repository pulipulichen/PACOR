import util from './../util'
const Timeout = util.Timeout

export default {
  name: 'fab-item',
  props: {
    idx: {
      type: Number,
      default: 0,
      required: true
    },
    title: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: 'add'
    },
    color: {
      type: String,
      default: null
    },
    btnColor: {
      type: String,
      default: null
    },
    titleColor: {
      type: String,
      default: '#666'
    },
    titleBgColor: {
      type: String,
      default: 'white'
    }
  },
  computed: {
    showItem: function () {
      return (this.$parent.fabMenuAnimate === 'alive' || this.$parent.active) && this.$parent.visible
    },
    /**
     * 根据不同的动画模式处理不同的css
     */
    fabItemStyle: function () {
      let sizePadding = 0
      if (this.$parent.size === 'big') {
        sizePadding = 3
      }
      else if (this.$parent.size === 'small') {
        sizePadding = -3
      }
      
      let backgroundColor = '#FFF'
      if (this.btnColor) {
        backgroundColor = this.btnColor
      }
      
      let baseSize = -4
      if (this.$parent.size === 'big') {
        baseSize = -2
      }
      else if (this.$parent.size === 'normal') {
        baseSize = -3
      }
      
      let animateModel = {
        default: {
          top: ((baseSize - sizePadding) - this.idx * (this.$parent.globalOptions.spacing + sizePadding) ) + 'em',
          transitionDelay: this.$parent.active ? (this.idx * this.$parent.globalOptions.delay) + 's' : '0s',
          background: backgroundColor
        },
        alive: {
          transition: 'all .4s',
          transitionTimingFunction: 'cubic-bezier(.16,1.01,.61,1.2)',
          top: 0,
          transitionDelay: this.$parent.active ? this.idx * (this.$parent.globalOptions.delay / 3) + 's' : '0s',
          opacity: this.$parent.active ? 1 : 0,
          background: backgroundColor,
          transform: this.$parent.active ? 'translate3D(0, -' + (this.idx + 1) * this.$parent.globalOptions.spacing + 'px, 0)' : 'translate3D(0, 0, 0)',
          zIndex: -this.idx
        }
      }
      return animateModel[this.$parent.fabItemAnimate]
    },
    titleStyle: function () {
      let style = {
        color: this.titleColor,
        background: this.titleBgColor
      }
      
      let baseMargin = 1
      if (this.$parent.size === 'big') {
        baseMargin = 3
      }
      else if (this.$parent.size === 'margin') {
        baseMargin = 2
      }
      
      if (this.$parent.position.endsWith('-right')) {
        style.right = baseMargin + `em`
      }
      else {
        style.left = baseMargin + `em`
      }
      
      return style
    },
    transitionName: function () {
      if (this.$parent.transitionEnable === false) {
        return
      }
      return 'fab-item-' + this.$parent.fabItemAnimate
    },
    computedIconColor: function () {
      if (this.btnColor) {
        if (this.color) {
          return this.color
        }
        else {
          return 'white'
        }
      }
      else {
        if (this.color) {
          return this.color
        }
        else {
          return '#999'
        }
      }
    }
  },
  methods: {
    clickItem: function (event) {
      this.$emit('clickItem', {idx: this.idx, event})
      this.handleAutoClose()
    },
    handleAutoClose: async function () {
      if (this.$parent.clickAutoClose) {
        let closeType = this.$parent.clickAutoCloseType
        if (closeType === 'menu') {
          let timeout = new Timeout()
          await timeout.handleTimeout()
          this.$parent.active = false
        }
        else {
          this.$parent.onOffFab(false)
        }
        return true
      } else {
        return false
      }
    }
  },
  created () {
  }
}