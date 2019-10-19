let WebpageAdd = {
  props: ['lib', 'status', 'config', 'progress', 'error', 'view'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      addInput: {
        url: 'http://pc.pulipuli.info/test',
        title: '',
        groups: '',
        config: ''
      }
    }
  },
  components: {
  },
  computed: {
    enableAdd: function () {
      return (this.lib.ValidateHelper.isURL(this.addInput.url)
              && (this.addInput.config === '' || this.lib.ValidateHelper.isJSON(this.addInput.config)) )
    },
    configIsJSON: function () {
      return (this.addInput.config === '' 
              || this.lib.ValidateHelper.isJSON(this.addInput.config))
    }
  },
  watch: {
  },
  mounted() {
    this.initTitle()
  },
  methods: {
    initTitle: function () {
      let title = this.$t('Webpage Add')
      if (this.status.domain !== undefined 
              && this.status.domain !== '') {
        title = title + ' (' + this.status.domain + ')'
      }
      this.status.title = title
    },
    addSubmit: async function () {
      let input = JSON.parse(JSON.stringify(this.addInput))
      let domainID = this.$route.params.domainID
      let data = {
        //domainID: domainID,
        url: input.url
      }
      
      if (input.title !== '') {
        data.title = input.title
      }
      if (input.groups !== undefined 
              && input.groups !== '') {
        let groups = []
        input.groups.trim().split('\n').forEach(line => {
          let group = line.trim().split(' ').filter(user => user !== '')
          if (group.length > 0) {
            groups.push(group)
          }
        })
        if (groups.length > 0) {
          data.groups = groups
        }
      }
      if (input.config !== '') {
        try {
          data.config = JSON.parse(data.config)
        }
        catch (e) {}
      }
      
      let result = await this.lib.AxiosHelper.post('/admin/Webpage/add', data)
      //console.log(result)
      // 完成admin之後呢？
      if (result === 1) {
        this.$router.push('list')
      }
    }
  } // methods
}

export default WebpageAdd