let AnnotationFloatWidget = {
  props: ['lib', 'status', 'config', 'highlightPos'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
    }
  },
  components: {
  },
  computed: {
    computedClassNames () {
      if (this.highlightPos !== null) {
        let windowHeight = window.innerHeight
        let clientY = this.highlightPos.event.clientY
        if (clientY < (windowHeight / 2) ) {
          return 'bottom'
        }
      }
      //return 'bottom'
    }
  },
  watch: {
  },
  mounted() {
  },
  methods: {
  } // methods
}

export default AnnotationFloatWidget