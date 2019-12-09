let Referer = {
  props: ['lib'],
  data() {    
//    this.$i18n.locale = this.config.locale
    return {
    }
  },
//  components: {
//  },
//  computed: {
//  },
//  watch: {
//  },
  mounted: async function () {
    let url = this.$route.query.url
    //console.log('RefererRedirect212', this.$route.query.url)
    let query = {
      url
    }
    
    let webpageID = await this.lib.AxiosHelper.post('/Admin/Webpage/find', query)
    
    // http://127.0.0.1:3333/admin#/webpage-dashboard/2
    let dashboardURL = `/webpage-dashboard/` + webpageID
    
    this.$router.replace(dashboardURL)
  },
//  methods: {
//  } // methods
}

export default Referer