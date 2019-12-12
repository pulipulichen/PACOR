import UserInformation from './UserInformation/UserInformation.vue'
import AnnotaionInstruction from './AnnotaionInstruction/AnnotaionInstruction.vue'

let AnnotationEditorHeader = {
  props: ['status', 'config', 'lib', 'editable', 'annotation'],
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
    computedContainerClassList () {
      if (this.editable) {
        return 'edit-mode'
      }
      else {
        return 'display-mode'
      }
    }
  },
  /*
  watch: {
  },
  mounted() {
  },
  methods: {
  } // methods
   */
}

export default AnnotationEditorHeader