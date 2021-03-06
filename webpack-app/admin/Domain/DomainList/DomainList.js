let DomainList = {
  props: ['lib', 'status', 'config', 'progress', 'error', 'view', 'title'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      domains: [],
      editingAdmins: {},
      editingConfig: {},
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
    
    editTitle: async function (domain, index) {
      let data = {
        id: domain.id,
        title: domain.title
      }
      
      await this.lib.AxiosHelper.post('/Admin/Domain/editTitle', data)
      
      this.domains[index].isChanged = false
      this.$forceUpdate()
    },
    /*
    t: async function() {
      await this.lib.AxiosHelper.post('/Admin/Domain/editAdmins', {
        id: 1,
        admins: ['pudding', 'jo']
      })
    },
     */
    /*
    countAdmins: function (admins) {
      if (admins === '') {
        return 0
      }
      else {
        return admins.split(' ').length
      }
    },
    */
    editAdminsOpen: function (domain) {
      //console.log(domain)
      this.editingAdmins = domain
      this.$refs.ModelEditAdmins.show()
    },
    editAdminsSubmit: async function () {
      let domain = this.editingAdmins
      this.$refs.ModelEditAdmins.hide()
      
      let data = {
        id: domain.id
      }
      
      if (domain.admins !== '') {
        data.admins = domain.admins.replace(/\n/g, ' ').trim().split(' ').map(admin => {
          let parts = admin.split(':')
          if (parts.length !== 2) {
            throw this.$t('Format should be "admin:password"')
          }
          return {
            username: parts[0],
            password: parts[1]
          }
        })
        
      }
      
      if (data.admins.length === 0) {
        return false
      }
      
      domain.adminsCount = data.admins.length
      
      await this.lib.AxiosHelper.post('/Admin/Domain/editAdmins', data)
      
    },
    editConfigOpen: function (domain) {
      //console.log(domain)
      this.editingConfig = domain
      this.$refs.ModelEditConfig.show()
    },
    editConfigSubmit: async function () {
      this.$refs.ModelEditConfig.hide()
      
      let domain = this.editingConfig
      let data = {
        id: domain.id
      }
      
      if (domain.config !== '') {
        try {
          data.config = JSON.parse(domain.config)
        }
        catch (e) {}
      }
      else {
        data.config = null
      }
      
      if (typeof(data.config) === 'undefined') {
        return false
      }
      
      await this.lib.AxiosHelper.post('/Admin/Domain/editConfig', data)
      
      // 關閉Modal
    }
  } // methods
}

export default DomainList