let AnnotationPanel = {
  props: ['lib', 'status', 'config', 'progress', 'error', 'pinSelection'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      heightVH: 50,
      isHide: true,
      placeholder: null
    }
  },
  components: {
  },
  computed: {
    computedPlaceholderHeight () {
      return `calc(${this.heightVH}vh - ${this.navigationPlaceholderHeight}px)`
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
    isHide () {
      
    }
  },
  mounted() {
    this._initPlaceholder()
  },
  destroyed() {
    this.placeholder.remove()
  },
  methods: {
    _initPlaceholder () {
      let navPH = window.$('.Navigation.placeholder:first')
      if (navPH.length === 1) { 
        this.navigationPlaceholderHeight = navPH.height()
      }
    
      let container = window.$('<div class="non-invasive-web-style-framework"></div>')
            .appendTo('body')
      this.placeholder = window.$('<div></div>')
            .css('height', this.computedPlaceholderHeight)
            .hide()
            .appendTo(container)
    },
    show () {
      this.isHide = false
      this.placeholder.transition('fly up')
      window.$(this.$refs.panel).transition('fly up', () => {
        //this.placeholder.show()
      })
    },
    hide () {
      this.placeholder.transition('fly up')
      window.$(this.$refs.panel).transition('fly up', () => {
        this.isHide = true
        this.$emit('hide')
      })
    },
    scrollToPinSelection () {
      let rect = this.pinSelection.rect
      let viewportHeight = window.innerHeight
      
      if (rect.middle < viewportHeight / 2) {
        return false  // 不做捲動
      }
      
      //let middle = this.pinSelection.rect.middle
      let middle = (viewportHeight * (1 - (this.heightVH / 100)) / 2)
      let scrollTop = this.getScrollTop()
      console.log(scrollTop, rect.middle, middle)
      
      window.scrollTo({
        top: (scrollTop + rect.middle - middle),
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
  } // methods
}

export default AnnotationPanel