//import NotificationIcon from './../../components/manager/NotificationManager/NotificationIcon/NotificationIcon.vue'
//import UserFilter from './../../components/search/UserFilter/UserFilter.vue'
//import AnnotationTypeFilter from './../../components/AnnotationTypeFilter/AnnotationTypeFilter.vue'

import $ from 'jquery'

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
      isSideMenuDisplay: false,
      menu: null
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
//    'lib.TutorialManager' () {
//      if (!this.lib.TutorialManager) {
//        return false
//      }
//      this.setupTutorial()
//    }
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
//  watch: {
//    '$refs.DigitalCountdownTimer' (DigitalCountdownTimer) {
//      if (!DigitalCountdownTimer) {
//        return false
//      }
//      this.setupTutorial()
//    }
//  },
  mounted() {
    //this.initLibComponents()
    
    //setTimeout(() => {
    this.setupTutorial()
    //}, 500)
  },
  methods: {
    showInstruction () {
      this.$emit('showInstruction')
    },
    hideSideMenu () {
      this.$refs.nav.hideSideMenu()
    },
    getMenu () {
      if (!this.menu 
              && this.$refs.nav) {
        this.menu = $(this.$refs.nav.$refs.Menu)
      }
      return this.menu
    },
    setupTutorial () {
      this.lib.TutorialManager.addAction(() => {
        //console.log(this.getMenu().find('.NotificationIcon:visible:first').length)
        return {
          element: this.getMenu().find('.NotificationIcon:visible:first'),
          content: this.$t(`You will get notifications from other readers here.`),
          order: 32
        }
      })
      
      this.lib.TutorialManager.addAction(() => {
        return {
          element: this.getMenu().find('.UserFilter:visible:first'),
          content: this.$t('You can select a peer and watch what he/she read.'),
          order: 33
        }
      })
      
      this.lib.TutorialManager.addAction(() => {
        return {
          element: this.getMenu().find('.AnnotationTypeFilter:visible:first'),
          content: this.$t('You can choose a type of annotations to read.'),
          order: 34
        }
      })
      
      this.lib.TutorialManager.addAction(() => {
        return {
          element: this.$refs.DigitalCountdownTimer,
          content: this.$t('Collaborative Reading will end at count to 0.'),
          order: 39
        }
      })
    }
//    nextStep () {
//      this.lib.auth.nextStep()
//    }
  } // methods
}

export default NavigationItems