import './iframeResizer/iframeResizer-vue.js'

let IframeMessageSegment = {
  props: ['config', 'message', 'showBorder'],
  data() {
    return {
      show: false
    }
  },
//  components: {
//  },
  computed: {
    url () {
      if (!this.message) {
        return undefined
      }
      if (this.message.startsWith('/')) {
        return this.config.baseURL + this.message
      }
      else if (this.message.startsWith('http://')
              || this.message.startsWith('https://')) {
        return this.message
      }
    },
    computedClassList () {
      if (this.showBorder === false) {
        return ''
      }
      else {
        return 'ui segment'
      }
    }
  },
//  watch: {
//  },
  mounted() {
    setTimeout(() => {
      this.show = true
    }, 100)
  },
//  methods: {
//  } // methods
}

export default IframeMessageSegment