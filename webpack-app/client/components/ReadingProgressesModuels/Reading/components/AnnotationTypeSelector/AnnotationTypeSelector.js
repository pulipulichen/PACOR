let AnnotationTypeSelector = {
  props: ['status', 'config', 'selection'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
    }
  },
  components: {
  },
  computed: {
    attrStyle: function () {
      if (typeof(this.selection) === 'object') {
        let maxWidth = window.innerWidth || screen.width
        let maxHeight = window.innerHeight || screen.height
        
        // 要得知screen width
        //console.log(this.selection)
        let rect = this.selection.rect
        
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

export default AnnotationTypeSelector