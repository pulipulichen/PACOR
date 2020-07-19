let ReaderCard = {
  props: ['lib', 'status', 'config', 'user', 'viewOnNewWindow'],
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
    },
    computedViewTarget: function () {
      if (this.viewOnNewWindow === true) {
        return '_blank'
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

export default ReaderCard