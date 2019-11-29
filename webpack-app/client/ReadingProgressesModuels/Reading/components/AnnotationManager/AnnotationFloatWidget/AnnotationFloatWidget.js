let AnnotationFloatWidget = {
  props: ['lib', 'status', 'config'
  ],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      anchorPositions: null,
      triggerEvent: null,
      isFixed: false,
      isFixedMouseout: false,
      
      annotation: null,
      annotationCount: 0,
      users: [],
      userCount: 0,
      types: [],
      
      lastPosition: null,
    }
  },
//  components: {
//  },
  computed: {
    computedContainerClassNames () {
      if (this.anchorPositions === null) {
        //console.log('no')
        //return this.lastPosition + ' hide'
        return this.lastPosition
      }
      
      let classList = []
      
      classList.push('show')
      
      let windowHeight = window.innerHeight
      let clientY = this.triggerEvent.clientY
      if (clientY < (windowHeight / 2) ) {
        classList.push('bottom')
        this.lastPosition = 'bottom'
      }
      else {
        this.lastPosition = 'top'
      }
      
      
      //console.log(this.lib.RangyManager.isSelecting())
      if (this.lib.RangyManager.isSelecting()) {
        classList.push('selecting')
      }
      
      //console.log(classList)
      //return 'bottom'
      if (classList.length > 0) {
        return classList.join(' ')
      }
    },
    computedButtonsClassNames () {
      let classList = []
      //console.log(this.status.preference.leftHanded)
      if (this.status.preference.leftHanded === true) {
        classList.push('left-handed')
      }
      else {
        classList.push('right aligned')
      }
      
      return classList.join(' ')
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
          if (this.isFixed === true && this.isFixedMouseout === true) {
            this.triggerEvent = data.event
            this.anchorPositions = data.anchorPositions
            this.isFixedMouseout = false
          }
          else {
            this.isFixed = !this.isFixed
          }
        }
        else {
          this.triggerEvent = data.event
          this.anchorPositions = data.anchorPositions
        }
      })
      
      rangy.addEventListener('highlightMouseover', (data) => {
        //console.log(data)
        //console.log(this.lib.AnnotationPanel.isHide)
        if (this.lib.AnnotationPanel.isHide === false) {
          return false
        }
        
        // 如果已經鎖定，那就不能切換
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
          this.isFixedMouseout = true
          return false
        }
        
        this.anchorPositions = null
        useMouse = false
      })
      
      rangy.addEventListener('select', (data) => {
        if (this.isFixed === true) {
          this.isFixed = false
          this.anchorPositions = null
          useMouse = false
        } 
      })
    },
//    
    load: async function () {
      if (!this.lib.auth.currentStepAnnotationConfig) {
        return false
      }
      
      if (!this.anchorPositions) {
        return false
      }
      
      this.annotationCount = 0
      this.annotation = null
      this.users = []
      this.userCount = 0
      this.types = []
      
      let query = {
        anchorPositions: this.anchorPositions
      }
      let url = 'client/Annotation/floatWidget'
      
      this.lib.AnnotationHelper.filter(query)
      
      let result = await this.lib.AxiosHelper.post(url, query)
      if (result === null) {
        return false
      }
      
      // ----------------------------
      
      // 先重置本來的資料
      
      
      //console.log(result)
      
      
      for (let key in result) {
        this[key] = result[key]
      }
      
      if (this.annotationCount === 0) {
        console.log('no annotation')
      }
      //this.$emit('list', this.highlightPos) // for test
    },
    
    viewAnnotation: function (annotation) {
      //(annotation) => {$emit('findAnnotation', annotation)}
      
      this.lib.AnnotationPanel.setAnnotation(annotation)
      
      //console.log('test this.lib.AnnotationPanel.focusCommentInput(2)')
      //this.lib.AnnotationPanel.focusCommentInput(2)
      
      this.reset()
    },
    
    viewAnnotationComment: function (annotation) {
      this.lib.AnnotationPanel.setAnnotation(annotation)
      this.lib.AnnotationPanel.focusCommentInput()
      
      
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