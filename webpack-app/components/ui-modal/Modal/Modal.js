import $ from 'jquery'

let Modal = {
  props: ['lib', 'status', 'config'
    , 'cancelable', 'reset', 'dimmerTransparent', 'contentURL'
    , 'cancelButtonText', 'fullContent'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      resetCache: null,
      modal: null,
      isShow: false
    }
  },
//  components: {
//  },
  computed: {
    computedContentURL () {
      let url = this.contentURL
      if (typeof(url) !== 'string') {
        return null
      }
      
      if (url.startsWith('/')) {
        url = this.config.baseURL + url
      }
      return url
    },
    computedActionsClassList () {
      let classList = []
      
      if (this.lib.style.isLeftHanded === true) {
        classList.push('left-handed')
      }
      
      return classList.join(' ')
    }
  },
  destroyed: function () {
    this.hide()
    this.getModal().remove()
    $(document.body).removeClass('non-invasive-web-style-framework-scroll-disable')
    //console.log('Modal隱藏了喔！', this.getModal().length)
  },
  watch: {
    'reset': function () {
      try {
        if (typeof(this.reset) === 'object') {
          this.resetCache = JSON.parse(JSON.stringify(this.reset))
        }
        else {
          this.resetCache = this.reset
        }
      }
      catch (e) {}
    }
  },
//  mounted() {
//    //setTimeout(() => {
//    //  this.show()
//    //}, 1000)
//  },
  methods: {
    getModal: function () {
      if (this.modal === null) {
        this.modal = $(this.$refs.modal)
      }
      return this.modal
    },
    _awaitInit: function (callback) {
      let modal = this.getModal()
      let loop = () => {
        if (typeof(modal.modal) !== 'function') {
          setTimeout(loop, 100)
        }
        else {
          callback(modal)
        }
      }
      loop()
    },
    show: function () {
      this._awaitInit((modal) => {
        let options = {}
        if (this.cancelable === 'false' 
                || this.cancelable === false) {
          options.closable = false
          options.duration = 0
        }
        
        if (this.dimmerTransparent === 'false' 
                || this.dimmerTransparent === false) {
          options.dimmerSettings= {
            dimmerName: 'opaque'
          }
        }
        
        options.onShow = () => {
          this.isShow = true
        }
        
        options.onHidden = () => {
          this.isShow = false
          this.$emit('hide')
        }
        
        modal.modal(options).modal('show')
      })
    },
    hide: function () {
      this._awaitInit((modal) => {
        //console.log('有hide嗎？')
        modal.modal('hide')
      })
    },
    doReset: function () {
      for (let name in this.resetCache) {
        this.reset[name] = this.resetCache[name]
      }
    },
    openContentURLWindow () {
      window.open(this.computedContentURL, '_blank')
    }
  } // methods
}

export default Modal