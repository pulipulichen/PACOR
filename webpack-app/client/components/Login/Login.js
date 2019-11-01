let Login = {
  props: ['lib', 'status', 'config', 'progress', 'error'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      username: 'a',
      password: '',
      waiting: false,
      adminMode: false
    }
  },
  computed: {
    isDisableLogin: function () {
      if (this.username === '') {
        return true
      }
      
      if (this.adminMode === false) {
        return false
      }
      
      if (this.password === '') {
        return false
      }
      
      if (this.waiting === true) {
        return false
      }
      
      return true
    },
    agreementLink: function () {
      return this.config.baseURL + '/client/webpage/agreement'
    }
  },
  watch: {
  },
  mounted() {
    this.$refs.LoginModal.show()
  },
  methods: {
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