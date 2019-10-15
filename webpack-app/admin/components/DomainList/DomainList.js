let DomainList = {
  props: ['lib', 'status', 'config', 'progress', 'error', 'view'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      domains: [],
      pageConfig: {
        page: 0,
        maxPage: 0
      }
    }
  },
  components: {
  },
  computed: {
    'pageConfig.page': function () {
      if (isNaN(this.pageConfig.page) === false) {
        let currentPage = this.$route.params.page
        if (isNaN(currentPage) === true
                || parseInt(currentPage, 10) !== this.pageConfig.page) {
          this.$router.push('/domain/list/' + this.pageConfig.page)
          localStorage.setItem('DomainList.pageConfig.page', this.pageConfig.page)
          this.list()
        }
      }
    }
  },
  watch: {
  },
  mounted() {
    this.initPage()
    
    this.status.title = this.$t('Domaian Management')
    this.list()
  },
  methods: {
    initPage: function () {
      if (isNaN(this.$route.params.page) === true) {
        let lastPage = localStorage.getItem('DomainList.pageConfig.page')
        if (isNaN(lastPage) === false && lastPage !== null) {
          this.pageConfig.page = lastPage
        }
        else {
          this.pageConfig.page = 1
        }
      }
      else {
        this.pageConfig.page = parseInt(this.$route.params.page, 10)
      }
    },
    
    list: async function () {
      
      let result = await this.lib.AxiosHelper.get('/Admin/Domain/list', {
        page: this.pageConfig.page
      })
      if (typeof(result) === 'object') {
        if (Array.isArray(result.domains)) {
          if (result.domains.length === 0) {
            if (this.pageConfig.page !== 1) {
              this.pageConfig.page = 1
            }
            return false
          }
          this.domains = result.domains
        }
        if (typeof(result.maxPage) === 'number') {
          this.pageConfig.maxPage = result.maxPage
        }
      }
    },
  } // methods
}

export default DomainList