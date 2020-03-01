import Media from 'vue-media'

let Login = {
  props: ['lib', 'status', 'config', 'progress', 'error'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      //username: '',
      username: '布丁',  // for test
      password: '',
      waiting: false,
      adminMode: false,
      key: 'PACOR.client.components.Login.',
      compactWidth: 767,
      isCompactMode: false,
      isContinue: false,
    }
  },
  computed: {
    isDisableLogin: function () {
      if (this.waiting === true) {
        return true
      }
      
      if (this.adminMode === false) {
        return (!this.isUsernameValid)
      }
      else {
        //console.log(this.isUsernameValid, this.password)
        return (!this.isUsernameValid || this.password === '')
      }
      
      return true
    },
    isUsernameValid () {
      return (this.username !== '' 
        && this.username.indexOf(' ') === -1)
    },
    agreementLink: function () {
      return this.config.baseURL + '/client/webpage/agreement'
    },
    computedFormClassList () {
      let classList = []
      
      if (this.isCompactMode === false) {
        classList.push('ten wide column')
      }
      else {
        classList.push('sixteen wide column')
      }
      
      if (this.adminMode === true) {
        classList.push('admin-mode')
      }
      
      return classList.join(' ')
    },
    computedHeaderMenuIconClassList () {
      if (this.adminMode) {
        return 'chess king icon'
      }
      else {
        return 'id badge icon'
      }
    },
    computedHeaderMenuIconTitle () {
      if (this.adminMode) {
        return this.$t('Switch to reader login')
      }
      else {
        return this.$t('Switch to administrator login')
      }
    },
    modeLabel () {
      if (this.adminMode) {
        return this.$t('Administrator')
      }
      else {
        return this.$t('Reader')
      } 
    },
    loginMessage () {
      if (this.status.readingConfig 
            && this.status.readingConfig.login
            && this.status.readingConfig.login.message ) {
        return this.status.readingConfig.login.message
      }
    },
    logoURL () {
      //console.log(this.status.readingConfig)
      if (this.status.readingConfig 
              && this.status.readingConfig.login
              && this.status.readingConfig.login.logo) {
        return this.config.baseURL + this.status.readingConfig.login.logo
      }
    }
  },
  components: {
    'media': Media,
  },
//  watch: {
//  },
  mounted() {
    //console.log('掛載！')
    this.init()
    
    //this.ttttt()  // for test
  },
  methods: {
    init () {
      if (!this.$refs.LoginModal) {
        setTimeout(() => {
          return this.init()
        }, 100)
        return false
      }
      
      this.$refs.LoginModal.show(() => {
        //console.log('this.status.progress.initComponents = true')
        this.status.progress.initComponents = true
      })
      this._loadFromLocalStorage()
    },
    _loadFromLocalStorage () {
      let username = localStorage.getItem(this.key + 'login.username')
      if (typeof(username) === 'string') {
        this.username = username
        this.isContinue = true
      }
      
      let password = localStorage.getItem(this.key + 'login.password')
      if (typeof(password) === 'string' 
              && password !== '') {
        this.password = password
        this.adminMode = true
      }
    },
    login: async function(event) {
      event.preventDefault()
      event.stopPropagation()
      
      //console.log('login 1')
      this.waiting = true
      let data = {
        username: this.username,
      }
      
      if (this.adminMode) {
        data.password = this.password
      }
      
      let result
      result = await this.lib.AxiosHelper.get(`/client/Auth/login`, data, (e) => {
        window.alert(this.$t('Login failed.'))
      })
      
      //console.log(result)
      
      if (typeof(result) !== 'object') {
        this.waiting = false
        return false
      }
      
      for (let name in result) {
        this.status[name] = result[name]
      }
      this.status.username = this.username
      
      if (this.adminMode === false) {
        this.password = ''
      }
      
      localStorage.setItem(this.key + 'login.username', this.username)
      localStorage.setItem(this.key + 'login.password', this.password)
      
      this.reset()
      this.$refs.LoginModal.hide()
      
      this.status.needLogin = false
      this.waiting = false
      //alert('成功登入了，然後呢？')
      
      return false
    },
    reset: function () {
      this.username = ''
      this.password = ''
    },
    createMockupUsername () {
      let d = (new Date())
      let currentMS = d.getTime() + (d.getTimezoneOffset() * 1000)
      
      //this.username = 'Anon.' + currentMS.toString(36)
      this.username = '睨鳴' + currentMS.toString(36)
      this.password = ''
      this.adminMode = false
    },
    switchMode () {
      this.adminMode = !this.adminMode
      this.isContinue = false
    },
  } // methods
}

export default Login