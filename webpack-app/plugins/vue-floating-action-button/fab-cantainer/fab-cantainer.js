import util from './../util.js'

const Timeout = util.Timeout

export default {
  name: 'fab-cantainer',
  props: {
    hideOnStart: {
      type: Boolean,
      default: false
    },
  },
  data () {
    return {
      touching: false,
      animating: false,
      mousedown: false,
      timeout: Timeout(),
      disableTransition: false,
    }
  },
  computed: {
    fabContainerClass: function () {
      return {
        disableTransition: this.disableTransition
      }
    }
  },
  mounted () {
    if (this.hideOnStart === true) {
      this.disableTransition = true
      
      setTimeout(() => {
        this.$parent.onOffFab(false)
        
        setTimeout(() => {
          this.disableTransition = false
        }, 500)
        
      }, 0)
    }
  },
  methods: {
    startAnimate: async function () {
      this.touching = true
      this.animating = true
      this.mousedown = true
      await this.timeout.handleTimeout()
      this.animating = false
      if (this.mousedown) {
        return
      }
      this.touching = false
    },
    endAnimate: function () {
      this.mousedown = false
      if (this.animating) {
        return
      }
      this.touching = false
      this.timeout.handleClearTimeout()
    }
  }
}