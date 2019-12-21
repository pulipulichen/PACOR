export default function (AnnotationFloatWidget) {
  AnnotationFloatWidget.methods.initRangyEvents = function () {
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
        } else {
          this.isFixed = !this.isFixed
        }
      } else {
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
  }
}