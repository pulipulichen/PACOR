let UserInformation = {
  props: ['status', 'annotationModule'],
  data() {    
    //this.$i18n.locale = this.config.locale
    return {
    }
  },
  computed: {
    username () {
      if (typeof(this.status.displayName) === 'string') {
        return this.status.displayName
      }
      else {
        return this.status.username
      }
    }
  },
  /*
  components: {
  },
  
  watch: {
  },
  mounted() {
  },
  methods: {
  } // methods
  */
}

export default UserInformation