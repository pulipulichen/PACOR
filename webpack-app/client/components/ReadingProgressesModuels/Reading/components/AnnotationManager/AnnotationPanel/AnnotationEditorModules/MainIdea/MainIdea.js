import AnnotationEditorHeader from './../components/AnnotationEditorHeader/AnnotationEditorHeader.vue'

let MainIdea = {
  props: ['lib', 'status', 'config'
    , 'annotationModule', 'annotationInstance'
    , 'heightPX', 'annotationConfig', 'anchorPosition'],
  data() {
    this.$i18n.locale = this.config.locale
    
    let note = ''
    if (this.annotationInstance !== null 
            && typeof(this.annotationInstance) === 'object'
            && typeof(this.annotationInstance.note) === 'string') {
      note = this.annotationInstance.note
    }
    
    return {
      note: note,
      noteReset: note,
      public: true
    }
  },
  components: {
    'annotation-editor-header': AnnotationEditorHeader
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
  },
//  watch: {
//  },
//  mounted() {
//  },
  methods: {
    addAnnotation () {
      console.warning('#TODO addAnnotation')
      
      let annotationInstance = {
        'paragraphy_seq_id': 0,
        'paragraphy_id': 0,
        'start_pos': 0,
        'end_pos': 0,
        'type': '',
        'note': '',
        'private': false,
      }
    },
    editAnnotation () {
      throw '#TODO editAnnotation'
    },
    deleteAnnotation () {
      if (window.confirm(this.$t('Are you sure to delete this annotation?'))) {
        let data = {
          id: this.annotationInstance.id
        }
        
        throw '這邊要處理highlight的部分'
        
        this.lib.AxiosHelper.get('/client/resource/Annotation/destroy', data)
        
        return this.$emit('hide') // 跟上層說關閉視窗
      }
      console.error('#TODO deleteAnnotation')
    },
    hide () {
      this.$parent.hide()
    }
  } // methods
}

export default MainIdea