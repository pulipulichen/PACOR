import WebpageDashboardGroups from "./WebpageDashboardGroups/WebpageDashboardGroups.vue"

let Template = {
  props: ['lib', 'status', 'config', 'progress', 'error', 'view'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
    }
  },
  components: {
    'webpage-dashboard-groups': WebpageDashboardGroups
  },
  computed: {
  },
  watch: {
  },
  mounted() {
    this.initDashboard()
  },
  destroyed () {
    this.lib.toc(false)
  },
  methods: {
    initDashboard: async function () {
      // 先跟伺服器取得webpage的資訊
      let data = {
        webpageID: this.$route.params.webpageID
      }
      
      let result = await this.lib.AxiosHelper.get('/admin/Dashboard/info', data)
      this.status.webpageURL = result.webpageURL
      this.status.title = this.$t('Dashboard') + ' ' + this.status.webpageURL
    }
  } // methods
}

export default Template