let AnnotationItem = {
  props: ['lib', 'status', 'config', 'annotation', 'mode'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
    }
  },
  components: {
  },
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
    }
  },
  watch: {
  },
  mounted() {
  },
  methods: {
  } // methods
}

export default AnnotationItem