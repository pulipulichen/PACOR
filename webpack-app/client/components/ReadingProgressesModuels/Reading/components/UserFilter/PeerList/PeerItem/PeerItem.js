let PeerItem = {
  props: ['lib', 'status', 'config', 'user'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
    }
  },
//  components: {
//  },
  computed: {
    avatar () {
      return 'http://127.0.0.1:3333/avatars/fox-icon.png'
    },
    username () {
      if (!this.user) {
        return this.$t('All')
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
    }
  },
  watch: {
  },
  mounted() {
  },
  methods: {
  } // methods
}

export default PeerItem