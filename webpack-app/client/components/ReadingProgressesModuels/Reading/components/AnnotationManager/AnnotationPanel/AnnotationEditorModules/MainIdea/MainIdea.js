import UserInformation from './../components/UserInformation/UserInformation.vue'
import AnnotaionInstruction from './../components/AnnotaionInstruction/AnnotaionInstruction.vue'

let MainIdea = {
  props: ['lib', 'status', 'config'
    , 'annotationModule', 'annotationInstance'
    , 'heightPX', 'enableCollaboration'],
  data() {    
    this.$i18n.locale = this.config.locale
    
    let note = ''
    if (typeof(this.annotationInstance) === 'object'
            && typeof(this.annotationInstance.note) === 'string') {
      note = this.annotationInstance.note
    }
    
    return {
      note: note,
      noteReset: note
    }
  },
  components: {
    'user-information': UserInformation,
    'annotaion-instruction': AnnotaionInstruction
  },
  computed: {
    isNoteDifferent () {
      return (this.note !== this.noteReset)
    },
    enableAddAnnotation () {
      if (this.isNoteDifferent 
              && typeof(this.note) === 'string'
              && this.note !== '') {
        return true
      }
      return false
    },
    enableEditAnnotation () {
      return this.enableAddAnnotation
    },
    
    computedEditorStyle () {
      let height
      if (this.enableCollaboration === true
              && this.lib.style.isStackWidth()) {
        height = (this.lib.style.getClientHeight() / 2)
        height = `calc(${height}px - 12em)`
      }
      else {
        height = `calc(${this.heightPX}px - 12em)`
      }
      //console.log(height)
      return {
        height: height,
        //border: '1px solid red'
      }
    },
    /*
    editorConfig () {
      return {
        contents: this.note,
        style: {
          height: `calc(${this.heightVH}vh - 11em)`,
          //border: '1px solid red'
        }
      }
    }*/
  },
  watch: {
    'editorConfig.contents' (contents) {
      console.log(contents)
    }
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