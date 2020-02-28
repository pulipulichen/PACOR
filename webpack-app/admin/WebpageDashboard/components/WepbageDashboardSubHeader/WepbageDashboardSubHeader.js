let WepbageDashboardSubHeader = {
  props: ['header', 'anchor', 'lib', 'status', 'config'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
    }
  },
//  components: {
//  },
  computed: {
    attrHeaderID: function () {
      let anchor = this.anchor
      return '/webpage-dashboard/' + this.$route.params.webpageID + '/' + anchor
    },
  },
//  watch: {
//  },
//  mounted() {
//  },
  methods: {
    
  } // methods
}

export default WepbageDashboardSubHeader