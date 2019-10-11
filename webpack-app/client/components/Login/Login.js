let Login = {
  props: ['lib', 'status', 'config', 'progress', 'error', 'view'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      username: '',
      email: '',
      password: '',
      /*
      username: 'pudding',
      email: 'pudding@nccu.edu.tw',
      password: 'test',
       */
      mode: 'login',
      errorMessage: '',
    }
  },
  computed: {
    isEmail() {
      if (this.email.trim() === '') {
        return true
      }
      return this.lib.StringHelper.validateEmail(this.email)
    },
    isLoginEnable() {
      return (this.username.trim() !== ''
              && this.password.trim() !== '')
    },
    isRegisterEnable() {
      return (this.isEmail === true 
              && this.username.trim() !== ''
              && this.email.trim() !== ''
              && this.password.trim() !== '')
    }
  },
  watch: {
  },
  mounted() {
  },
  methods: {
    register: async function() {
      if (this.mode !== 'register') {
        this.mode = 'register'
        return false
      }
      
      let result = await this.lib.AxiosHelper.get(`/client/user/register`, {
        username: this.username,
        email: this.email,
        password: this.password
      })
      
      let user = result
      if (typeof(user.error) === 'string') {
        if (user.error === 'user-is-existed') { 
          this.errorMessage = this.$t(`User {0} is registed.`, [this.username])
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
    loginFromOAuth(driver) {
      let width = 400
      if (width > screen.availWidth) {
        width = screen.availWidth
      }
      
      let height = 600
      if (height > screen.availHeight) {
        height = screen.availHeight
      }
      
      let dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX;
      let dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY;

      let screenWidth = screen.availWidth
      let screenHeight = screen.availHeight

      let left = ((screenWidth - width) / 2) + dualScreenLeft
      let top = ((screenHeight - height) / 2) + dualScreenTop
      
      let win = window.open(`${this.config.baseURL}/client/oauth/request/${driver}`, '_blank', `location=0,menubar=no,copyhistory=no,directories=0,status=0,width=${width},height=${height},top=${top},left=${left}`)
      this.loginOAuthCallback(driver, win)
    },
    loginOAuthCallback: function (driver, win) {
      let callback = async (event) => {
        if (event.origin !== this.config.baseURL) {
          return false
        }
        win.close()
        let data = event.data
        if (typeof(data) === 'object') {
          data.driver = driver
          let result = await this.lib.AxiosHelper.get(`/client/oauth/login`, data)
          if (result !== false) {
            this.status.username = result
          }
        }
        window.removeEventListener('message', callback, false)
      }
      window.addEventListener('message', callback, false);
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