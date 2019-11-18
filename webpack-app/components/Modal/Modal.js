import $ from 'jquery'

let Modal = {
  props: ['lib', 'status', 'config'
    , 'cancelable', 'reset', 'dimmerTransparent', 'contentURL'
    , 'cancelButtonText'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      resetCache: null,
      modal: null
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
        this.modal = window.$(this.$refs.modal)
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
        if (this.cancelable === 'false') {
          options.closable = false
          options.duration = 0
        }
        
        if (this.dimmerTransparent === 'false') {
          options.dimmerSettings= {
            dimmerName: 'opaque'
          }
        }
        
        modal.modal(options).modal('show')
      })
    },
    hide: function () {
      this._awaitInit((modal) => {
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