let Login = {
  props: ['lib', 'status', 'config', 'progress', 'error', 'view'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      username: 'a',
      password: '',
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
      
      return true
    }
  },
  watch: {
  },
  mounted() {
    this.$refs.LoginModal.show()
  },
  methods: {
    login: async function() {
      let data = {
        username: this.username,
      }
      
      if (this.adminMode) {
        data.password = this.password
      }
      
      let result = await this.lib.AxiosHelper.get(`/client/Auth/login`, data)
      
      if (typeof(result) !== 'object') {
        return
      }
      
      for (let name in result) {
        this.status[name] = result[name]
      }
      this.status.username = this.username
      this.status.needLogin = false
      this.$refs.LoginModal.hide()
      alert('成功登入了，然後呢？')
      
      this.reset()
    },
    reset: function () {
      this.username = ''
      this.password = ''
    }
  } // methods
}

export default Login