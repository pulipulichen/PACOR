let AnnotationDiscussionInput = {
  props: ['lib', 'status', 'config', 'annotation'],
  data() {    
    this.$i18n.locale = this.config.locale
    
    let note = ''
    if (this.comment
            && typeof(this.comment.note) === 'string') {
      note = this.comment.note
    }
    return {
      note: note,
      comment: null
    }
  },
//  components: {
//  },
  computed: {
    isEditMode () {
      return (this.comment
              && typeof(this.comment.id) === 'number')
    },
    AnnotationDiscussionList () {
      return this.$parent.$refs.AnnotationDiscussionList
    },
    username () {
      if (typeof(this.status.displayName) === 'string') {
        return this.status.displayName
      }
      else {
        return this.status.username
      }
    },
  },
  watch: {
    'comment' (comment) {
      if (this.comment
            && typeof(this.comment.note) === 'string') {
        note = this.comment.note
      }
      else {
        note = ''
      }
    }
  },
  //mounted() {
  //},
  methods: {
    focus () {
      this.$refs.input.focus()
    },
    add: async function () {
      //throw new Error('@TODO AnnotationDiscussionInput.comment()')
      let data = {
        note: this.note
      }
      
      let id = await this.lib.AxiosHelper.post('/client/AnnotationComment/add', data)
      
      if (typeof(id) !== 'number') {
        throw new Error('Add failed')
        return null
      }
      
      let comment = {
        id: id,
        note: this.note
      }
      //this.$emit('add', comment)
      this.AnnotationDiscussionList.onInputAdd(comment)
      this.reset()
    },
    edit: async function () {
      //throw new Error('@TODO AnnotationDiscussionInput.comment()')
      let data = {
        note: this.note
      }
      
      let id = await this.lib.AxiosHelper.post('/client/AnnotationComment/add', data)
      
      if (typeof(id) !== 'number') {
        throw new Error('Add failed')
        return null
      }
      
      this.comment.note = this.note
      //this.$emit('edit', this.comment)
      this.AnnotationDiscussionList.onInputEdit(this.comment)
    }
  } // methods
}

export default AnnotationDiscussionInput