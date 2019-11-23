let UserSelfBadge = {
  props: ['config', 'status', 'user'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
    }
  },
//  components: {
//  },
  computed: {
    isYou () {
      return (this.user && this.user.id === this.status.userID)
    }
  },
}

export default UserSelfBadge