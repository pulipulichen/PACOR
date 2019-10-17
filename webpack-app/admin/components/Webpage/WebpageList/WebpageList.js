let WebpageList = {
  props: ['lib', 'status', 'config', 'progress', 'error', 'view', 'title'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      webpages: [],
      editingGroups: {},
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
          this.$router.push('/webpage/list/' + this.pageConfig.page)
          localStorage.setItem('WebpageList.pageConfig.page', this.pageConfig.page)
          this.list()
        }
      }
    }
  },
  watch: {
  },
  mounted() {
    this.initPage()
    
    this.status.title = this.$t('Webpage Management')
    this.list()
  },
  methods: {
    initPage: function () {
      if (isNaN(this.$route.params.page) === true) {
        let lastPage = localStorage.getItem('WebpageList.pageConfig.page')
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
      let domainID = this.$route.params.domainID
      if (typeof(domainID) === 'undefined') {
        return false
      }
      else {
        domainID = parseInt(domainID, 10)
      }
      
      let result = await this.lib.AxiosHelper.get('/Admin/Webpage/list', {
        domainID: domainID,
        page: this.pageConfig.page
      })
      if (typeof(result) === 'object') {
        if (Array.isArray(result.webpages)) {
          if (result.webpages.length === 0) {
            if (this.pageConfig.page !== 1) {
              this.pageConfig.page = 1
            }
            return false
          }
          this.webpages = result.webpages
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
      
      await this.lib.AxiosHelper.post('/Admin/Webpage/editTitle', data)
      
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
        data.admins = domain.admins.replace(/\n/g, ' ').trim().split(' ')
      }
      
      if (data.admins.length === 0) {
        return false
      }
      
      domain.adminsCount = data.admins.length
      
      await this.lib.AxiosHelper.post('/Admin/Webpage/editGroups', data)
      
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
      
      if (typeof(data.config) === 'undefined') {
        return false
      }
      
      await this.lib.AxiosHelper.post('/Admin/Webpage/editConfig', data)
      
      // 關閉Modal
    }
  } // methods
}

export default WebpageList