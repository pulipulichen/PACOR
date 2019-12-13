import Media from 'vue-media'

let Navigation = {
  props: ['config', 'compactWidth', 'position', 'color'],
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
      
      // {hide: !sideMenuDisplay}
      if (!this.sideMenuDisplay) {
        classList.push('hide')
      }
      
      if (this.color) {
        classList.push(this.color)
      }
      
      if (this.lib.style.isLeftHanded) {
        classList.push('left')
      }
      else {
        classList.push('right')
      }
      
      return classList.join(' ') + ' fixed vertical menu'
    }
  },
  /*
  watch: {
  },
   */
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
      this.placeholder = window.$(`<div class="Navigation placeholder"></div>`)
      
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
    showSideMenu: function () {
      this.sideMenuDisplay = true
    },
    hideSideMenu: function () {
      this.sideMenuDisplay = false
    }
    
  } // methods
}

export default Navigation