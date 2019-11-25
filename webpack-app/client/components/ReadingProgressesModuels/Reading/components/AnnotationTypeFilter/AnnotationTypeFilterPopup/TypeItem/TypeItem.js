let TypeItem = {
  props: ['lib', 'status', 'config', 'typeData'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
    }
  },
//  components: {
//  },
  computed: {
    isSelected () {
      return (this.status.search.findType === this.typeData.type)
    },
    username () {
      return this.lib.auth.username
    },
    myAvatar () {
      return this.status.avatar
    },
    othersUsername () {
      if (this.status.search.focusUser) {
        return this.lib.auth.getUsername(this.status.search.focusUser)
      }
    },
    othersAvatar () {
      if (this.status.search.focusUser) {
        return this.status.search.focusUser.avatar_url
      }
    },
    othersIsAll () {
      return (this.status.search.focusUser === null)
    },
    othersIsMe () {
      return (this.status.search.focusUser
              && this.status.search.focusUser.id === this.status.userID)
    },
    isOtherVisiable () {
      return (this.lib.auth.isEnableCollaboration 
              && !this.othersIsMe)
    }
  },
  watch: {
  },
  mounted() {
  },
  methods: {
    selectType () {
      this.status.search.findType = this.typeData.type
      this.lib.AnnotationTypeFilter.hide()
    }
  } // methods
}

export default TypeItem