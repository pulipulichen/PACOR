let AnnotationTypeSelector = {
  props: ['status', 'config', 'selection'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      inited: false
    }
  },
  components: {
  },
  watch: {
    'selection': function () {
      let fab = this.$refs.fab
      if (this.selection !== null) {
        fab.onOffFab(true)
      }
      else {
        fab.onOffFab(false)
      }
      console.log(this.selection)
      //fab.onOffFab((this.selection !== null))
    }
  },
  computed: {
    attrDir: function () {
      let className = 'black label'
      if (this.selection !== null
              && typeof(this.selection) === 'object'
              && typeof(this.selection.rect) === 'object') {
        let maxWidth = window.innerWidth || screen.width
        let maxHeight = window.innerHeight || screen.height
        
        // 要得知screen width
        //console.log(this.selection)
        let rect = this.selection.rect
        let height = this.$refs.Selector.clientHeight
        
        if ( (rect.bottom + height) > maxHeight ) {
          className = 'below ' + className
        }
      }
      return className
    },
    attrPosition: function () {
      if (this.selection !== null
              && typeof(this.selection) === 'object'
              && typeof(this.selection.rect) === 'object') {
        let maxWidth = window.innerWidth || screen.width
        let maxHeight = window.innerHeight || screen.height
        
        // 要得知screen width
        //console.log(this.selection)
        let rect = this.selection.rect
        let top
        let left
        
        let height = this.$refs.Selector.clientHeight
        let width = this.$refs.Selector.clientWidth
        
        if (this.attrDir !== 'below') {
          top = rect.bottom
        }
        else {
          top = rect.top - height
        }
        
        left = (rect.left + (rect.width / 2)) - (width / 2)
        if (left < 0) {
          left = 0
        }
        else if ( (left + width) > maxWidth ) {
          left = maxWidth - width
        }
        console.log(top, left)
        
        return {
          top: top + 'px',
          left: left + 'px'
        }
      }
    }
  },
  mounted() {
    this.$refs.fab.onOffFab(false)
    setTimeout(() => {
      this.inited = true
    }, 500)
  },
  methods: {
    clickItem: function () {
      console.log('clickItem')
    }
  } // methods
}

export default AnnotationTypeSelector