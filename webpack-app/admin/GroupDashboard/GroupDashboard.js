let GroupDashboard = {
  props: ['lib', 'status', 'config'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      toc: null,
      group: {
        group_seq_id: null,
        users: []
      }
    }
  },
//  components: {
//  },
  computed: {
    'webpagePath': function () {
      if (typeof(this.status.webpageURL) === 'string') {
        return '/' + this.status.webpageURL.split('/').slice(3).join('/')
      }
    },
  },
  watch: {
  },
  mounted() {
    this.initDashboard()
    this.toc = this.$refs.toc
  },
  methods: {
    initDashboard: async function () {
      // 先跟伺服器取得webpage的資訊
      let data = {
        webpageID: this.$route.params.webpageID,
        userID: this.$route.params.userID,
      }
      
      let result = await this.lib.AxiosHelper.get('/admin/GroupDashboard/info', data)
      
      this.group = result.group
      this.group.group_seq_id = this.$route.params.groupID
      //console.log(this.group)
      
      this.status.webpageURL = result.webpageURL
      this.status.title = this.$t('Dashboard') + ' ' + this.username
    },
    attrHeaderID: function (anchor) {
      return '/group-dashboard/' + this.$route.params.webpageID + '/' + this.$route.params.groupID + '/' + anchor
    },
  } // methods
}

export default GroupDashboard