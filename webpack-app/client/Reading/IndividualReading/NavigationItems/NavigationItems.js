//import AnnotationTypeFilter from './../../components/AnnotationTypeFilter/AnnotationTypeFilter.vue'
import CompactNavigation from './CompactNavigation/CompactNavigation.vue'

let NavigationItems = {
  props: ['lib', 'status', 'config'],
  data() {    
    this.$i18n.locale = this.config.locale
    
    let pauseAtStart = this.lib.auth.currentStepConfig.debug.countdownPause

    if (pauseAtStart === true) {
      console.log('@test pauseAtStart')
    }
    //console.log(pauseAtStart)
    return {
      pauseAtStart,
//      isSideMenuDisplay: false
    }
  },
  components: {
    "compact-navigation": CompactNavigation
  },
//  components: {
//    'annotation-type-filter': AnnotationTypeFilter,
//  },
//  
//  computed: {
//  },
  watch: {
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
      this.setupTutorial()
    },
    showInstruction () {
      this.$emit('showInstruction')
    },
    hideSideMenu () {
      this.$refs.nav.hideSideMenu()
    }
//    nextStep () {
//      this.lib.auth.nextStep()
//    }
  } // methods
}

import methodsTutorialNavigationItems from './methodsTutorialNavigationItems.js'
methodsTutorialNavigationItems(NavigationItems)

export default NavigationItems