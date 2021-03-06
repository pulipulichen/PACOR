import WebpageDashboardGroups from "./WebpageDashboardGroups/WebpageDashboardGroups.vue"
import WebpageDashboardSubMenu from "./WebpageDashboardSubMenu/WebpageDashboardSubMenu.vue"
import WebpageArticleAnalysis from "./WebpageArticleAnalysis/WebpageArticleAnalysis.vue"
import WebpageExport from "./WebpageExport/WebpageExport.vue"

let WebpageDashboard = {
  props: ['lib', 'status', 'config', 'progress', 'error', 'view'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      domainID: null,
      webpage: null
    }
  },
  components: {
    'webpage-dashboard-groups': WebpageDashboardGroups,
    'webpage-dashboard-sub-menu': WebpageDashboardSubMenu,
    'webpage-article-analysis': WebpageArticleAnalysis,
    'webpage-export': WebpageExport
  },
  computed: {
    'webpagePath': function () {
      if (typeof(this.status.webpageURL) === 'string') {
        let path = '/' + this.status.webpageURL.split('/').slice(3).join('/')
        return path
      }
    },
    webpagePathSummary () {
      return this.lib.URLHelper.getPathSummary(this.webpagePath)
    }
  },
//  watch: {
//  },
  mounted() {
    this.initDashboard()
    
    /*
    this.$nextTick(() => {
      setTimeout(() => {
        this.$refs.toc.refresh()
      }, 0)
      //console.log('可') // => 'not updated'
    })
     */
  },
  methods: {
    initDashboard: async function () {
      // 先跟伺服器取得webpage的資訊
      let data = {
        webpageID: this.$route.params.webpageID
      }
      
      let result = await this.lib.AxiosHelper.get('/admin/WebpageDashboard/info', data)
      if (result === 0) {
        this.$router.replace('/')
      }
      
      this.status.webpageURL = result.webpageURL
      this.webpage = result.webpage
      this.status.title = this.$t('Dashboard') + ' ' + this.webpagePath
      this.domainID = result.domainID
      
      //console.log(this.webpage)
    }
  } // methods
}

export default WebpageDashboard