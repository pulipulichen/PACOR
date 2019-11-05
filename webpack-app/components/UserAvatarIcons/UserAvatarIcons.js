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
    computedAvatarStyle (i) {
      // {'z-index': (users.length - i)}
      let zIndex = (this.users.length - i)
      let opacity = 1 - (0.2 * i)
      return {
        'z-index': zIndex,
        opacity: opacity
      }
    }
  } // methods
}

export default UserAvatarIcons