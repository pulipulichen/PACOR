let DomainList = {
  props: ['lib', 'status', 'config', 'progress', 'error', 'view'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      createInput: {
        domain: '',
        title: '',
        admins: '',
        config: ''
      },
      pageConfig: {
        page: 1,
        maxPage: 0
      }
    }
  },
  components: {
  },
  computed: {
  },
  watch: {
  },
  mounted() {
    this.status.title = this.$t('Domaian Management')
  },
  methods: {
    createSubmit: async function () {
      let data = JSON.parse(JSON.stringify(this.createInput))
      data.admins = data.admins.replace(/\n/g, ' ').trim().split(' ')
      
      let result = await this.lib.AxiosHelper.post('/admin/Domain/create', data)
      
      // 完成admin之後呢？
      if (typeof(result) === 'object') {
        this.$router.push('/domain/1')
      }
    }
  } // methods
}

export default DomainList