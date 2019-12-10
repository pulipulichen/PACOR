let Auth = {
  props: ['lib', 'status', 'config', 'progress', 'error'],
  data() {
    return {}
  },
  mounted: async function () {
    await this.checkLogin()
    this.progress.display = true
  },
  methods: {
    checkLogin: async function () {
      var result = await this.lib.AxiosHelper.get(`/admin/auth/checkLogin`)
      
      if (typeof(result) !== 'object') {
        return false
        // 不做任何警告
      }
      
      this.status.username = result.username
      this.status.displayName = result.displayName
      this.status.avatar = result.avatar
      this.status.role = result.role
      this.status.domainID = result.domainID
      this.status.needLogin = false
    }
  } // methods
}

export default Auth