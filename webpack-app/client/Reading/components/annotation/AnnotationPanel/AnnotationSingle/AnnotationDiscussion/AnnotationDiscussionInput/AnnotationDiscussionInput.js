import $ from 'jquery'

let debugSkipCreate = false
if (debugSkipCreate === true) {
  console.log('@TEST debugSkipCreate')
}

let AnnotationDiscussionInput = {
  props: ['lib', 'status', 'config', 'annotation', 'panelData'],
  data() {    
    this.$i18n.locale = this.config.locale
    //console.log('建置了AnnotationDiscussionInput')
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
    },
    computedContainerClassList () {
      let classList = []
      
      if (this.isEditMode === true) {
        classList.push('edit-mode')
      }
      
      return classList.join(' ')
    },
    computedSubmitButtonClassList () {
      let classList = []
      
      if (!this.isEnableSubmit === true) {
        classList.push('disabled')
      }
      else {
        classList.push('positive')
      }
      
      return classList.join(' ')
    }
  },
  watch: {
    'comment' (comment) {
      if (comment
            && typeof(comment.note) === 'string') {
        this.note = comment.note
      }
      else {
        this.note = ''
      }
    },
    'note' (note) {
      if (note.trim() === '') {
        this.panelData.isCommentEditing = false
      }
      else {
        this.panelData.isCommentEditing = true
      }
    }
  },
  //mounted() {
  //},
  methods: {
    focus () {
      //console.trace('force')
      let input = this.$refs.input
      input.focus()
      $(input).transition('glow')
      //console.trace('who trigger focus()?')
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
      
      this.panelData.isCommentEditing = false
      let result
      if (debugSkipCreate !== true) {
        result = await this.lib.AxiosHelper.post('/client/AnnotationComment/create', data)

        if (typeof(result.id) !== 'number') {
          throw new Error('Add failed')
          return null
        }
      }
      else {
        result = {
          id: this.lib.DayJSHelper.time()
        }
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
      
      //console.log({comment})
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
      this.panelData.isCommentEditing = false
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