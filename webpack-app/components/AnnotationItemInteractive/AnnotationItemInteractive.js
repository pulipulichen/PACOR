let AnnotationInteractive = {
  props: ['lib', 'status', 'config'
    , 'annotation', 'size', 'showLabel'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
    }
  },
//  components: {
//  },
  computed: {
    computedLikesButtonClass () {
      let classList = []
      if (!this.enableLike) {
        classList.push('disabled')
      }
      if (this.annotation.__meta__.i_have_liked === 1) {
        classList.push('green')
      }
      
      if (typeof(this.size) === 'string') {
        classList.push(this.size)
      }
      
      if (this.likes === 0 && this.showLabel === false) {
        classList.push('icon')
      }
      
      return classList.join(' ')
    },
    computedCommentsButtonClass () {
      let classList = []
      
      if (this.annotation.__meta__.i_have_commented === 1) {
        classList.push('green')
      }
      if (typeof(this.size) === 'string') {
        classList.push(this.size)
      }
      
      if (this.comments === 0 && this.showLabel === false) {
        classList.push('icon')
      }
      
      return classList.join(' ')
    },
    enableLike () {
      return (this.annotation.user_id !== this.status.userID)
    },
    likes () {
      if (this.annotation 
              && this.annotation.__meta__
              && typeof(this.annotation.__meta__.likes_count) !== 'undefined') {
        return parseInt(this.annotation.__meta__.likes_count, 10)
      }
    },
    comments () {
      if (this.annotation 
              && this.annotation.__meta__
              && typeof(this.annotation.__meta__.comments_count) !== 'undefined') {
        return parseInt(this.annotation.__meta__.comments_count, 10)
      }
      else {
        return 0
      }
    }
  },
//  watch: {
//  },
//  mounted() {
//  },
  methods: {
    like: async function () {
      if (this.annotation.__meta__.i_have_liked === 1) {
        this.annotation.__meta__.i_have_liked = 0
        this.annotation.__meta__.likes_count--
        this.$emit('unlike')
      }
      else {
        this.annotation.__meta__.i_have_liked = 1
        this.annotation.__meta__.likes_count++
        this.$emit('like')
      }
    },
    comment: async function () {
      this.$emit('comment')
    },
  } // methods
}

export default AnnotationInteractive