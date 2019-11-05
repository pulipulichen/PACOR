let UserAvatarIcons = {
  props: ['lib', 'status', 'config', 'users'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
    }
  },
  components: {
  },
  computed: {
  },
  watch: {
  },
  mounted() {
  },
  methods: {
    username (user) {
      if (typeof(user.displayName) === 'string') {
        return user.displayName
      }
      else {
        return user.username
      }
    },
  } // methods
}

export default UserAvatarIcons