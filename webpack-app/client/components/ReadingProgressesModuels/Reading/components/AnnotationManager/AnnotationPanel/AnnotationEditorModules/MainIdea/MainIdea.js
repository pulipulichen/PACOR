import UserInformation from './../components/UserInformation/UserInformation.vue'
import AnnotaionInstruction from './../components/AnnotaionInstruction/AnnotaionInstruction.vue'

let MainIdea = {
  props: ['lib', 'status', 'config', 'annotationModule', 'error', 'view'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
    }
  },
  components: {
    'user-information': UserInformation,
    'annotaion-instruction': AnnotaionInstruction
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