import AnnotationComment from './AnnotationComment/AnnotationComment.vue'

let AnnotationDiscussionList = {
  props: ['lib', 'status', 'config'
    , 'heightPX', 'annotation'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      comments: [],
      noMore: false,
      page: 0,
      afterTime: null
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
      let data = {
        annotationID: this.annotation.id
      }
      
      let result = await this.lib.AxiosHelper.get('/client/AnnotationComment/init')
      this.comments = result.comments
      if (this.comments.length === 0) {
        this.noMore = true
      }
      //console.log('@TODO AnnotationDiscussionList.initComments()')
    },
    loadNextPage: async function () {
      this.page++
      let data = {
        annotationID: this.annotation.id,
        page: this.page
      }
      
      let result = await this.lib.AxiosHelper.get('/client/AnnotationComment/next')
      if (Array.isArray(result)) {
        this.comments = this.comments.concat(result)
      }
    },
    scrollList: function (event) {
      if (this.noMore === true) {
        return false
      }
      let element = event.target;
      if (element.scrollHeight - element.scrollTop === element.clientHeight) {
        //console.log('scrolled');
        this.loadNextPage()
      }
    },
    onCommentDelete (i) {
      this.comments.splice(i, 1)
    }
  } // methods
}

export default AnnotationDiscussionList