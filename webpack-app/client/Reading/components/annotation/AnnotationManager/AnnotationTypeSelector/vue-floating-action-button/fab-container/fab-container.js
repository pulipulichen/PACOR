import util from './../util.js'

const Timeout = util.Timeout

export default {
  name: 'fab-container',
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
      timeout: Timeout()
    }
  },
  computed: {
    fabContainerClass: function () {
      return {
        'semantic-ui': (this.$parent.iconType === 'SemanticUI')
      }
    }
  },
  mounted () {
  },
  methods: {
    startAnimate: async function () {
      this.touching = true
      this.animating = true
      this.mousedown = true
      await this.timeout.handleTimeout()
      this.animating = false
      if (this.mousedown) {
        return false
      }
      this.touching = false
    },
    endAnimate: function () {
      this.mousedown = false
      if (this.animating) {
        return false
      }
      this.touching = false
      this.timeout.handleClearTimeout()
    }
  }
}