import NotificationManager from './../NotificationManager/NotificationManager.vue'
import UserFilter from './../../components/UserFilter/UserFilter.vue'
import AnnotationTypeFilter from './../../components/AnnotationTypeFilter/AnnotationTypeFilter.vue'

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
    'user-filter': UserFilter
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