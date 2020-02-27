import ReadingProgressIndicator from './ReadingProgressIndicator/ReadingProgressIndicator.vue'
import SimpleCountdownTimer from './SimpleCountdownTimer/SimpleCountdownTimer.vue'
import Media from 'vue-media'
import $ from 'jquery'

let CompactNavigation = {
  props: ['lib', 'status', 'config'
    , 'compactWidth', 'position', 'pauseAtStart'],
  data() {
    //console.log(this.pauseAtStart)
    return {
      normalMenuDisplay: false,
      
      sideMenuDisplay: false,
      isCompactMode: false,
      placeholder: null
    }
  },
  components: {
    'media': Media,
    'reading-progress-indicator': ReadingProgressIndicator,
    'simple-countdown-timer': SimpleCountdownTimer
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
      
      return classList.join(' ') + ' brown fixed menu'
    }
  },
  mounted() {
    this.initCompactMode()
    this.initPlaceholder()
    this.setupTutorial()
    
    /*
    setTimeout(() => {
      this.normalMenuDisplay = true
      this.status.search.keyword = '天'
      this.status.search.showAnnotationList = true
    }, 500)
    */
  },
  destroyed () {
    this.removePlaceholder()
  },
  methods: {
    showNormalMenu () {
      //console.log('1')
      this.normalMenuDisplay = true
    },
    hideNormalMenu () {
      //console.log('1')
      this.normalMenuDisplay = false
    },
    initCompactMode () {
      let width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
      this.isCompactMode = (width < this.compactWidth)
    },
    initPlaceholder: function () {
      this.placeholder = $(`<div class="Navigation placeholder"></div>`)
      
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
//    showSideMenu: function () {
//      this.sideMenuDisplay = true
//    },
    hideSideMenu: function () {
      this.$refs.nav.hideSideMenu()
    },
//    timeup () {
//      this.lib.auth.nextStep()
//    }
  } // methods
}

import methodsTutorialCompactNavigation from './methodsTutorialCompactNavigation.js'
methodsTutorialCompactNavigation(CompactNavigation)

export default CompactNavigation