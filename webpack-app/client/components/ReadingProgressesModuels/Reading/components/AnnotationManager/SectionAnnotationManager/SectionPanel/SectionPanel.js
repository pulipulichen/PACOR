let SectionPanel = {
  props: ['lib', 'status', 'config', 'node'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
    }
  },
  components: {
  },
  computed: {
  },
  watch: {
  },
  mounted() {
    this.initPanel()
  },
  methods: {
    initPanel () {
      console.log(this.node)
      this.node.parentNode.insertBefore(this.$refs.panel, this.node.nextSibling)
    }
  } // methods
}

export default SectionPanel