let AnnotationFloatWidget = {
  props: ['lib', 'status', 'config', 'highlightPos', 'highlightEvent', 'highlightPosLock', 'rangy'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      annotation: null,
      annotationCount: 0,
      users: [],
      userCount: 0,
      types: [],
    }
  },
  components: {
  },
  computed: {
    computedContainerClassNames () {
      if (this.highlightPos !== null) {
        let windowHeight = window.innerHeight
        let clientY = this.highlightEvent.clientY
        if (clientY < (windowHeight / 2) ) {
          return 'bottom'
        }
      }
      //return 'bottom'
    },
    computedButtonsClassNames () {
      //console.log(this.status.preference.leftHanded)
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
    this.load()
  },
  destroyed () {
    this.rangy.hoverOut()
  },
  methods: {
    load: async function () {
      let query = {
        anchorPositions: this.highlightPos
      }
      let url = 'client/Annotation/floatWidget'
      
      let result = await this.lib.AxiosHelper.post(url, query)
      if (result === null) {
        return false
      }
      
      //console.log(result)
      for (let key in result) {
        this[key] = result[key]
      }
      
      this.$emit('list', this.highlightPos) // for test
    }
  } // methods
}

export default AnnotationFloatWidget