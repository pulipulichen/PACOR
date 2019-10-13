import Domains from './Domains/Domains.vue'
//import Materials from './Materials/Materials.vue'

let Clients = {
  props: ['lib', 'status', 'config', 'progress', 'error', 'view'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
    }
  },
  components: {
    'domains': Domains,
  },
  computed: {
  },
  watch: {
  },
  mounted() {
    this.status.title = this.$t('Client Management')
  },
  methods: {
  } // methods
}

export default Clients