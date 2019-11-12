let AnnotationFloatWidget = {
  props: ['lib', 'status', 'config'
  ],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      anchorPositions: null,
      triggerEvent: null,
      isFixed: false,
      
      annotation: null,
      annotationCount: 0,
      users: [],
      userCount: 0,
      types: [],
    }
  },
//  components: {
//  },
  computed: {
    computedContainerClassNames () {
      let classList = []
      if (this.anchorPositions !== null) {
        let windowHeight = window.innerHeight
        let clientY = this.triggerEvent.clientY
        if (clientY < (windowHeight / 2) ) {
          classList.push('bottom')
        }
      }
      
      //console.log(this.lib.RangyManager.isSelecting())
      if (this.lib.RangyManager.isSelecting()) {
        classList.push('selecting')
      }
      //return 'bottom'
      if (classList.length > 0) {
        return classList.join(' ')
      }
    },
    computedButtonsClassNames () {
      //console.log(this.status.preference.leftHanded)
      if (this.status.preference.leftHanded === false) {
        return 'right aligned column'
      }
      else {
        return 'column'
      }
    }
  },
  watch: {
    anchorPositions () {
      this.load()
    },
  },
  mounted() {
    this.initRangyEvents()
//    
//    //this.load()
    
  },
  destroyed () {
    this.lib.RangyManager.hoverOut()
  },
  methods: {
    initRangyEvents () {
      let rangy = this.lib.RangyManager
      
      let useMouse = false
      
      rangy.addEventListener('highlightClick', (data) => {
        if (this.lib.AnnotationPanel.isHide === false) {
          return false
        }
        
        if (useMouse === true) {
          this.isFixed = !this.isFixed
        }
        else {
          this.triggerEvent = data.event
          this.anchorPositions = data.anchorPositions
        }
      })
      
      rangy.addEventListener('highlightMouseover', (data) => {
        if (this.lib.AnnotationPanel.isHide === false) {
          return false
        }
        if (this.isFixed === true) {
          return false
        }
        
        this.triggerEvent = data.event
        this.anchorPositions = data.anchorPositions
        useMouse = true
      })
      
      rangy.addEventListener('highlightMouseout', (data) => {
        if (this.lib.AnnotationPanel.isHide === false) {
          return false
        }
        if (this.isFixed === true) {
          return false
        }
        
        this.anchorPositions = null
        useMouse = false
      })
    },
//    
    load: async function () {
      if (!this.anchorPositions) {
        return false
      }
      
      let query = {
        anchorPositions: this.anchorPositions
      }
      let url = 'client/Annotation/floatWidget'
      
      let result = await this.lib.AxiosHelper.post(url, query)
      if (result === null) {
        return false
      }
      
      //console.log(result)
      for (let key in result) {
        this[key] = result[key]
      }
      //this.$emit('list', this.highlightPos) // for test
    },
    
    viewAnnotation: function (annotation) {
      //(annotation) => {$emit('findAnnotation', annotation)}
      
      this.lib.AnnotationPanel.setAnnotation(annotation)
      this.reset()
    },
    
    findUser: function (user) {
      this.lib.AnnotationPanel.findUser(user)
      this.list()
    }, 
    
    findType: function (type) {
      this.lib.AnnotationPanel.findType(type)
      this.list()
    }, 
    
    list: function () {
      this.lib.AnnotationPanel.setAnchorPositions(this.anchorPositions)
      this.reset()
    },
    
    reset () {
      this.anchorPositions = null
      this.isFixed = false
    }
  } // methods
}

export default AnnotationFloatWidget