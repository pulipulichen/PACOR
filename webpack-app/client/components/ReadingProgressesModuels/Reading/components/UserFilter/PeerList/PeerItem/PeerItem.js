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
      if (!this.user) {
        return this.filterData.allAnnotationTypes
      }
      else {
        return this.user.annotationTypes
      }
    },
    computedItemClassList () {
      let classList = []
      if (this.user === null && this.filterData.selectUser === null) {
        classList.push('selected')
      }
      else if (this.filterData.selectUser === this.user) {
        classList.push('selected')
      }
        
      return classList.join(' ')
    }
  },
//  watch: {
//  },
//  mounted() {
//  },
//  methods: {
//  } // methods
}

export default PeerItem