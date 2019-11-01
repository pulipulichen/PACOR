let Modal = {
  props: ['lib', 'status', 'config', 'cancelable', 'reset', 'dimmerTransparent', 'contentURL'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      resetCache: null
    }
  },
  components: {
  },
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
  destoryed: function () {
    this.hide()
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
  mounted() {
    //setTimeout(() => {
    //  this.show()
    //}, 1000)
  },
  methods: {
    getModal: function () {
      return window.$(this.$refs.modal)
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
    }
  } // methods
}

export default Modal