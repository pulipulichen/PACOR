let UserAvatar = {
  props: ['lib', 'status', 'config', 'annotation'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
    }
  },
//  components: {
//  },
  computed: {
    avatarURL () {
      return this.annotation.user.avatar_url
    },
    username() {
      let user = this.annotation.user
      if (typeof(user.displayName) === 'string') {
        return user.displayName
      }
      else {
        return user.username
      }
    },
    isYou () {
      return (this.annotation.user_id === this.status.userID)
    },
    isAdmin () {
      let role = this.annotation.user.role
      
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