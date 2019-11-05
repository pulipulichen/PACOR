let AnnotationFloatWidget = {
  props: ['lib', 'status', 'config', 'highlightPos', 'highlightPosLock'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      annotation: null,
      users: [],
      types: [],
      annotationCount: 0
    }
  },
  components: {
  },
  computed: {
    computedContainerClassNames () {
      if (this.highlightPos !== null) {
        let windowHeight = window.innerHeight
        let clientY = this.highlightPos.event.clientY
        if (clientY < (windowHeight / 2) ) {
          return 'bottom'
        }
      }
      //return 'bottom'
    },
    computedButtonsClassNames () {
      if (this.status.preference.leftHanded === false) {
        return 'right aligned column'
      }
      else {
        return 'column'
      }
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