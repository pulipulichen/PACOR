let AnnotaionInstruction = {
  props: ['config', 'status', 'type', 'lib', 'editable'],
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
    },
    computedContainerClassList () {
      let classList = []
      
      if (this.editable === false) {
        classList.push('uneditable')
      }
      
      return classList.join(' ')
    },
    instructionURL () {
      let url = this.instruction.url
      if (this.lib.StringHelper.isURL(url)) {
        return url
      }
      else {
        if (this.lib.auth.hasCollaborationStep 
                && this.lib.StringHelper.isURL(url.collaboration)) {
          return url.collaboration
        }
        else {
          return url.individual
        }
      }
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