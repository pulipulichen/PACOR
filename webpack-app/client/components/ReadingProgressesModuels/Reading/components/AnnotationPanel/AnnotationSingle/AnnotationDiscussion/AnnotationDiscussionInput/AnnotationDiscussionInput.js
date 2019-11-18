let AnnotationDiscussionInput = {
  props: ['lib', 'status', 'config', 'annotation'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      message: ''
    }
  },
//  components: {
//  },
  computed: {
  },
  watch: {
  },
  mounted() {
  },
  methods: {
    focus () {
      this.$refs.input.focus()
    },
    comment () {
      throw new Error('@TODO AnnotationDiscussionInput.comment()')
    }
  } // methods
}

export default AnnotationDiscussionInput