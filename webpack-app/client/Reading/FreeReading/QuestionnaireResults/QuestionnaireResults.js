let QuestionnaireResults = {
  props: ['lib', 'status', 'config', 'progress', 'error', 'view'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
    }
  },
//  components: {
//  },
  computed: {
    username () {
      return this.lib.auth.username
    }
  },
//  watch: {
//  },
  mounted() {
  },
  methods: {
    logout: async function () {
      
      this.$refs.ExitModal.hide()
      this.lib.auth.logout()
    },
    exit: async function () {
      await this.lib.AxiosHelper.get('/client/auth/logout')
      window.close()
    },
  } // methods
}

export default QuestionnaireResults