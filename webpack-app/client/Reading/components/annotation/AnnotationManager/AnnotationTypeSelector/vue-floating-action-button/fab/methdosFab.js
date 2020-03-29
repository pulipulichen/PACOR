export default function (fab) {
  fab.methods.clickoutside = function (e) {
    if (this.clickOutsideCloseMenu === true) {
      this.active = false
    }
  }
  /**
   * @method testPCMobile 判断用户设备信息 PC/Mobile
   * @return { Boolean } true(Mobile)/false(PC)
   */
  fab.methods.testPCMobile = function () {
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
  }
  /**
   * @method onOffFab 显示隐藏Fab
   * @param { Boolean } onOff 是否显示Fab
   */
  fab.methods.onOffFab = function (onOff) {
    this.visible = onOff
    //console.log(this.autoOpenMenu, val, this.active)
    if (this.autoOpenMenu === true && onOff === true) {
      setTimeout(() => {
        this.openMenuForce()
      }, 0)
    }
  }
  /**
   * @method openMenu 打开或关闭菜单
   */
  fab.methods.openMenu = function () {
    if (this.$children.length > 1) {
      //console.trace('openMenu', this.active)
      this.active = !this.active
      if (this.active === true) {
        this.$emit('clickMainBtn')
      }
    }
  }
  fab.methods.openMenuForce = function () {
    if (this.$children.length > 1) {
      //console.trace('openMenu', this.active)
      this.active = true
    }
  }
  fab.methods.recordScrollTopByChangeDirection = function (_scrollTop) {
    let direction = this.checkDirection(_scrollTop)
    this.scrollTop = _scrollTop
    if (this.scrollDirection !== direction) {
      this.changeDirectionScrollTop = _scrollTop
      this.scrollDirection = direction
    }
  }
  /**
   * @method scrollerEventListener 监听滚动事件
   */
  fab.methods.scrollerEventListener = function () {
    //console.log(this.visible, this.scrollAutoShow, this.scrollAutoHide)
    if (this.visible === false && this.scrollAutoShow === false) {
      return false
    } else if (this.visible === true && this.scrollAutoHide === false) {
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
  }
  fab.methods.computedOffsetOver = function (offset) {
    return (offset < this.autoHideThreshold)
  }
  fab.methods.computedShowHideByOffset = function () {
    if (this.autoHideDirection === 'all') {
      return false
    } else {
      return this.scrollDirection === this.autoHideDirection
    }
  }
  /**
   * @method checkDirection 检测滚动方向
   * @return { String } up/down
   */
  fab.methods.checkDirection = function (_scrollTop) {
    return _scrollTop > this.scrollTop ? 'up' : 'down'
  },
          fab.methods.removeScrollAutoHideListener = function () {
            document.removeEventListener('scroll', this.scrollerEventListener)
          }
  fab.methods.listenTouchEvent = function () {
    document.addEventListener('touchstart', this.listenTouchStart)
    document.addEventListener('touchmove', this.listenTouchMove)
  }
  fab.methods.removeTouchEvent = function () {
    document.removeEventListener('touchstart', this.listenTouchStart)
    document.removeEventListener('touchmove', this.listenTouchMove)
  }
  fab.methods.listenTouchStart = function (e) {
    this.touchEventInfo.startY = e.touches[0].clientY
  },
          fab.methods.listenTouchMove = function (e) {
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
          }
  // 根据PC还是移动端以及是否启用自动 隐藏来卸载不同的事件监听函数
  fab.methods.unloadEvent = function () {
    if (this.scrollAutoHide || this.scrollAutoShow) {
      if (this.testPCMobile()) {
        this.removeTouchEvent()
      } else {
        this.removeScrollAutoHideListener()
      }
    }
  }
  fab.methods.initTouchEvent = function () {
    // 区分PC和移动端 使用不同的动画交互方式
    if (this.scrollAutoHide || this.scrollAutoShow) {
      if (this.testPCMobile()) {
        this.listenTouchEvent()
      } else {
        document.addEventListener('scroll', this.scrollerEventListener)
      }
    }
  }
}