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
    enableEditAnnotation () {
      return false
    },
    enableAddAnnotation () {
      return false
    }
  },
  watch: {
  },
  mounted() {
  },
  methods: {
    editAnnotation () {
      console.error('#TODO editAnnotation')
    },
    deleteAnnotation () {
      console.error('#TODO deleteAnnotation')
    },
    addAnnotation () {
      console.error('#TODO addAnnotation')
    },
    hide () {
      this.$parent.hide()
    }
  } // methods
}

export default MainIdea