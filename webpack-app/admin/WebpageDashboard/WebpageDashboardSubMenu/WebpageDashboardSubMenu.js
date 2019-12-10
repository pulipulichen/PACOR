let WebpageDashboardSubMenu = {
  props: ['lib', 'status', 'config'
    , 'webpage'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
    }
  },
//  components: {
//  },
  computed: {
  },
//  watch: {
//  },
//  mounted() {
//  },
  methods: {
    reload () {
      location.reload()
    }
  } // methods
}

export default WebpageDashboardSubMenu