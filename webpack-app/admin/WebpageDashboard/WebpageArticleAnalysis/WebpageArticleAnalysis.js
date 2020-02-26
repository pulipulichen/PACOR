let WebpageArticleAnalysis = {
  props: ['lib', 'status', 'config'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      ideaUnits: ''
    }
  },
//  components: {
//  },
  computed: {
  },
  watch: {
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
    }
  } // methods
}

export default WebpageArticleAnalysis