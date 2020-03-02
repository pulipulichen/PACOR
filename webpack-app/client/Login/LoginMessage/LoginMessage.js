let LoginMessage = {
  props: ['lib', 'status', 'config'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
    }
  },
//  components: {
//  },
  computed: {
    steps () {
      return this.status.readingConfig.readingProgresses
    },
    totalTime () {
      return 10
    },
    computedTotalTimeMessage () {
      return this.$t('It takes about <span class="highlight">{0} minutes</span> in total.', [this.totalTime])
    }
  },
//  watch: {
//  },
//  mounted() {
//  },
//  methods: {
//  } // methods
}

export default LoginMessage