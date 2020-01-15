let UserAvatarIcons = {
  props: ['lib', 'status', 'config'
    , 'users', 'userCount', 'clickable', 'assistUser'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      popup: null
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
    },
    clickUser (user, event) {
      if (this.assistUser !== true) {
        this.$emit('find', user)
      }
      else {
        this.popupUser(user, event)
      }
    },
    popupUser (user, event) {
      this.lib.tippy.popupUser(this, user, event)
    }
  } // methods
}

export default UserAvatarIcons