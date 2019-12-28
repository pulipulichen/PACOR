let UserAvatar = {
  props: ['lib', 'status', 'config', 'user'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
    }
  },
//  components: {
//  },
  computed: {
    avatarURL () {
      return this.user.avatar_url
    },
    username() {
      let user = this.user
      if (typeof(user.displayName) === 'string') {
        return user.displayName
      }
      else {
        return user.username
      }
    },
    isYou () {
      return (this.user.id === this.status.userID)
    },
    isAdmin () {
      let role = this.user.role
      
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