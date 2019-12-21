let UserAvatarIcons = {
  props: ['lib', 'status', 'config'
    , 'users', 'userCount', 'clickable'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
    }
  },
//  components: {
//  },
//  computed: {
//  },
//  watch: {
//  },
//  mounted() {
//  },
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
      let opacity = 1 - (0.1 * i)
      let style = {
        'z-index': zIndex,
        opacity: opacity
      }
      
      if (this.clickable !== false) {
        style.cursor = 'pointer'
      }
      
      return style
    }
  } // methods
}

export default UserAvatarIcons