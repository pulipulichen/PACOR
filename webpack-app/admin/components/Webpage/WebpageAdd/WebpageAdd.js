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
    this.status.title = this.$t('Webpage Add')
  },
  methods: {
    addSubmit: async function () {
      let input = JSON.parse(JSON.stringify(this.addInput))
      let data = {
        domain: input.domain
      }
      
      if (input.title !== '') {
        data.title = input.title
      }
      if (input.admins !== '') {
        data.admins = input.admins.replace(/\n/g, ' ').trim().split(' ')
      }
      if (input.config !== '') {
        try {
          data.config = JSON.parse(data.config)
        }
        catch (e) {}
      }
      
      let result = await this.lib.AxiosHelper.post('/admin/Domain/add', data)
      //console.log(result)
      // 完成admin之後呢？
      if (result === 1) {
        this.$router.push('/domain/list/')
      }
    }
  } // methods
}

export default DomainAdd