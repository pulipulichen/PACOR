let ReaderCard = {
  props: ['lib', 'status', 'config', 'user'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
    }
  },
  components: {
  },
  computed: {
    userDashboardLink: function () {
      return '#/user-dashboard/' + this.$route.params.webpageID + '/' + this.user.id
    }
  },
  watch: {
  },
  mounted() {
  },
  methods: {
  } // methods
}

export default ReaderCard