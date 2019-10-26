let UserDashboard = {
  props: ['lib', 'status', 'config', 'progress', 'error', 'view'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      user: {}
    }
  },
  components: {
  },
  computed: {
  },
  watch: {
  },
  mounted() {
    this.initDashboard()
  },
  methods: {
    initDashboard: async function () {
      // 先跟伺服器取得webpage的資訊
      let data = {
        webpageID: this.$route.params.webpageID
      }
      
      let result = await this.lib.AxiosHelper.get('/admin/WebpageDashboard/info', data)
      this.status.webpageURL = result.webpageURL
      this.status.title = this.$t('Dashboard') + ' ' + this.webpagePath
    }
  } // methods
}

export default UserDashboard