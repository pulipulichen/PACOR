//import NotificationIcon from './../../components/manager/NotificationManager/NotificationIcon/NotificationIcon.vue'
//import UserFilter from './../../components/search/UserFilter/UserFilter.vue'
//import AnnotationTypeFilter from './../../components/AnnotationTypeFilter/AnnotationTypeFilter.vue'

let NavigationItems = {
  props: ['lib', 'status', 'config'],
  data() {    
    this.$i18n.locale = this.config.locale
    
    let pauseAtStart = true
    if (this.lib.auth.currentStepConfig.debug
            && typeof(this.lib.auth.currentStepConfig.debug.countdownPause) === 'boolean') {
      pauseAtStart = this.lib.auth.currentStepConfig.debug.countdownPause
    }

    if (pauseAtStart === true) {
      console.log('@test pauseAtStart')
    }

    return {
      pauseAtStart,
      isSideMenuDisplay: false
    }
  },
  components: {
    //'annotation-type-filter': AnnotationTypeFilter,
    //'notification-icon': NotificationIcon,
    //'user-filter': UserFilter
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
//  mounted() {
//    this.initLibComponents()
//  },
  methods: {
    showInstruction () {
      this.$emit('showInstruction')
    },
    hideSideMenu () {
      this.$refs.nav.hideSideMenu()
    },
//    nextStep () {
//      this.lib.auth.nextStep()
//    }
  } // methods
}

export default NavigationItems