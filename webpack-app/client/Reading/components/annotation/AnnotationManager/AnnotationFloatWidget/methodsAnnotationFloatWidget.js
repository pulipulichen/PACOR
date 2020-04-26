export default function (AnnotationFloatWidget) {
  
  AnnotationFloatWidget.methods.load = async function () {
    if (!this.lib.auth.stepHighlightAnnotationConfig) {
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

    this.lib.AnnotationHelper.filterQuery(query)

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
  }

  AnnotationFloatWidget.methods.viewAnnotation = function (annotation) {
    //(annotation) => {$emit('findAnnotation', annotation)}

    this.lib.AnnotationPanel.setAnnotation(annotation)

    //console.log('test this.lib.AnnotationPanel.focusCommentInput(2)')
    //this.lib.AnnotationPanel.focusCommentInput(2)

    this.reset()
  }
  
  AnnotationFloatWidget.methods.viewAnnotationByFind = function () {
    //(annotation) => {$emit('findAnnotation', annotation)}

    this.lib.AnnotationPanel.setAnnotation(this.annotation)

    //console.log('test this.lib.AnnotationPanel.focusCommentInput(2)')
    //this.lib.AnnotationPanel.focusCommentInput(2)

    this.reset()
  }

  AnnotationFloatWidget.methods.viewAnnotationComment = function (annotation) {
    this.lib.AnnotationPanel.setAnnotation(annotation)
    this.lib.AnnotationPanel.focusCommentInput()

    this.reset()
  }

  AnnotationFloatWidget.methods.findUser = function (user) {
    this.lib.AnnotationPanel.findUser(user)
    this.list()
  }

  AnnotationFloatWidget.methods.findType = function (type) {
    this.lib.AnnotationPanel.findType(type)
    this.list()
  }

  AnnotationFloatWidget.methods.list = function () {
    this.lib.AnnotationPanel.setAnchorPositions(this.anchorPositions)
    this.reset()
  }

  AnnotationFloatWidget.methods.reset = function () {
    this.anchorPositions = null
    //setTimeout(() => {
      this.isFixed = false
      this.isFixedMouseout = false
    //}, 500)
  }
  
  AnnotationFloatWidget.methods.hide = function () {
    this.annotation = null
    this.lastPosition = null
    this.reset()
    
    console.log(this.isFixed)
  }
}