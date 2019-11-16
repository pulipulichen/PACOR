let AdminBadge = {
  props: ['config', 'status'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
    }
  },
//  components: {
//  },
  computed: {
    isAdmin () {
      return (this.status.role === 'domain_admin' 
              || this.status.role === 'global_admin')
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