export default function (AnnotationFloatWidget) {
  let rangy
  let interactiveMode = null

  AnnotationFloatWidget.methods.initRangyEvents = function () {
    rangy = this.lib.RangyManager

    rangy.addEventListener('highlightClick', (data) => {
      this.rangyEventClick(data)
    })
    
    rangy.addEventListener('highlightMousemove', (data) => {
      this.rangyEventMousemove(data)
    })

    rangy.addEventListener('highlightMouseover', (data) => {
      this.rangyEventMouseover(data)
    })

    rangy.addEventListener('highlightMouseout', (data) => {
      this.rangyEventMouseout(data)
    })

//    rangy.addEventListener('select', (data) => {
//      this.rangyEventSelect(data)
//    })
//    
//    rangy.addEventListener('selectcollapsed', (data) => {
//      this.rangyEventSelectcollapsed(data)
//    })
  } // AnnotationFloatWidget.methods.initRangyEvents = function () {

  AnnotationFloatWidget.methods.rangyEventClick = function (data) {
    if (this.lib.AnnotationPanel.isHide === false) {
      // 如果是顯示的狀況
      interactiveMode = null
      return false
    }

    if (interactiveMode === 'mouse') {
      if (this.isFixed === true && this.isFixedMouseout === true) {
        this.triggerEvent = data.event
        this.anchorPositions = data.anchorPositions
        this.isFixedMouseout = false
      } else {
        this.isFixed = !this.isFixed
      }
    } else {
      this.triggerEvent = data.event
      this.anchorPositions = data.anchorPositions
      this.isFixed = true
    }
  } // AnnotationFloatWidget.methods.rangyEventClick = function (data) {

  AnnotationFloatWidget.methods.rangyEventMouseover = function (data) {
    if (rangy.isSelecting() === true) {
      return false
    }

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
    //useMouse = true
    interactiveMode = 'mouse'
    
    if (this.isTriggerBehindFloatWidget === true) {
      this.isFixed = true
    }
  } // AnnotationFloatWidget.methods.rangyEventMouseover = function (data) {

//  AnnotationFloatWidget.methods.rangyEventMouseover = function (data) {
//    
//  } // AnnotationFloatWidget.methods.rangyEventMouseover = function (data) {

  AnnotationFloatWidget.methods.rangyEventMouseout = async function (data) {
    if (this.lib.AnnotationPanel.isHide === false) {
      return false
    }
    if (this.isFixed === true) {
      this.isFixedMouseout = true
      return false
    }
    
    //await this.lib.VueHelper.sleep(100)
    //console.log(this.isTriggerBehindFloatWidget)
    if (this.isTriggerBehindFloatWidget === true) {
      this.isFixed = true
      return true
    }
    
    this.anchorPositions = null
    //useMouse = false
    interactiveMode = null
  } // AnnotationFloatWidget.methods.rangyEventMouseout = function (data) {
  
  AnnotationFloatWidget.methods.rangyEventMousemove = function (data) {
    if (rangy.isSelecting() === false) {
      return false
    }
    
    if (this.isTriggerBehindFloatWidget === true) {
      this.isFixed = true
      return false
    }

    this.anchorPositions = null
    //useMouse = false
    interactiveMode = null
    this.isFixed = false
    this.isFixedMouseout = true
  } // AnnotationFloatWidget.methods.rangyEventMouseout = function (data) {

  AnnotationFloatWidget.methods.rangyEventSelect = function (data) {
    if (this.isFixed === true) {
      this.isFixed = false
      this.anchorPositions = null
      
      //useMouse = false
      interactiveMode = null
    }
  } // AnnotationFloatWidget.methods.rangyEventSelect = function (data) {

  AnnotationFloatWidget.methods.rangyEventSelectcollapsed = function (data) {

  } // AnnotationFloatWidget.methods.rangyEventSelectcollapsed = function (data) {



} // export default function (AnnotationFloatWidget) {