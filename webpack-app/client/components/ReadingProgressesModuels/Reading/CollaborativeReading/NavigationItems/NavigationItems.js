import AnnotationTypeFilter from './../AnnotationTypeFilter/AnnotationTypeFilter.vue'
import NotificationManager from './../NotificationManager/NotificationManager.vue'
import UserSelector from './../UserSelector/UserSelector.vue'

let NavigationItems = {
  props: ['lib', 'status', 'config', 'progress', 'error'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
    }
  },
  components: {
    'annotation-type-filter': AnnotationTypeFilter,
    'notification-manager': NotificationManager,
    'user-selector': UserSelector,
  },
//  
//  computed: {
//  },
//  watch: {
//  },
//  mounted() {
//  },
  methods: {
    showInstruction () {
      this.$emit('showInstruction')
    }
  } // methods
}

export default NavigationItems