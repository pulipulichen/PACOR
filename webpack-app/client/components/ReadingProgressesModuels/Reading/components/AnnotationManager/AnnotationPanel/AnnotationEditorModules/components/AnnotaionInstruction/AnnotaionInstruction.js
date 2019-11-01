let AnnotaionInstruction = {
  props: ['config', 'status', 'annotationModule'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
    }
  },
  components: {
  },
  computed: {
    instruction () {
      return this.status.readingConfig.annotationTypeModules[this.annotationModule].instruction
    }
  },
  watch: {
  },
  mounted() {
  },
  methods: {
    showInstruction () {
      console.log('#TODO')
    }
  } // methods
}

export default AnnotaionInstruction