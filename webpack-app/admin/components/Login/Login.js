let Login = {
  props: ['lib', 'status', 'config', 'progress', 'error', 'view'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      username: '',
      password: '',
      /*
      username: 'pudding',
      password: 'test',
       */
      errorMessage: '',
    }
  },
  computed: {
    isLoginEnable() {
      return (this.username.trim() !== ''
              && this.password.trim() !== '')
    }
  },
  watch: {
  },
  mounted() {
  },
  methods: {
    login: async function() {
      this.mode = 'login'
      let result = await this.lib.AxiosHelper.get(`/client/user/login`, {
          username: this.username,
          password: this.password,
      })
      
      let user = result
      if (user === undefined) {
        this.errorMessage = this.$t(`User {0} is not existed.`, [this.username])
        return
      }      
      
      if (typeof(user.error) === 'string') {
        if (user.error === 'no-user') { 
          this.errorMessage = this.$t(`User {0} is not existed.`, [this.username])
        }
        else if (user.error === 'password-wrong') { 
          this.errorMessage = this.$t(`Password is incorrect.`, [this.username])
        }
        else {
          this.errorMessage = user.error
        }
        return false
      }
      else {
        this.status.username = this.username
        this.errorMessage = ''
        //this.$router.replace('chat')
        this.view = 'Chat'
        this.reset()
      }
    },
    reset: function () {
      this.username = ''
      this.email = ''
      this.password = ''
      this.errorMessage = ''
      this.mode = 'login'
    }
  } // methods
}

export default Login