import AnnotationComment from './AnnotationComment/AnnotationComment.vue'

let AnnotationDiscussionList = {
  props: ['lib', 'status', 'config'
    , 'heightPX', 'annotation'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      comments: []
    }
  },
  components: {
    'annotation-comment': AnnotationComment
  },
  computed: {
    computedContainerStyle () {
      return {
        'height': this.heightPX + 'px',
        'max-height': this.heightPX + 'px',
      }
    }
  },
  watch: {
    annotation () {
      this.initComments()
    }
  },
  mounted() {
    this.initComments()
  },
  methods: {
    initComments: async function () {
      console.log('@TODO AnnotationDiscussionList.initComments()')
    }
  } // methods
}

export default AnnotationDiscussionList