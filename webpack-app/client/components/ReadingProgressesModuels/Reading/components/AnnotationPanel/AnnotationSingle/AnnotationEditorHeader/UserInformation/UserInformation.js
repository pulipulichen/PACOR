let UserInformation = {
  props: ['config', 'status', 'annotation'],
  data() {    
    //this.$i18n.locale = this.config.locale
    return {
    }
  },
  computed: {
    //user () {
    //  return this.annotation.user
    //},
    username () {
      let user = this.status
      if (typeof(this.annotation.user) === 'object') {
        user = this.annotation.user
      }
      if (typeof(user.displayName) === 'string') {
        return user.displayName
      }
      else {
        return user.username
      }
    },
    type () {
      return this.annotation.type
    },
    avatar () {
      if (typeof(this.annotation.user) === 'object') {
        return this.annotation.user.avatar_url
      }
      else {
        return this.status.avatar
      }
    }
  },
  /*
  components: {
  },
  
  watch: {
  },
  mounted() {
  },
  methods: {
  } // methods
  */
}

export default UserInformation