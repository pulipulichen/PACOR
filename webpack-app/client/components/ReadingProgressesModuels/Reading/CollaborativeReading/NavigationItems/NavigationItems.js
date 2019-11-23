import NotificationManager from './../NotificationManager/NotificationManager.vue'
import UserFilter from './../../components/UserFilter/UserFilter.vue'
//import AnnotationTypeFilter from './../../components/AnnotationTypeFilter/AnnotationTypeFilter.vue'

let NavigationItems = {
  props: ['lib', 'status', 'config', 'progress', 'error'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
    }
  },
  components: {
    //'annotation-type-filter': AnnotationTypeFilter,
    'notification-manager': NotificationManager,
    'user-filter': UserFilter
  },
//  
//  computed: {
//  },
  watch: {
    '$refs.UserFilter' (UserFilter) {
      if (UserFilter !== null) {
        this.lib.UserFilter = UserFilter
      }
    },
    '$refs.AnnotationTypeFilter' (AnnotationTypeFilter) {
      if (AnnotationTypeFilter !== null) {
        this.lib.AnnotationTypeFilter = AnnotationTypeFilter
      }
    }
  },
  mounted() {
    this.initLibComponents()
  },
  methods: {
    initLibComponents () {
      if (this.$refs.UserFilter !== null) {
        this.lib.UserFilter = this.$refs.UserFilter
      }
      if (this.$refs.AnnotationTypeFilter !== null) {
        this.lib.AnnotationTypeFilter = this.$refs.AnnotationTypeFilter
      }
    },
    showInstruction () {
      this.$emit('showInstruction')
    }
  } // methods
}

export default NavigationItems