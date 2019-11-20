import AnnotationComment from './AnnotationComment/AnnotationComment.vue'

let AnnotationDiscussionList = {
  props: ['lib', 'status', 'config'
    , 'heightPX', 'annotation'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      comments: [],
      commentCount: 0,
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
      //if (this.comments.length < 10) {
      //  return null
      //}
      
      return {
        'height': this.heightPX + 'px',
        'max-height': this.heightPX + 'px',
      }
    },
    computedContainerClass () {
      if (this.comments.length < 10) {
        return 'little-comments'
      }
    },
    AnnotationDiscussionInput () {
      return this.$parent.$refs.AnnotationDiscussionInput
    },
    commantIDList () {
      if (Array.isArray(this.comments)) {
        return this.comments.map(comment => comment.id)
      }
      else {
        return []
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
      
      //console.log(data)
      
      let result = await this.lib.AxiosHelper.get('/client/AnnotationComment/init', data)
      this.commentCount = result.commentCount
      this.comments = result.comments
      if (this.commentCount === 0) {
        this.noMore = true
        return null
      }
      //console.log('@TODO AnnotationDiscussionList.initComments()')
    },
    loadPrevPage: async function () {
      this.page++
      let data = {
        annotationID: this.annotation.id,
        page: this.page,
        excludeIDList: this.commantIDList
      }
      
      let result = await this.lib.AxiosHelper.get('/client/AnnotationComment/next')
      if (Array.isArray(result) === false
              || result.length === 0) {
        this.noMore = true
        return null
      }
      
      this.comments = result.concat(this.comments)
      this.commentCount = this.commentCount - result.length
    },
    autoLoadNextPage: async function () {
      throw new Error('autoLoadNextPage')
    },
    scrollList: function (event) {
      if (this.noMore === true) {
        return false
      }
      let element = event.target
      console.log('這邊要做成捲動到0的時候才顯示，有辦法嗎？')
      if (element.scrollTop === 0) {
        //console.log('scrolled');
        this.loadPrevPage()
      }
    },
    onCommentDelete (i) {
      this.comments.splice(i, 1)
    },
    onInputAdd (comment) {
      this.comments.unshift(comment)
    },
    onInputEdit (comment) {
      throw new Error('他應該會自己更新吧？')
    },
    onEdit (comment) {
      this.AnnotationDiscussionInput.comment = comment
    },
    focusInput () {
      this.AnnotationDiscussionInput.$refs.input.focus()
    }
  } // methods
}

export default AnnotationDiscussionList