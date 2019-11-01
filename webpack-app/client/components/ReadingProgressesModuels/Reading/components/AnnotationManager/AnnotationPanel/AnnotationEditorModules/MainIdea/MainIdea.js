import UserInformation from './../components/UserInformation/UserInformation.vue'

let MainIdea = {
  props: ['lib', 'status', 'config', 'annotationModule', 'error', 'view'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
    }
  },
  components: {
    'user-information': UserInformation
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

export default MainIdea