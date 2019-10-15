let DomainsAdd = {
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

export default DomainsAdd