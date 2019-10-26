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
    'webpagePath': function () {
      if (typeof(this.status.webpageURL) === 'string') {
        return '/' + this.status.webpageURL.split('/').slice(3).join('/')
      }
    }
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
      
      let result = await this.lib.AxiosHelper.get('/admin/WebpageDashboard/info', data)
      this.status.webpageURL = result.webpageURL
      this.status.title = this.$t('Dashboard') + ' ' + this.webpagePath
    }
  } // methods
}

export default Template