import CompactNavigation from './../../components/CompactNavigation/CompactNavigation.vue'
import SearchManager from './../../components/SearchManager/SearchManager.vue'

let NavigationItems = {
  props: ['lib', 'status', 'config', 'progress', 'error'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
    }
  },
  components: {
    'compact-navigation': CompactNavigation,
    'search-manager': SearchManager
  }
//  
//  computed: {
//  },
//  watch: {
//  },
//  mounted() {
//  },
//  methods: {
//  } // methods
}

export default NavigationItems