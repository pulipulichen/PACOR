import NotificationIcon from './../../components/NotificationManager/NotificationIcon/NotificationIcon.vue'
import UserFilter from './../../components/UserFilter/UserFilter.vue'
import WebpageAdminModal from './WebpageAdminModal/WebpageAdminModal.vue'

//import AnnotationTypeFilter from './../../components/AnnotationTypeFilter/AnnotationTypeFilter.vue'

let NavigationItems = {
  props: ['lib', 'status', 'config'],
  data() {    
    this.$i18n.locale = this.config.locale
    
    return {
    }
  },
  components: {
    //'annotation-type-filter': AnnotationTypeFilter,
    'notification-icon': NotificationIcon,
    'user-filter': UserFilter,
    WebpageAdminModal
  },
//  
//  computed: {
//  },
//  watch: {
//    '$refs.UserFilter' (UserFilter) {
//      if (UserFilter) {
//        this.lib.UserFilter = this.$refs.UserFilter
//      }
//    },
//    '$refs.AnnotationTypeFilter' (AnnotationTypeFilter) {
//      if (AnnotationTypeFilter) {
//        
//        console.log(this.$refs.AnnotationTypeFilter)
//        this.lib.AnnotationTypeFilter = this.$refs.AnnotationTypeFilter
//      }
//    }
//  },
//  mounted() {
//    this.initLibComponents()
//  },
  methods: {
    showWebpageConfig () {
      this.$refs.WebpageAdminModal.show()
    },
//    nextStep () {
//      this.lib.auth.nextStep()
//    }
  } // methods
}

export default NavigationItems