let WebpageArticleAnalysis = {
  props: ['lib', 'status', 'config'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      ideaUnits: '',
      inited: false,
      wait: false
    }
  },
//  components: {
//  },
  computed: {
  },
  watch: {
    ideaUnits () {
      this.saveIdeaUnits()
    }
  },
  mounted() {
    this.loadIdeaUnits()
  },
  methods: {
    attrHeaderID: function (anchor) {
      return '/webpage-dashboard/' + this.$route.params.webpageID + '/' + anchor
    },
    loadIdeaUnits: async function () {
      if (this.ideaUnits === '') {
        this.ideaUnits = await this.lib.AxiosHelper.get('/admin/WebpageDashboard/getIdeaUnits', {
          webpageID: this.$route.params.webpageID
        })
      }
      this.inited = true
    },
    saveIdeaUnits: async function () {
      if (this.inited === false) {
        return false
      }
      
      if (this.wait === true) {
        return false
      }
      this.wait = true
      
      await this.lib.VueHelper.sleep(5000)
      
      await this.lib.AxiosHelper.post('/admin/WebpageDashboard/setIdeaUnits', {
        ideaUnits: this.ideaUnits,
        webpageID: this.$route.params.webpageID
      })
      
      this.wait = false
    }
  } // methods
}

export default WebpageArticleAnalysis