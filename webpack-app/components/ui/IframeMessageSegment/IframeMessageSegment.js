let IframeMessageSegment = {
  props: ['config', 'message', 'showBorder'],
  data() {
    return {
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
//  mounted() {
//  },
//  methods: {
//  } // methods
}

export default IframeMessageSegment