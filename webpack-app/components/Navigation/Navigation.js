import Media from 'vue-media'

let Navigation = {
  props: ['config', 'compactWidth'],
  data() {
    return {
      sideMenuDisplay: false,
      isCompactMode: false
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
    }
  },
  /*
  watch: {
  },
   */
  mounted() {
    let width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    this.isCompactMode = (width < this.compactWidth)
  },
  methods: {
    showSideMenu: function () {
      this.sideMenuDisplay = true
    },
    hideSideMenu: function () {
      this.sideMenuDisplay = false
    }
    
  } // methods
}

export default Navigation