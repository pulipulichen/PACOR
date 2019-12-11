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
      if (this.buttonMode === false) {
        return
      }
      else {
        return 'ui right labeled icon button'
      }
    },
    computedContainerClassList () {
      if (this.buttonMode === false) {
        return 'text-mode'
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