let Template = {
  props: ['lib', 'status', 'config', 'progress', 'error', 'toc'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      groups: []
    }
  },
  components: {
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
      
      let result = await this.lib.AxiosHelper.get('/admin/Dashboard/groups', data)
      //console.log(result)
      this.groups = result.groups
      this.$parent.$refs.toc.refresh()
    },
    attrHeaderID: function (anchor) {
      return '/webpage-dashboard/' + this.$route.params.webpageID + '/' + anchor
    }
  } // methods
}

export default Template