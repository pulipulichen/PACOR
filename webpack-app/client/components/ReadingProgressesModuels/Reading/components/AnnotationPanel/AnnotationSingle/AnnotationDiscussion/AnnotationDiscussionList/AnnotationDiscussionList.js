import AnnotationComment from './AnnotationComment/AnnotationComment.vue'
import $ from 'jquery'

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
      afterTime: null,
      loadLock: false,
      
      list: null
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
      if (this.loadLock === true) {
        return null
      }
      this.loadLock = true
      
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
      this.scrollToBottom()
      
    },
    scrollToBottom () {
      setTimeout(() => {
        this.list = $(this.$refs.list)
        let lastComment = this.list.children('.AnnotationComment:last')
        lastComment[0].scrollIntoView({
          behavior: 'smooth'
        })
        
        setTimeout(() => {
          this.loadLock = false
        }, 500)
        //window.list = list
        //list.scrollTop = list.scrollHeight
        
      }, 100)
    },
    loadPrevPage: async function () {
      if (this.loadLock === true) {
        return null
      }
      this.loadLock = true
      
      // 先記好最上面一個
      let firstComment = this.list.children('.AnnotationComment:first')
      
      //this.page++
      let data = {
        annotationID: this.annotation.id,
        page: this.page,
        excludeIDList: this.commantIDList
      }
      
      
      let result = await this.lib.AxiosHelper.get('/client/AnnotationComment/next', data)
      if (Array.isArray(result) === false
              || result.length === 0) {
        this.noMore = true
        return null
      }
      
      this.comments = result.concat(this.comments)
      this.commentCount = this.commentCount - result.length
      
      setTimeout(() => {
        firstComment[0].scrollIntoView()
        
        setTimeout(() => {
          this.loadLock = false
        }, 500)
      }, 100)
    },
    autoLoadNextPage: async function () {
      throw new Error('autoLoadNextPage')
    },
    scrollList: function (event) {
      if (this.loadLock === true) {
        event.preventDefault()
        event.stopPropagation()
        //console.log('prevent default')
        return null
      }
      
      if (this.noMore === true) {
        return false
      }
      let element = event.target
      //console.log('這邊要做成捲動到0的時候才顯示，有辦法嗎？')
      if (element.scrollTop < 50) {
        //console.log('scrolled');
        this.loadPrevPage()
      }
    },
    onCommentDelete (i) {
      this.comments.splice(i, 1)
      this.annotation.__meta__.comments_count--
    },
    onInputAdd (comment) {
      this.comments.push(comment)
      this.scrollToBottom()
      this.annotation.__meta__.comments_count++
    },
    onInputEdit (comment) {
      setTimeout(() => {
        let element = this.list.find(`[data-comment-id="${comment.id}"]`)
        element[0].scrollIntoView({
          behavior: 'smooth'
        })
        element.transition('glow')
        
        setTimeout(() => {
          this.loadLock = false
        }, 500)
      }, 100)
      //throw new Error('他應該會自己更新吧？')
    },
    onEdit (comment) {
      this.AnnotationDiscussionInput.comment = comment
    },
    focusInput () {
      this.AnnotationDiscussionInput.$refs.input.focus()
    },
    onCommentLike: async function (comment) {
      let data = {
        commentID: comment.id
      }
      
      await this.lib.AxiosHelper.get('/client/AnnotationRate/likeComment', data)
    }
  } // methods
}

export default AnnotationDiscussionList