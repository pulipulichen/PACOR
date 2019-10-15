let DomainAdd = {
  props: ['lib', 'status', 'config', 'progress', 'error', 'view'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      addInput: {
        domain: 'http://blog.pulipuli.info',
        title: '',
        admins: '',
        config: '{}'
      }
    }
  },
  components: {
  },
  computed: {
    enableAdd: function () {
      return (this.lib.ValidateHelper.isURL(this.addInput.domain)
              && (this.addInput.config === '' || this.lib.ValidateHelper.isJSON(this.addInput.config)) )
    },
    domainIsURL: function () {
      return (this.addInput.domain === '' 
              || this.lib.ValidateHelper.isURL(this.addInput.domain))
    },
    configIsJSON: function () {
      return (this.addInput.config === '' 
              || this.lib.ValidateHelper.isJSON(this.addInput.config))
    }
  },
  watch: {
  },
  mounted() {
    this.status.title = this.$t('Domaian Management')
  },
  methods: {
    addSubmit: async function () {
      let data = JSON.parse(JSON.stringify(this.addInput))
      data.admins = data.admins.replace(/\n/g, ' ').trim().split(' ')
      if (data.config !== '') {
        data.config = JSON.parse(data.config)
      }
      else {
        delete data.config
      }
      
      let result = await this.lib.AxiosHelper.post('/admin/Domain/add', data)
      
      // 完成admin之後呢？
      if (typeof(result) === 'object') {
        this.$router.push('/domain/list/1')
      }
    }
  } // methods
}

export default DomainAdd