import AnnotationDiscussionList from './AnnotationDiscussionList/AnnotationDiscussionList.vue'
import AnnotationDiscussionInput from './AnnotationDiscussionInput/AnnotationDiscussionInput.vue'

let AnnotationDiscussion = {
  props: ['lib', 'status', 'config'
    , 'panelData'
    , 'annotation', 'heightPX', 'hook'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      comment: null,
      headerPadding: 110
    }
  },
  components: {
    'annotation-discussion-list': AnnotationDiscussionList,
    'annotation-discussion-input': AnnotationDiscussionInput
  },
  computed: {
    listHeightPX () {
      return this.heightPX - this.headerPadding
    }
  },
//  watch: {
//  },
//  mounted() {
//  },
  methods: {
    focusCommentInput () {
      this.$refs.AnnotationDiscussionInput.focus()
    },
    onInputAdd () {
      throw new Error('@TODO AnnotationDiscussion.onInputAdd()')
    },
    onInputEdit () {
      throw new Error('@TODO AnnotationDiscussion.onInputEdit()')
    },
    onInputCancel () {
      throw new Error('@TODO AnnotationDiscussion.onInputCancel()')
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