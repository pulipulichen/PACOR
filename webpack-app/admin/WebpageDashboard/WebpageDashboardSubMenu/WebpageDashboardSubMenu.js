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
      let confirm = window.confirm(this.$t('You need reload to active the change. Do you want to reload now?'))
      if (confirm === true) {
        location.reload()
      }
    }
  } // methods
}

export default WebpageDashboardSubMenu