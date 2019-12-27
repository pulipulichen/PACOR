let PeerItem = {
  props: ['lib', 'status', 'config'
    , 'user', 'filterData'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
    }
  },
//  components: {
//  },
  computed: {
    isReader () {
      if (this.user) {
        return (this.user.role === 'reader')
      }
      else {
        return true
      }
    },
    avatar () {
      return this.user.avatar_url
    },
    username () {
      if (!this.user) {
        return this.$t('View All')
      }
      
      let user = this.user
      
      if (typeof(user.displayName) === 'string') {
        return user.displayName
      }
      else {
        return user.username
      }
    },
    annotationTypes () {
      //console.log(this.user)
      if (!this.user) {
        return this.filterData.allAnnotationTypes
      }
      else {
        return this.user.annotationTypes
      }
    },
    computedItemClassList () {
      let classList = []
      
      if (this.user && 
              (this.user.annotationTypes.length === 0 )) {
        classList.push('disabled')
      }
      
      //console.log('computedItemClassList')
      if (!this.user && !this.filterData.selectUser) {
        classList.push('selected')
      }
      else if (this.filterData.selectUser 
              && this.user 
              && this.filterData.selectUser.id === this.user.id) {
        classList.push('selected')
      }
        
      return classList.join(' ')
    },
    isReady () {
      if (!this.user) {
        return true
      }
      else if (this.user && this.user.isReady === true) {
        return true
      }
      else {
        return false
      }
    },
    isExited () {
      if (!this.user) {
        return false
      }
      else if (this.user && this.user.isExited === true) {
        return true
      }
      else {
        return false
      }
    },
    group () {
      if (!this.user
              || !this.user.groups
              || !this.user.groups[0]) {
        return undefined
      }
      
      return this.user.groups[0].group_seq_id + 1
    },
  },
//  watch: {
//  },
//  mounted() {
//  },
  methods: {
    onSelectPeer () {
      if (this.user && (this.annotationTypes.length === 0)) {
        return null
      }
      //console.log(this.user)
      //this.$set(this.filterData, 'selectUser', this.user)
      this.filterData.selectUser = this.user
      //console.log(this.filterData.selectUser)
    }
  } // methods
}

export default PeerItem