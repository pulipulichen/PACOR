let GroupDashboard = {
  props: ['lib', 'status', 'config'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      toc: null,
      group: {
        group_seq_id: null,
        socialNetworks: [],
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
    }
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
      let groupID = Number(this.$route.params.groupID)
      let data = {
        webpageID: this.$route.params.webpageID,
        groupID,
      }
      
      let result = await this.lib.AxiosHelper.get('/admin/GroupDashboard/info', data)
      
      this.group = result.group
      this.group.group_seq_id = Number(this.$route.params.groupID)
      console.log(this.group.users[0])
      //console.log(this.group.socialNetworks)
      
      this.status.webpageURL = result.webpageURL
      this.status.title = this.$t('Group Dashboard') 
              + ' #' + (this.group.group_seq_id+1)
              + ' (' + this.$t('{0} users', this.group.users.length, [this.group.users.length]) + ')'
    },
    attrHeaderID: function (anchor) {
      return '/group-dashboard/' + this.$route.params.webpageID + '/' + this.$route.params.groupID + '/' + anchor
    },
    nodesTable: function (nodes) {
      let lines = [
        ['id', 'size'].join('\t')
      ]
      
      lines = lines.concat(nodes.map(({id, size}) => [id, size].join('\t')))
      
      return lines.join("\n")
    },
    edgesTable: function (edges) {
      let lines = [
        ['source', 'target', 'size'].join('\t')
      ]
      
      lines = lines.concat(edges.map(({source, target, size}) => [source, target, size].join('\t')))
      
      return lines.join("\n")
    }
  } // methods
}

export default GroupDashboard