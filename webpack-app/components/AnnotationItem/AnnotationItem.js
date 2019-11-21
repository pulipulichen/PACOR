let AnnotationItem = {
  props: ['lib', 'status', 'config'
    , 'annotation', 'mode'
    , 'searchKeyword'
    , 'findUser', 'findType', 'findAnnotation'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
    }
  },
//  components: {
//  },
  computed: {
    username () {
      let user = this.annotation.user
      if (typeof(user.displayName) === 'string') {
        return user.displayName
      }
      else {
        return user.username
      }
    },
    displayTime () {
      //return this.annotation.updated_at_unixms + ' ' + (new Date()).getTime()
      
      //let n = (new Date()).getTime()
      //let u = this.annotation.updated_at_unixms
      //console.log([n, u, (n - u)])
      //console.log([u])
      
      //return this.lib.DayJSHelper.toNow(this.annotation.updated_at_unixms)
      //return this.lib.DayJSHelper.fromNow(u)
      return this.lib.DayJSHelper.fromNow(this.annotation.updated_at_unixms)
    },
    computedContainerClassNames () {
      let classNames = this.mode
      if (classNames === undefined || classNames === null) {
        classNames = 'annotation-item-compact'
      }
      return classNames
    },
    note () {
      //console.log(this.annotation.notes)
      return this.annotation.notes.map(note => {
        let result = note.note
        
        let keyword = this.searchKeyword
        //if (!keyword || keyword === '') {
        //  keyword = this.status.search.keyword
        //}
        
        if (keyword && keyword !== '') {
          result = result.split(keyword).join(`<span data-pacor-search-result>${keyword}</span>`)
        }
        
        return result
      }).join(' ')
    }
  },
//  watch: {
//  },
//  mounted() {
//  },
  methods: {
    onFindAnnotation (data) {
      if (typeof(this.findAnnotation) === 'function') {
        this.findAnnotation(data)
      }
    },
    onFindUser (data) {
      if (typeof(this.findUser) === 'function') {
        this.findUser(data)
      }
    },
    onFindType (data) {
      if (typeof(this.findType) === 'function') {
        this.findType(data)
      }
    },
    onClick () {
      if (this.lib.RangyManager) {
        this.lib.RangyManager.hoverIn(this.annotation)
      }
      this.$emit('click', this.annotation)
    },
    onMouseover () {
      if (this.lib.RangyManager) {
        this.lib.RangyManager.hoverIn(this.annotation)
      }
      this.$emit('mouseover', this.annotation)
    },
    onMouseout () {
      if (this.lib.RangyManager) {
        this.lib.RangyManager.hoverOut()
      }
      this.$emit('mouseout', this.annotation)
    },
    onlike: async function () {
      let data = {
        annotationID: this.annotation.id
      }
      
      let result = await this.lib.AxiosHelper.get('/client/AnnotationRate/like', data)
      
      this.$emit('like')
    }
  } // methods
}

export default AnnotationItem