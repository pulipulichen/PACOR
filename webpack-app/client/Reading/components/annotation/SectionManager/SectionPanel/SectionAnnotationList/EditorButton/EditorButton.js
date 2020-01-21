let SectionAnnotationEditorButton = {
  props: ['lib', 'status', 'config'
    , 'sectionSeqID', 'sectionsData', 'myAnnotation'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
    }
  },
  computed: {
//    myAnnotation () {
//      //window.PACORTestManager.log(this.annotations.length)
//      for (let i = 0; i < this.annotations.length; i++) {
//        if (this.annotations[i].user_id === this.status.userID) {
//          return this.annotations[i]
//        }
//      }
//      return null
//    },
    annotation () {
      if (this.myAnnotation) {
        return this.myAnnotation
      }
      
      return this.lib.SectionManager.buildDefaultSectionAnnotation(this.sectionSeqID)
    }
  },
//  watch: {
//  },
//  mounted() {
//  },
  methods: {
    openSectionAnnotationEditor () {
      this.lib.AnnotationPanel.setAnnotation(this.annotation, {
        'add': (annotation) => {
          this.onAnnotationAdd(annotation)
        },
        'update': (annotation) => {
          this.onAnnotationUpdate(annotation)
        }
      })
    },
    onAnnotationAdd (annotation) {
      this._initSectionsDataAnnotation()
      //this.sectionsData.annotation[this.sectionSeqID].annotations.unshift(annotation)
      this.sectionsData.annotation[this.sectionSeqID].myAnnotation = annotation
      this.sectionsData.annotation[this.sectionSeqID].users.push(annotation.user)
      
      console.log(this.sectionsData.annotation[this.sectionSeqID])
    },
    _initSectionsDataAnnotation () {
      if (Array.isArray(this.sectionsData.annotation) === false) {
        this.sectionsData.annotation = []
      }
      while (typeof(this.sectionsData.annotation[this.sectionSeqID]) !== 'object') {
        this.sectionsData.annotation.push({
          annotations: [],
          myAnnotation: null,
          users: []
        })
      }
      
      if (Array.isArray(this.sectionsData.annotation[this.sectionSeqID].users) === false) {
        this.sectionsData.annotation[this.sectionSeqID].users = []
      }
      
      if (Array.isArray(this.sectionsData.annotation[this.sectionSeqID].annotations) === false) {
        this.sectionsData.annotation[this.sectionSeqID].annotations = []
      }
    },
    onAnnotationUpdate (annotation) {
      this._initSectionsDataAnnotation()
      //this.sectionsData.annotation[this.sectionSeqID].annotations.unshift(annotation)
      this.sectionsData.annotation[this.sectionSeqID].myAnnotation = annotation
      /*
      for (let i = 0; i < this.annotations.length; i++) {
        if (this.annotations[i].user_id === this.status.userID) {
          this.sectionsData.annotation[this.sectionSeqID].annotations[i] = annotation
        }
      }
       */
    }
  } // methods
}

export default SectionAnnotationEditorButton