import NavigationItems from './NavigationItems/NavigationItems.vue'
import RangyManager from './../components/RangyManager/RangyManager.vue'

let IndividualReading = {
  props: ['lib', 'status', 'config', 'progress', 'error', 'view'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
    }
  },
  components: {
    'navigation-items': NavigationItems,
    'rangy': RangyManager
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

export default IndividualReading