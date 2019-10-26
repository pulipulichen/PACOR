import ReaderCard from './ReaderCard/ReaderCard.vue'

let WebpageDashboardGroups = {
  props: ['lib', 'status', 'config', 'progress', 'error', 'toc'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      groups: [],
      notInGroup: { users: [] }
    }
  },
  components: {
    'reader-card': ReaderCard
  },
  computed: {
  },
  watch: {
  },
  mounted() {
    this.initGroups()
  },
  methods: {
    initGroups: async function () {
      let data = {
        webpageID: this.$route.params.webpageID
      }
      
      let result = await this.lib.AxiosHelper.get('/admin/WebpageDashboard/groups', data)
      //console.log(result)
      for (let name in result) {
        this[name] = result[name]
      }
      this.lib.toc()
    },
    attrHeaderID: function (anchor) {
      return '/webpage-dashboard/' + this.$route.params.webpageID + '/' + anchor
    }
  } // methods
}

export default WebpageDashboardGroups