//import NotificationIcon from './../../components/manager/NotificationManager/NotificationIcon/NotificationIcon.vue'
//import UserFilter from './../../components/search/UserFilter/UserFilter.vue'
import WebpageAdminModal from './WebpageAdminModal/WebpageAdminModal.vue'

//import AnnotationTypeFilter from './../../components/AnnotationTypeFilter/AnnotationTypeFilter.vue'

let NavigationItems = {
  props: ['lib', 'status', 'config'],
  data() {    
    this.$i18n.locale = this.config.locale
    
    return {
      isSideMenuDisplay: false
    }
  },
  components: {
    //'annotation-type-filter': AnnotationTypeFilter,
    //'notification-icon': NotificationIcon,
    //'user-filter': UserFilter,
    WebpageAdminModal
  },
//  
  computed: {
    searchManagerSize () {
      if (this.isSideMenuDisplay === false) {
        return 'mini'
      }
    }
  },
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
  mounted() {
    //this.testShowWebpageConfig()
  },
  methods: {
    showWebpageConfig () {
      if (this.status.role !== 'reader') {
        this.$refs.WebpageAdminModal.show()
      }
      else {
        this.lib.TutorialManager.start()
      }
    },
    hideSideMenu () {
      this.$refs.nav.hideSideMenu()
    },
    // ----------------------------
    
    testShowWebpageConfig () {
      console.log('@TEST testShowWebpageConfig')
      this.showWebpageConfig()
    }
    
//    nextStep () {
//      this.lib.auth.nextStep()
//    }
  } // methods
}

export default NavigationItems