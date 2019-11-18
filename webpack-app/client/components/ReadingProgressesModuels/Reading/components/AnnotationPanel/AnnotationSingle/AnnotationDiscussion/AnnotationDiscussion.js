import AnnotationDiscussionList from './AnnotationDiscussionList/AnnotationDiscussionList'
import AnnotationDiscussionInput from './AnnotationDiscussionInput/AnnotationDiscussionInput'

let AnnotationDiscussion = {
  props: ['lib', 'status', 'config', 'annotation'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
    }
  },
  components: {
    'annotation-discussion-list': AnnotationDiscussionList,
    'annotation-discussion-input': AnnotationDiscussionInput
  },
//  computed: {
//  },
//  watch: {
//  },
//  mounted() {
//  },
  methods: {
    comment () {
      this.$refs.AnnotationDiscussionInput.focus()
    }
  } // methods
}

export default AnnotationDiscussion