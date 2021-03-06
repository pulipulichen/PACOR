import Media from 'vue-media'
import $ from 'jquery'

let Navigation = {
  props: ['config', 'lib', 'status'
    , 'compactWidth', 'position', 'color', 'isVisible', 'showMoreButton'],
  data() {
    return {
      sideMenuDisplay: false,
      isCompactMode: false,
      placeholder: null
    }
  },
  components: {
    'media': Media
  },
  watch: {
    isCompactMode (isCompactMode) {
      this.$emit('changeCompactMode', isCompactMode)
    },
    
    sideMenuDisplay (sideMenuDisplay) {
      this.$emit('onSideMenuChange', sideMenuDisplay)
    }
  },
  computed: {
    maxWidth: function () {
      let w = this.compactWidth
      if (typeof(w) === 'string' && isNaN(w) === false) {
        return parseInt(w, 10)
      }
      else if (typeof(w) === 'number') {
        return w
      }
      else {
        return 0
      }
    },
    computedTopMenuClass: function () {
      let classList = []
      
      if (typeof(this.position) !== 'string') {
        classList.push('top')
      }
      else {
        classList.push(this.position)
      }
      
      if (this.isCompactMode === true) {
        classList.push('compact-mode')
      }
      
      if (this.color) {
        classList.push(this.color)
      }
      
      return classList.join(' ') + ' fixed menu'
    },
    computedVerticalMenuClass: function () {
      let classList = []
      
      
      if (this.$slots.verticalHeaderItem) {
        classList.push('with-header')
      }
      else {
        classList.push('default-header')
      }
      
      // {hide: !sideMenuDisplay}
      if (!this.sideMenuDisplay) {
        classList.push('hide')
      }
      
      if (this.color) {
        classList.push(this.color)
      }
      
      if (this.lib.style && this.lib.style.isLeftHanded) {
        classList.push('left')
      }
      else {
        classList.push('right')
      }
      
      return classList.join(' ') + ' fixed vertical menu'
    }
  },
  mounted() {
    let width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    this.isCompactMode = (width < this.compactWidth)
    setTimeout(() => {
      this.initPlaceholder()
    }, 0)
  },
  destroyed () {
    this.removePlaceholder()
  },
  methods: {
    initPlaceholder: function () {
      this.placeholder = $(`<div class="Navigation placeholder"></div>`)
      
      if (this.position === 'bottom') {
        this.placeholder.appendTo('body')
      }
      else {
        this.placeholder.prependTo('body')
      }
      
      let height = this.$refs.Menu.clientHeight
      height = height + 20
      this.placeholder.css('height', height + 'px')
    },
    removePlaceholder: function () {
      this.placeholder.remove()
    },
    showSideMenu: async function () {
      //console.log('showSideMenu')
      this.sideMenuDisplay = true
      await this.lib.VueHelper.sleep(500)
    },
    hideSideMenu: async function () {
      this.sideMenuDisplay = false
      await this.lib.VueHelper.sleep(500)
    },
    find: function (selector) {
      if (this.sideMenuDisplay === true) {
        return $(this.$refs.SideMenu).find(selector)
      }
      else {
        return $(this.$refs.Menu).find(selector)
      }
    }
    
  } // methods
}

export default Navigation