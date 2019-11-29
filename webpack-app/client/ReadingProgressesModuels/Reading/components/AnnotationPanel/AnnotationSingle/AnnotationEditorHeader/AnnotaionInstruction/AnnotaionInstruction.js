let AnnotaionInstruction = {
  props: ['config', 'status', 'type', 'lib'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
    }
  },
//  components: {
//  },
  computed: {
    instruction () {
      return this.status.readingConfig.annotationTypeModules[this.type].instruction
    }
  },
//  watch: {
//  },
//  mounted() {
//  },
  methods: {
    showInstruction () {
      this.$refs.Modal.show()
    }
  } // methods
}

export default AnnotaionInstruction