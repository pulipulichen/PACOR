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
  computed: {
    domainID () {
      return this.$route.params.domainID
    }
  },
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
          this.$router.push(`/webpage/${this.$route.params.domainID}/list/` + this.pageConfig.page)
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
        
        //console.log(this.$route.params, this.$route.params.page, this.pageConfig.page)
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
    buildPageLink(i) {
      return `/webpage/${this.$route.params.domainID}/list/` + i
    },
    getPathSummary (path) {
      if (path.length < 50) {
        return path
      }
      
      let parts = path.split('/')
      let len = parts.length
      let output = ['']
      
      if (len === 2) {
        return path
      }
      else if (len < 4) {
        // /../..
        output.push('.../' + parts[(len - 1)])
      }
      else if (len === 4) {
        output.push(parts[1])
        output.push(parts[2].slice(0, 1) + '...' + parts[2].slice(-1, 1))
        output.push(parts[3])
      }
      else {
        output.push(parts[1])
        output.push(parts[2].slice(0, 1) + '...' + parts[(len - 2)].slice(-1))
        output.push(parts[(len - 1)])
      }
      
      if (output.join('/').length > 50) {
        output = ['']
        if (len < 4) {
          // /../..
          let lastPart = parts[(len - 1)]
          if (lastPart.indexOf('?') > -1) {
            let filename = lastPart.slice(0, lastPart.indexOf('?'))
            let query = lastPart.slice(lastPart.indexOf('?'))
            
            if (filename > 20) {
              filename = filename.slice(0, 7) + '...' + filename.slice(-7)
            }
            
            if (query > 20) {
              query = query.slice(0, 20) + '...'
            }
            
            lastPart = filename + '?' + query
          }
          else if (lastPart.indexOf('#') > -1) {
            let filename = lastPart.slice(0, lastPart.indexOf('#'))
            let query = lastPart.slice(lastPart.indexOf('#'))
            
            if (filename > 20) {
              filename = filename.slice(0, 7) + '...' + filename.slice(-7)
            }
            
            if (query > 20) {
              query = query.slice(0, 20) + '...'
            }
            
            lastPart = filename + '#' + query
          }
          
          output.push('.../' + parts[(len - 1)])
        }
        else if (len === 4) {
          output.push(parts[1].slice(0, 1) + '...' + parts[2].slice(-1, 1))
          output.push(parts[3])
        }
        else {
          output.push(parts[1].slice(0, 1) + '...' + parts[(len - 2)].slice(-1))
          output.push(parts[(len - 1)])
        }
      }
      
      return output.join('/')
    }
  } // methods
}

export default WebpageList