let WebpageGroupEditor = {
  props: ['lib', 'status', 'config'
    , 'webpage', 'buttonMode'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      editingGroups: this.webpage
    }
  },
//  components: {
//  },
  computed: {
    title () {
      if (this.editingGroups.title !== '' 
              && this.editingGroups.title) {
        return '(' + this.editingGroups.title + ')'
      }
    },
    uri () {
      if (this.webpage.url) {
        return '/' + this.webpage.url.split('/').slice(3).join('/')
      }
    },
    computedButtonTitle () {
      let title = [
        this.$t('Edit groups of')
        , '# ' + this.webpage.id
        , this.uri
      ]
      
      if (this.title) {
        title.push(this.title)
      }
      
      return title.join(' ').trim()
    },
    computedButtonClassList () {
      let classList = []
      if (this.buttonMode === false) {
        return undefined
      }
      else {
        classList.push('ui right labeled icon button')
      }
      
      if (typeof(this.webpage.activeUsersCount) === 'number'
              && this.webpage.activeUsersCount > 0) {
        classList.push('positive')
      }
      else if (this.webpage.activeUsersCount === 0
              && this.webpage.groupsCount > 0) {
        classList.push('red')
      }
      
      return classList.join(' ')
    },
    computedContainerClassList () {
      if (this.buttonMode === false) {
        return 'text-mode'
      }
    },
    computedUserCount () {
      if (typeof(this.webpage.activeUsersCount) === 'number') {
        return this.webpage.activeUsersCount
      }
      if (typeof(this.webpage.usersCount) === 'number') {
        return this.webpage.usersCount
      }
    }
  },
  watch: {
    webpage (webpage) {
      this.editingGroups = webpage
    }
  },
//  mounted() {
//  },
  methods: {
    editGroupsOpen: function () {
      //console.log(domain)
      //this.editingGroups = this.webpage
      this.$refs.ModelEditGroups.show()
    },
    editGroupsSubmit: async function () {
      let webpage = this.editingGroups
      this.$refs.ModelEditGroups.hide()
      
      let data = {
        id: webpage.id
      }
      
      let usersCount = 0
      if (webpage.groups !== '') {
        data.groups = []
        webpage.groups.trim().split('\n').forEach(line => {
          line = line.trim()
          if (line !== '') {
            let group = line.split(' ')
            group = group.filter(u => u.trim() !== '')
            data.groups.push(group)
            usersCount = usersCount + group.length
          }
        })
      }
      
      if (data.groups.length === 0) {
        return false
      }
      
      webpage.groupsCount = data.groups.length
      webpage.usersCount = usersCount
      
      await this.lib.AxiosHelper.post('/Admin/Webpage/editGroups', data)
      this.$emit('change', webpage)
    },
  } // methods
}

export default WebpageGroupEditor