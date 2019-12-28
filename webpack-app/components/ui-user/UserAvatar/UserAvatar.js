let UserAvatar = {
  props: ['lib', 'status', 'config', 'user'],
  data() {    
    this.$i18n.locale = this.config.locale
    
    let dataUser
    if (this.user) {
      dataUser = this.user
    }
    else {
      dataUser = this.lib.auth.annotationUserData
    }
    
    return {
      dataUser
    }
  },
//  components: {
//  },
  computed: {
    avatarURL () {
      return this.dataUser.avatar_url
    },
    username() {
      let user = this.dataUser
      if (typeof(user.displayName) === 'string') {
        return user.displayName
      }
      else {
        return user.username
      }
    },
    isYou () {
      return (this.dataUser.id === this.status.userID)
    },
    isAdmin () {
      let role = this.dataUser.role
      
      return (role === 'domain_admin' 
              || role === 'global_admin')
    }
  },
//  watch: {
//  },
//  mounted() {
//  },
//  methods: {
//  } // methods
}

export default UserAvatar