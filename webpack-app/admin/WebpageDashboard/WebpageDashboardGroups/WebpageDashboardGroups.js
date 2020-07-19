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
    users () {
      let users = []
      
      this.groups.forEach(group => {
        group.users.forEach(user => {
          users.push({
            id: user.id,
            username: user.username,
            readingProgresses: user.readingProgresses
          })
        })
      })
      
      this.notInGroup.users.forEach(user => {
        users.push({
          id: user.id,
          username: user.username,
          readingProgresses: user.readingProgresses
        })
      })
      
      users.sort((a, b) => {
        return (a.username > b.username)
      })
      
      /*
      return [{
          name: 1,
          progress: '3/4'
      },
      {
          name: 2,
          progress: '3/4'
      }]
       */
      return users
    }
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
      
      if (this.$parent.$refs.toc) {
        this.$parent.$refs.toc.refresh()
      }
    },
    attrHeaderID: function (anchor) {
      return '/webpage-dashboard/' + this.$route.params.webpageID + '/' + anchor
    },
    userDashboardLink (id) {
      return '#/user-dashboard/' + this.$route.params.webpageID + '/' + id
    },
    groupDashboardLink (id) {
      return '#/group-dashboard/' + this.$route.params.webpageID + '/' + id
    }
  } // methods
}

export default WebpageDashboardGroups