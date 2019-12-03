import NotificationIcon from './../NotificationManager/NotificationIcon/NotificationIcon.vue'
import UserFilter from './../../components/UserFilter/UserFilter.vue'
//import AnnotationTypeFilter from './../../components/AnnotationTypeFilter/AnnotationTypeFilter.vue'



let NavigationItems = {
  props: ['lib', 'status', 'config', 'progress', 'error'],
  data() {    
    this.$i18n.locale = this.config.locale
    
    let pauseAtStart = this.lib.auth.currentStepConfig.debug.countdownPause

    if (pauseAtStart === true) {
      console.log('@test pauseAtStart')
    }

    return {
      pauseAtStart
    }
  },
  components: {
    //'annotation-type-filter': AnnotationTypeFilter,
    'notification-icon': NotificationIcon,
    'user-filter': UserFilter
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
    showInstruction () {
      this.$emit('showInstruction')
    },
//    nextStep () {
//      this.lib.auth.nextStep()
//    }
  } // methods
}

export default NavigationItems