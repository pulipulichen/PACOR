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
      comment: null,
      submitLock: false
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
    isEnableSubmit () {
      return (this.submitLock === false 
              && this.note.trim() !== '')
    }
  },
  watch: {
    'comment' (comment) {
      if (this.comment
            && typeof(this.comment.note) === 'string') {
        this.note = this.comment.note
      }
      else {
        this.note = ''
      }
    }
  },
  //mounted() {
  //},
  methods: {
    focus () {
      this.$refs.input.focus()
    },
    submit () {
      if (this.isEnableSubmit === false) {
        return null
      }
      
      if (this.submitLock === true) {
        return null
      }
      this.submitLock = true
      
      if (!this.isEditMode) {
        this.create()
      }
      else {
        this.edit()
      }
    },
    create: async function () {
        
      //throw new Error('@TODO AnnotationDiscussionInput.comment()')
      let data = {
        annotationID: this.annotation.id,
        note: this.note
      }
      
      let result = await this.lib.AxiosHelper.post('/client/AnnotationComment/create', data)
      
      if (typeof(result.id) !== 'number') {
        throw new Error('Add failed')
        return null
      }
      
      let comment = {
        id: result.id,
        note: this.note,
        user_id: this.status.userID,
        user: {
          username: this.status.username,
          display_name: this.status.displayName,
          avatar_url: this.status.avatar
        },
        //updated_at_unixms: (new Date()).getTime()
      }
      //this.$emit('add', comment)
      this.AnnotationDiscussionList.onInputAdd(comment)
      this.reset()
    },
    edit: async function () {
      //throw new Error('@TODO AnnotationDiscussionInput.comment()')
      let data = {
        commentID: this.comment.id,
        note: this.note
      }
      
      let result = await this.lib.AxiosHelper.post('/client/AnnotationComment/update', data)
      
      if (typeof(result.id) !== 'number') {
        throw new Error('Add failed')
        return null
      }
      
      this.comment.note = this.note
      //this.$emit('edit', this.comment)
      this.AnnotationDiscussionList.onInputEdit(this.comment)
      this.reset()
    },
    reset () {
      this.note = ''
      this.comment = null
      this.submitLock = false
    }
  } // methods
}

export default AnnotationDiscussionInput