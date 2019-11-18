let NavigationItems = {
  props: ['lib', 'status', 'config', 'progress', 'error'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
    }
  },
//  components: {
//    'compact-navigation': CompactNavigation,
//  },
//  
//  computed: {
//  },
//  watch: {
//  },
//  mounted() {
//  },
  methods: {
    showInstruction () {
      this.$emit('showInstruction')
    }
  } // methods
}

export default NavigationItems