let IframeMessageSegment = {
  props: ['config', 'message'],
  data() {
    return {
    }
  },
//  components: {
//  },
  computed: {
    url () {
      if (this.message.startsWith('/')) {
        return this.config.baseURL + this.message
      }
      else if (this.message.startsWith('http://')
              || this.message.startsWith('https://')) {
        return this.message
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