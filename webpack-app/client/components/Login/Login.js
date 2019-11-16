import Media from 'vue-media'

let Login = {
  props: ['lib', 'status', 'config', 'progress', 'error'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      username: 'a',
      password: '',
      waiting: false,
      adminMode: false,
      key: 'PACOR.client.components.Login.',
      compactWidth: 480,
      isCompactMode: false
    }
  },
  computed: {
    isDisableLogin: function () {
      if (this.waiting === true) {
        return true
      }
      
      if (this.adminMode === false) {
        return (this.username === '')
      }
      else {
        return (this.username === '' || this.password === '')
      }
      
      return true
    },
    agreementLink: function () {
      return this.config.baseURL + '/client/webpage/agreement'
    },
    computedFormClassList () {
      if (this.isCompactMode === false) {
        return 'ten wide column'
      }
      else {
        return 'sixteen wide column'
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
    this.$refs.LoginModal.show()
    this._loadFromLocalStorage()
  },
  methods: {
    _loadFromLocalStorage () {
      let username = localStorage.getItem(this.key + 'login.username')
      if (typeof(username) === 'string') {
        this.username = username
      }
      
      let password = localStorage.getItem(this.key + 'login.password')
      if (typeof(password) === 'string') {
        this.password = password
      }
    },
    login: async function() {
      this.waiting = true
      let data = {
        username: this.username,
      }
      
      if (this.adminMode) {
        data.password = this.password
      }
      
      let result = await this.lib.AxiosHelper.get(`/client/Auth/login`, data)
      
      if (typeof(result) !== 'object') {
        return false
      }
      
      for (let name in result) {
        this.status[name] = result[name]
      }
      this.status.username = this.username
      
      localStorage.setItem(this.key + 'login.username', this.username)
      localStorage.setItem(this.key + 'login.password', this.password)
      
      this.reset()
      this.$refs.LoginModal.hide()
      
      this.status.needLogin = false
      this.waiting = false
      //alert('成功登入了，然後呢？')
    },
    reset: function () {
      this.username = ''
      this.password = ''
    }
  } // methods
}

export default Login