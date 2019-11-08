import CompactNavigation from './../../components/CompactNavigation/CompactNavigation.vue'
import SearchInput from './../../components/CompactNavigation/SearchInput/SearchInput.vue'

let NavigationItems = {
  props: ['lib', 'status', 'config', 'progress', 'error'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
    }
  },
  components: {
    'compact-navigation': CompactNavigation,
    'search-input': SearchInput
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