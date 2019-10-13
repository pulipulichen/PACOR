let Navigation = {
  props: ['lib', 'status', 'config', 'progress', 'error', 'view'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
    }
  },
  computed: {
  },
  watch: {
  },
  mounted() {
  },
  methods: {
    logout: async function () {
      await this.lib.AxiosHelper.get(`/admin/auth/logout`)
      
      this.status.needLogin = true
    }
  } // methods
}

export default Navigation