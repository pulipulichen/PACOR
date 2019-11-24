let AnnotationInteractive = {
  props: ['lib', 'status', 'config'
    , 'annotation', 'size', 'showLabel'],
  data() {    
    this.$i18n.locale = this.config.locale
    
    if (!this.annotation.__meta__) {
      this.annotation.__meta__ = {}
    }
    
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
      if (this.i_have_liked) {
        classList.push('green')
      }
      
      if (typeof(this.size) === 'string') {
        classList.push(this.size)
      }
      
      if (this.likes === 0) {
        classList.push('icon')
      }
      
      return classList.join(' ')
    },
    computedCommentsButtonClass () {
      let classList = []
      
      if (this.i_have_commented) {
        classList.push('green')
      }
      if (typeof(this.size) === 'string') {
        classList.push(this.size)
      }
      
      if (this.comments === 0) {
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
      else {
        return 0
      }
    },
    comments () {
      //console.log(this.annotation.__meta__.comments_count)
      if (this.annotation 
              && this.annotation.__meta__
              && typeof(this.annotation.__meta__.comments_count) !== 'undefined') {
        return parseInt(this.annotation.__meta__.comments_count, 10)
      }
      else {
        return 0
      }
    },
    i_have_liked () {
      return (this.annotation.__meta__.i_have_liked_count === 1
              || this.annotation.__meta__.i_have_liked_count === '1')
    },
    i_have_commented () {
      let count = this.annotation.__meta__.i_have_commented_count
      if (typeof(count) === 'string'
              && isNaN(count) === false) {
        count = parseInt(count, 10)
      }
      
      if (typeof(count) === 'number') {
        return (count > 0)
      }
      else {
        return false
      }
    },
    isNotMe () {
      return (this.annotation.user_id !== this.status.userID)
    }
  },
//  watch: {
//  },
//  mounted() {
//  },
  methods: {
    like: async function () {
      //console.log(this.annotation)
      //console.log(this.i_have_liked)
      if (this.i_have_liked) {
        this.annotation.__meta__.i_have_liked_count = 0
        this.annotation.__meta__.likes_count--
        this.$emit('unlike')
      }
      else {
        this.annotation.__meta__.i_have_liked_count = 1
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