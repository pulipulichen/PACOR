import WepbageDashboardSubHeader from './../components/WepbageDashboardSubHeader/WepbageDashboardSubHeader.vue'

let WebpageExport = {
  props: ['lib', 'status', 'config'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
    }
  },
  components: {
    WepbageDashboardSubHeader
  },
  computed: {
    exportAllData () {
      return '/admin/WebpageExport/allData?webpageID=' + this.$route.params.webpageID
    }
  },
  watch: {
  },
  mounted() {
  },
  methods: {
    attrHeaderID: function (anchor) {
      return '/webpage-dashboard/' + this.$route.params.webpageID + '/' + anchor
    },
  } // methods
}

export default WebpageExport