import List from './WebpageList/WebpageList.vue'
import Add from './WebpageAdd/WebpageAdd.vue'

let Webpage = {
  props: ['lib', 'status', 'config', 'progress', 'error', 'view'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      title: this.$t('Webpage'),
      componentView: null
    }
  },
  components: {
  },
  computed: {
  },
  watch: {
    '$route.params.action': function () {
      this.switchCompnent(this.$route.params.action)
    }
  },
  mounted() {
    if (isNaN(this.$route.params.domainID) === true) {
      this.$router.replace(`/webpage/${this.status.domainID}/list`)
    }
    
    this.switchCompnent(this.$route.params.action)
  },
  methods: {
    switchCompnent: function (action) {
      switch (action) {
        case 'list':
          this.componentView = List
          break
        case 'add':
          this.componentView = Add
          break
      }
    }
  } // methods
}

export default Webpage