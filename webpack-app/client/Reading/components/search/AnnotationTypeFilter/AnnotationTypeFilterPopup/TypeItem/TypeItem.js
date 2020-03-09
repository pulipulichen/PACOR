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
      if (this.status.filter.focusUser) {
        return this.lib.auth.getUsername(this.status.filter.focusUser)
      }
    },
    othersAvatar () {
      if (this.status.filter.focusUser) {
        return this.status.filter.focusUser.avatar_url
      }
    },
    othersIsAll () {
      //console.log(this.status.search.focusUser)
      return (!this.status.filter.focusUser)
    },
    othersIsMe () {
      return (this.status.filter.focusUser
              && this.status.filter.focusUser.id === this.status.userID)
    },
    isOtherVisiable () {
      return (this.lib.auth.isEnableCollaboration 
              && !this.othersIsMe)
    },
    isEnabled () {
      return  (this.typeData.myCount !== 0 
              || this.typeData.othersCount !== 0)
    },
    computedTypeItemClassList () {
      let classList = []
      
      if (this.isEnabled === false) {
        classList.push('disabled')
      }
      
      return classList.join(' ')
    }
  },
//  watch: {
//  },
//  mounted() {
//  },
  methods: {
    selectType () {
      if (this.isEnabled === false) {
        return false
      }
      
      this.status.filter.findType = this.typeData.type
      this.lib.AnnotationTypeFilter.hide()
    }
  } // methods
}

export default TypeItem