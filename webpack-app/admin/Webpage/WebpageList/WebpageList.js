let WebpageList = {
  props: ['lib', 'status', 'config', 'progress', 'error', 'view'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      domain: '',
      webpages: [],
      editingGroups: {},
      editingConfig: {},
      pageConfig: {
        page: 0,
        maxPage: 0
      }
    }
  },
//  components: {
//  },
//  computed: {
//  },
  watch: {
    'status.domain': function () {
      let title = this.$t('Webpage Management')
      if (this.status.domain !== '') {
        title = title + '(' + this.status.domain + ')'
      }
      this.status.title = title
    },
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
  mounted() {
    this.initPage()
    
    this.initTitle()
    this.list()
  },
  methods: {
    initTitle: function () {
      let title = this.$t('Webpage Management')
      if (this.status.domain !== undefined 
              && this.status.domain !== '') {
        title = title + ' (' + this.status.domain + ')'
      }
      this.status.title = title
    },
    initPage: function () {
      if (isNaN(this.$route.params.page) === true) {
        let lastPage = localStorage.getItem('WebpageList.pageConfig.page')
        if (isNaN(lastPage) === false && lastPage !== null) {
          this.pageConfig.page = lastPage
        }
        else {
          this.pageConfig.page = 1
        }
        
        console.log(this.$route.params, this.$route.params.page, this.pageConfig.page)
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
        if (typeof(result.domain) === 'string') {
          this.status.domain = result.domain
        }
        if (typeof(result.maxPage) === 'number') {
          this.pageConfig.maxPage = result.maxPage
        }
      }
    },
    
    editTitle: async function (webpage, index) {
      let data = {
        id: webpage.id,
        title: webpage.title
      }
      
      await this.lib.AxiosHelper.post('/Admin/Webpage/editTitle', data)
      
      this.webpages[index].isChanged = false
      this.$forceUpdate()
    },

    
  } // methods
}

export default WebpageList