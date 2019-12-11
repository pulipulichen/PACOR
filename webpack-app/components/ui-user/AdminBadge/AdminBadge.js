let AdminBadge = {
  props: ['config', 'status', 'user'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
    }
  },
//  components: {
//  },
  computed: {
    isAdmin () {
      let role
      if (this.user) {
        role = this.user.role
      }
      else {
        role = this.status.role
      }
      
      return (role === 'domain_admin' 
              || role === 'global_admin')
    }
  },
//  watch: {
//  },
//  mounted() {
//  },
//  methods: {
//  } // methods
}

export default AdminBadge