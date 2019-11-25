let AnnotationTypeFilter = {
  props: ['lib', 'status', 'config'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
    }
  },
  components: {
  },
  computed: {
    type () {
      return this.status.filter.findType
    }
  },
  watch: {
  },
  mounted() {
  },
  methods: {
    showTypeFilter () {
      throw new Error('showTypeFilter')
    }
  } // methods
}

export default AnnotationTypeFilter