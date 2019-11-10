let Hover = {
  props: ['lib', 'status', 'config', 'rangy'],
  data() {
    return {
      hoverHighlighter: null,
      hoverAnnotation: null,
      hoverAnnotationLock: false,
    }
  },
//  components: {
//  },
  computed: {
  },
  watch: {
  },
  mounted() {
  },
  methods: {
    hoverIn: function (annotation, doLock) {
      //console.log(disableHoverout)
      if (this.hoverAnnotation === annotation) {
        if (doLock !== true) {
          this.hoverOut()
        }
        this.hoverAnnotationLock = doLock
        return false
      }
      
      this.hoverOut()
      //$('.rangySelectionBoundary').html('')
      //this.unpinSelection()
      //annotation = this._adjustPositionWithPinnedSelection(annotation)
      //console.log(annotation)
      setTimeout(() => {
        let highlight = this._annotationToHighlighString(annotation, 'pacor-hover')
        //console.log(highlight)
        this.hoverHighlighter.deserialize(highlight)
        this.hoverAnnotation = annotation
        this.hoverAnnotationLock = doLock
      }, 0)
        
      //console.log(this.hoverAnnotationLock)
      return this
    },
    _adjustPositionWithPinnedSelection (annotation) {
      if (this.isPinned === false) {
        return annotation
      }
      
      //console.log('hoverIn', annotation.anchorPositions[0])
      //let shift = this.isPinned ? 1 : 0
      //console.log(shift)
      let pinHighlights = this.selectionHighlighter.highlights
      annotation.anchorPositions = annotation.anchorPositions.map(pos => {
        pinHighlights.forEach(pin => {
          pin = this._highlightToAnchorPosition(pin)
          //console.log(pos)
          //console.log(pin)
          if (pin.paragraph_id !== pos.paragraph_id) {
            return false
          }
          
          if (pos.start_pos > pin.start_pos 
                  && pos.end_pos < pin.end_pos ) {
            // 包含的狀態
            pos.start_pos = pos.start_pos + 1
            pos.end_pos = pos.end_pos + 1
          }
          else if (pos.end_pos === pin.end_pos) {
            pos.start_pos = pos.start_pos + 1
            pos.end_pos = pos.end_pos + 2
          }
          else if (pos.end_pos === pin.start_pos
                  || pos.end_pos === pin.start_pos + 1) {
            pos.end_pos = pos.end_pos + 1
          }
          else if (pos.start_pos === pin.start_pos + 1) {
            pos.end_pos = pos.end_pos + 2
          }
        })
        return pos
      })
      
      return annotation
    },
    hoverOut : function (doUnlock) {
      if (doUnlock === true) {
        this.hoverAnnotationLock = false
      }
      
      if (this.hoverAnnotationLock === true) {
        return false
      }
      //console.trace('hoverOut')
      this.hoverHighlighter.removeAllHighlights()
      this.hoverAnnotation = null
      return this
    },
    getHoverAnchorText () {
      let highlight = this.hoverHighlighter.highlights[0]
      let {anchor_text} = this._getAnchorPositionFromHighlight(highlight)
      return anchor_text
    },
  } // methods
}

export default Hover