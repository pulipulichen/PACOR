import AnnotationComment from './AnnotationComment/AnnotationComment.vue'
import $ from 'jquery'

let AnnotationDiscussionList = {
  props: ['lib', 'status', 'config'
    , 'panelData'
    , 'heightPX', 'annotation', 'hook'],
  data() {    
    this.$i18n.locale = this.config.locale
    
    let noMoreNewer = true
    if (this.panelData.focusCommentID) {
      noMoreNewer = false
    }
    
    return {
      comments: [],
      
      olderCommentCount: 0,
      newerCommentCount: 0,
      
      noMoreOlder: false,
      noMoreNewer: noMoreNewer,
      
      oldestCommnetTime: null,
      newestCommnetTime: null,
      
      //page: 0,
      //afterTime: null,
      
      loadLock: false,
      
      list: null  // 暫存實體元素
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
//    commantIDList () {
//      if (Array.isArray(this.comments)) {
//        return this.comments.map(comment => comment.id)
//      }
//      else {
//        return []
//      }
//    }
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
      
      if (this.panelData.focusCommentID) {
        data.commentID = this.panelData.focusCommentID
        //this.panelData.focusCommentID = null
      }
      
      //console.log(data)
      
      let result = await this.lib.AxiosHelper.get('/client/AnnotationComment/init', data)
      this.comments = result.comments
      
      if (result.olderCommentCount) {
        this.olderCommentCount = result.olderCommentCount
        if (this.olderCommentCount === 0) {
          this.noMoreOlder = true
          return null
        }
        else {
          this.oldestCommentTime = this.comments[0].created_at_unixms
        }
      }
      if (result.newerCommentCount) {
        this.newerCommentCount = result.newerCommentCount
        if (this.newerCommentCount === 0) {
          this.noMoreNewer = true
        }
        else {
          let i = this.comments.length - 1
          this.newestCommentTime = this.comments[i].created_at_unixms
        }
      }
      
      //console.log('@TODO AnnotationDiscussionList.initComments()')
      this.scrollToBottom()
    },
    scrollToBottom () {
      setTimeout(() => {
        this.list = $(this.$refs.list)
        let focusComment
        if (!this.panelData.focusCommentID) {
          focusComment = this.list.children('.AnnotationComment:last')
        }
        else {
          focusComment = this.list.children(`.AnnotationComment[data-comment-id="${this.panelData.focusCommentID}"]`)
          this.panelData.focusCommentID = null
        }
        focusComment[0].scrollIntoView({
          behavior: 'smooth'
        })
        
        setTimeout(() => {
          this.loadLock = false
        }, 500)
        //window.list = list
        //list.scrollTop = list.scrollHeight
        
      }, 100)
    },
    loadOlder: async function () {
      console.log('loadOlder')
      if (this.loadLock === true) {
        return null
      }
      this.loadLock = true
      
      // 先記好最上面一個
      let firstComment = this.list.children('.AnnotationComment:first')
      
      //this.page++
      let data = {
        annotationID: this.annotation.id,
        beforeTime: this.oldestCommentTime
        //page: this.page,
        //excludeIDList: this.commantIDList
      }
      
      
      let result = await this.lib.AxiosHelper.get('/client/AnnotationComment/next', data)
      if (Array.isArray(result) === false
              || result.length === 0) {
        this.noMoreOlder = true
        return null
      }
      
      this.comments = result.concat(this.comments)
      this.olrderCommentCount = this.olrderCommentCount - result.length
      
      setTimeout(() => {
        firstComment[0].scrollIntoView()
        
        setTimeout(() => {
          this.loadLock = false
        }, 500)
      }, 100)
    },
    loadNewer: async function () {
      if (this.loadLock === true) {
        return null
      }
      this.loadLock = true
      
      // 先記好最上面一個
      let focusComment = this.list.children('.AnnotationComment:last')
      
      //this.page++
      let data = {
        annotationID: this.annotation.id,
        afterTime: this.newestCommentTime
        //page: this.page,
        //excludeIDList: this.commantIDList
      }
      
      
      let result = await this.lib.AxiosHelper.get('/client/AnnotationComment/next', data)
      if (Array.isArray(result) === false
              || result.length === 0) {
        this.noMoreNewer = true
        return null
      }
      
      this.comments = this.comments.concat(result)
      this.newerCommentCount = this.newerCommentCount - result.length
      
      setTimeout(() => {
        focusComment[0].scrollIntoView()
        
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
      
      if (this.noMoreOlder === true 
              && this.noMoreNewer === true) {
        return false
      }
      
      let element = event.target
      //console.log(element.scrollTop, this.noMoreOlder, this.noMoreNewer, this.loadLock)
      if (element.scrollTop === 0) {
        if (this.noMoreOlder === true) {
          return false
        }
        //console.log('scrolled');
        this.loadOlder()
      }
      else if (element.scrollHeight - element.scrollTop === element.clientHeight) {
        if (this.noMoreNewer === true) {
          return false
        }
        //console.log('scrolled');
        this.loadNewer()
      }
    },
    onCommentDelete (i) {
      this.comments.splice(i, 1)
      this.annotation.__meta__.comments_count--
      this.annotation.__meta__.i_have_commented_count--
    },
    onInputAdd (comment) {
      this.comments.push(comment)
      this.noMoreOlder = false
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
      
      if (typeof(this.hook.commentLike) === 'function') {
        this.hook.commentLike(comment)
      }
    }
  } // methods
}

export default AnnotationDiscussionList