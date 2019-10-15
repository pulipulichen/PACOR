let DomainAdd = {
  props: ['lib', 'status', 'config', 'progress', 'error', 'view'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      addInput: {
        domain: '',
        title: '',
        admins: '',
        config: ''
      }
    }
  },
  components: {
  },
  computed: {
    enableAdd: function () {
      return this.lib.ValidateHelper.isURL(this.addInput.domain)
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
      
      let result = await this.lib.AxiosHelper.post('/admin/Domain/add', data)
      
      // 完成admin之後呢？
      if (typeof(result) === 'object') {
        this.$router.push('/domain/list/1')
      }
    }
  } // methods
}

export default DomainAdd