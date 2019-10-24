let Template = {
  props: ['lib', 'status', 'config', 'progress', 'error', 'view'],
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
    this.$refs.ExitModal.show()
  },
  methods: {
    logout: async function () {
      await this.lib.AxiosHelper.get('/client/auth/logout')
      this.status.needLogin = true
    },
    exit: async function () {
      await this.logout()
      window.close()
    }
  } // methods
}

export default Template