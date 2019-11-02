//import VueDraggableResizable from 'vue-draggable-resizable'
//import 'vue-draggable-resizable/dist/VueDraggableResizable.css'

import AnnotationDiscussion from './AnnotationDiscussion/AnnotationDiscussion.vue'
import AnnotationModuleMainIdea from './AnnotationEditorModules/MainIdea/MainIdea.vue'

import $ from 'jquery'

let AnnotationPanel = {
  props: ['lib', 'status', 'config', 'progress', 'error', 'pinSelection', 'annotationModule'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      annotationInstance: null,
      
      //heightVH: 50,
      heightPX: 500,
      isHide: true,
      placeholder: null,
      transitionMode: 'slide up',
      resizeLocker: false,
      localStorageKeyPrefix: 'client.components.ReadingProgressesModuels.Reading.components.AnnotationManager.AnnotationPanel.'
    }
  },
  components: {
    //'vue-draggable-resizable': VueDraggableResizable,
    
    'annotation-discussion': AnnotationDiscussion,
    'MainIdea': AnnotationModuleMainIdea
  },
  computed: {
    annotationConfig () {
      let stepConfig = this.lib.auth.currentStepConfig
      return stepConfig.annotation
    },
//    enableCollaboration () {
//      //return true // for test
//      return this.annotationConfig.enableCollaboration
//    },
//    enablePermissionControll () {
//      //return true // for test
//      return this.annotationConfig.enablePermissionControll
//    },
    computedPlaceholderHeight () {
      //return `calc(${this.heightVH}vh - ${this.navigationPlaceholderHeight}px)`
      return `calc(${this.heightPX}px - ${this.navigationPlaceholderHeight}px)`
    },
    computedGridClass () {
      let classList = []
      if (this.annotationConfig.enableCollaboration === true) {
        classList.push('two')
      }
      else {
        classList.push('one')
      }
      
      return classList.join(' ') + ' column grid'
    },
    computedSegmentStyle () {
      if (this.annotationConfig.enableCollaboration === true
              && this.lib.style.isStackWidth() === true) {
        return {
          'max-height': `${this.heightPX}px`,
          'overflow-y': 'auto',
          'overflow-x': 'hidden'
        }
      }
      else {
        return {
          'height': `${this.heightPX}px`
        }
      }
    },
    computedSegmentClass () {
      return this.status.readingConfig.annotationTypeModules[this.annotationModule].style.segmentColor
    }
  },
  watch: {
    pinSelection: function (pinSelection) {
      if (pinSelection !== null 
              && typeof(pinSelection) === 'object') {
        //console.log(pinSelection)
        this.show()
        this.scrollToPinSelection()
      }
    },
    heightVH: function (heightVH) {
      if (typeof(heightVH) === 'number') {
        this.placeholder.css('height', heightVH + 'vh')
      }
    },
//    isHide () {
//      
//    }
  },
  mounted() {
    this._initHeightPX()
    
    this._initPlaceholder()
    this._test()
    
    //$.extend(require('jquery-ui'))
    //$.extend(jQueryUI)
    
    //console.log(typeof($(this.$refs.panel).resizable))
    
  },
  destroyed() {
    this.placeholder.remove()
  },
  methods: {
    _initHeightPX () {
      let sizeRatio = localStorage.getItem(this.localStorageKeyPrefix + 'sizeRatio')
      if (sizeRatio === null) {
        sizeRatio = 0.5
      }
      else {
        sizeRatio = parseFloat(sizeRatio)
      }
      //console.log(sizeRatio)
      this.heightPX = (window.innerHeight * sizeRatio)
    },
    _test: function () {
      this.show()
    },
    _initPlaceholder () {
      let navPH = window.$('.Navigation.placeholder:first')
      if (navPH.length === 1) { 
        this.navigationPlaceholderHeight = navPH.height()
      }
    
      let container = window.$('<div class="non-invasive-web-style-framework"></div>')
            .appendTo('body')
      this.placeholder = window.$('<div class="AnnotationPanel placeholder"></div>')
            .css('height', this.computedPlaceholderHeight)
            .hide()
            .appendTo(container)
    },
    show () {
      this.isHide = false
      this.placeholder.transition(this.transitionMode)
      window.$(this.$refs.panel).transition(this.transitionMode, () => {
        //this.placeholder.show()
      })
    },
    hide () {
      this.placeholder.transition(this.transitionMode)
      window.$(this.$refs.panel).transition(this.transitionMode, () => {
        this.isHide = true
        this.$emit('hide')
      })
    },
    scrollToPinSelection () {
      let rect = this.pinSelection.rect
      let viewportHeight = window.innerHeight
      
      //if (rect.middle < viewportHeight / 2) {
      if (rect.bottom < (viewportHeight - this.heightPX)) {
        return false  // 不做捲動
      }
      
      //let middle = this.pinSelection.rect.middle
      let middle = ((viewportHeight - this.heightPX) / 2)
      let scrollTop = this.getScrollTop()
      //console.log(scrollTop, rect.middle, middle)
      
      window.scrollTo({
        top: (scrollTop + rect.middle - middle),  // 等於是往上捲半個可顯示的畫面
        behavior: 'smooth'
      })
    },
    /**
     * @author http://www.eion.com.tw/Blogger/?Pid=1154
     */
    getScrollTop () {
      let bodyTop = 0;
      if (typeof window.pageYOffset !== "undefined") {
        bodyTop = window.pageYOffset;

      } else if (typeof document.compatMode === "undefined"
                 && document.compatMode !== "BackCompat") {
        bodyTop = document.documentElement.scrollTop;

      } else if (typeof document.body !== "undefined") {
        bodyTop = document.body.scrollTop;
      }
      /*顯示出捲動後的高度值*/
      return bodyTop
    },
    
    onResizeStart: function (event) {
      if (this.resizeLocker === true) {
        return false
      }
      this.resizeLocker = true
      
      let body = $('body')
      body.addClass('disable-user-select')
      //console.log(event)
      //console.log(event)
      let currentY = event.clientY
      
      let moveEvent = (event) => {
        if (this.lib.style.isSmallHeight() === false) {
          if (event.clientY < 100
                  || (window.innerHeight - event.clientY) < 200) {
            return false
          }
        }
        else {
          if (event.clientY < 50
                  || (window.innerHeight - event.clientY) < 100) {
            return false
          }
        }
          
        
        let interval = currentY - event.clientY
        this.heightPX = this.heightPX + interval
        currentY = event.clientY
        //console.log(this.heightPX)
        //console.log(event)
        //event.preventDefault()
        //event.stopPropagation()
      }
      
      let removeMoveEvent = () => {
        document.removeEventListener('mousemove', moveEvent)
        document.removeEventListener('mouseup', removeMoveEvent)
        
        document.removeEventListener('touchmove', moveEvent)
        document.removeEventListener('touchend', removeMoveEvent)
        body.removeClass('disable-user-select')
        this.resizeLocker = false
        
        // 計算最後的比例，然後存到preference去
        let sizeRatio = ((window.innerHeight - currentY) / window.innerHeight)
        //console.log(sizeRatio)
        localStorage.setItem(this.localStorageKeyPrefix + 'sizeRatio', sizeRatio)
      }
      
      document.addEventListener('mousemove', moveEvent)
      document.addEventListener('mouseup', removeMoveEvent)
      
      document.addEventListener('touchmove', moveEvent)
      document.addEventListener('touchend', removeMoveEvent)
      
      event.preventDefault()
      event.stopPropagation()
    },
    
  } // methods
}

export default AnnotationPanel