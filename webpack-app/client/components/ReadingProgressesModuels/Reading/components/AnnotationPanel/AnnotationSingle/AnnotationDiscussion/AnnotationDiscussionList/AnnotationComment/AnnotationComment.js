let AnnotationComment = {
  props: ['lib', 'status', 'config'
    , 'comment'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
    }
  },
//  components: {
//  },
  computed: {
    username () {
      let user = this.comment.user
      if (typeof(user.displayName) === 'string') {
        return user.displayName
      }
      else {
        return user.username
      }
    },
    displayTime () {
      return this.lib.DayJSHelper.fromNow(this.comment.updated_at_unixms)
    },
  },
//  watch: {
//  },
//  mounted() {
//  },
  methods: {
    onDelete: async function () {
      if (window.confirm(this.$t('Are you sure to delete this comment?'))) {
        let data = {
          commentID: this.comment.id
        }
        
        await this.lib.AxiosHelper.get('/client/AnnotationComment/destroy', data)
        
        this.$emit('delete')
      }
    }
  } // methods
}

export default AnnotationComment