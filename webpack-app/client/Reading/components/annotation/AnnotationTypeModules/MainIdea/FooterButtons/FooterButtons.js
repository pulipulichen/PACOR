let FooterButtons = {
  props: ['lib', 'status', 'config', 'annotation', 'panelData'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      public: (this.lib.auth.defaultPermission === 'public')
    }
  },
//  components: {
//  },
//  computed: {
//  },
//  watch: {
//  },
//  mounted() {
//  },
  methods: {
    onComment () {
      this.lib.AnnotationPanel.focusCommentInput()
    }
  } // methods
}

export default FooterButtons