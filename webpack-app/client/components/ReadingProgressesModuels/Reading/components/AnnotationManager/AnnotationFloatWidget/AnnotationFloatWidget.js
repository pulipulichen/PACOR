let AnnotationFloatWidget = {
  props: ['lib', 'status', 'config', 'highlightPos', 'highlightPosLock'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      mostReleventAnnotation: null,
      users: [],
      types: []
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