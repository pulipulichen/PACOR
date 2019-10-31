import Media from 'vue-media'

let Navigation = {
  props: ['config', 'compactWidth', 'position'],
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
    computedClass: function () {
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
      
      return classList.join(' ') + ' fixed menu'
    }
    
  },
  /*
  watch: {
  },
   */
  mounted() {
    let width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    this.isCompactMode = (width < this.compactWidth)
    this.initPlaceholder()
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
      
      this.placeholder.css('height', this.$refs.Menu.clientHeight + 'px')
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