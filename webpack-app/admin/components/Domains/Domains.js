let Domains = {
  props: ['lib', 'status', 'config', 'progress', 'error', 'view'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      create: {
        domain: '',
        title: '',
        admins: '',
        config: ''
      },
      pageConfig: {
        page: 1,
        maxPage: 0
      }
    }
  },
  components: {
  },
  computed: {
  },
  watch: {
  },
  mounted() {
  },
  methods: {
  } // methods
}

export default Domains