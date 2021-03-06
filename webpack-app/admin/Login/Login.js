let Login = {
  props: ['lib', 'status', 'config'],
  data: function () {
    if (this.config) {
      this.$i18n.locale = this.config.locale
    }
    return {
      
//      domain: '',
//      username: '',
//      password: '',
      
      domain: '',
      username: 'admin',
      password: 'password',
      //password: '',
    }
  },
  computed: {
    isLoginEnable() {
      return (this.username.trim() !== ''
              && this.password.trim() !== '')
    }
  },
  watch: {
    config () {
      if (this.config) {
        this.$i18n.locale = this.config.locale
      }
    }
  },
//  mounted() {
//  },
  methods: {
    login: async function() {
      
      let result = await this.lib.AxiosHelper.get(`/admin/auth/login`, {
        domain: this.domain,
        username: this.username,
        password: this.password,
      })
      
      if (typeof(result) !== 'object') {
        //this.errorMessage = this.$t(`Authentication failed.`)
        throw this.$t(`Authentication failed.`)
        return false
      }      
      
      this.status.username = this.username
      this.status.displayName = result.displayName
      this.status.avatar = result.avatar
      this.status.role = result.role
      this.status.domainID = result.domainID
      
      this.status.needLogin = false
      this.reset()
    },
    reset: function () {
      this.username = ''
      this.password = ''
      this.error = ''
    }
  } // methods
}

export default Login