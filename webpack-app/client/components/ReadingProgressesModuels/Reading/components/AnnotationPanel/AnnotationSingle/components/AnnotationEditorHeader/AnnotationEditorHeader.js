import UserInformation from './../UserInformation/UserInformation.vue'
import AnnotaionInstruction from './../AnnotaionInstruction/AnnotaionInstruction.vue'

let AnnotationEditorHeader = {
  props: ['status', 'config', 'type', 'editable'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
    }
  },
  components: {
    'user-information': UserInformation,
    'annotaion-instruction': AnnotaionInstruction
  },
  /*
  computed: {
  },
  watch: {
  },
  mounted() {
  },
  methods: {
  } // methods
   */
}

export default AnnotationEditorHeader