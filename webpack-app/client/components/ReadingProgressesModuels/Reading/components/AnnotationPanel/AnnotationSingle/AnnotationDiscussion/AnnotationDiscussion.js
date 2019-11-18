import AnnotationDiscussionList from './AnnotationDiscussionList/AnnotationDiscussionList'
import AnnotationDiscussionInput from './AnnotationDiscussionInput/AnnotationDiscussionInput'

let AnnotationDiscussion = {
  props: ['lib', 'status', 'config', 'annotation'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      comment: null
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
    },
    like () {
      throw new Error('@TODO AnnotationDiscussion.like()')
    },
    unlike () {
      throw new Error('@TODO AnnotationDiscussion.unlike()')
    },
  } // methods
}

export default AnnotationDiscussion