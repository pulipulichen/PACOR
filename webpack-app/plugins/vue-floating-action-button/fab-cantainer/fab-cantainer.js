import util from './../util.js'

const Timeout = util.Timeout

export default {
  name: 'fab-cantainer',
  data () {
    return {
      touching: false,
      animating: false,
      mousedown: false,
      timeout: Timeout()
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