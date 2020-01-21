import $ from 'jquery'

let Modal = {
  props: ['lib', 'status', 'config'
    , 'cancelable', 'reset', 'dimmer', 'contentURL'
    , 'cancelButtonText', 'fullContent', 'disableOpenWindow', 'keyboardShortcuts'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      resetCache: null,
      modal: null,
      isShow: false,
      headerMenuInited: false
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
      
      if (this.lib.style && this.lib.style.isLeftHanded === true) {
        classList.push('left-handed')
      }
      
      return classList.join(' ')
    },
    computedHeaderClassList () {
      if (this.$slots.headerMenu) {
        return 'has-header-menu'
      }
    },
    computedModalClassList () {
      let classList = []
      if (this.cancelable === false) {
        classList.push('non-cancellable')
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
  methods: {
    initDropdown() {
      if (this.headerMenuInited === true 
        || !this.$refs.HeaderMenuDropdown) {
        return undefined
      }
      if (this.$refs.HeaderMenuDropdown) {
        $(this.$refs.HeaderMenuDropdown).popup({
          inline: true,
          hoverable: true,
          //position: 'bottom left',
          on: 'click',
          position: 'bottom right',
          delay: {
            //show: 300,
            hide: 800 
          }
        })
        //this.headerMenuInited = true
      }
    },
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
    show: function (callback) {
      this._awaitInit((modal) => {
        let options = {}
        if (this.cancelable === 'false' 
                || this.cancelable === false) {
          options.closable = false
          options.duration = 0
        }
        
        if (this.dimmer === 'opaque') {
          options.dimmerSettings= {
            dimmerName: 'opaque'
          }
        }
        else if (this.dimmer === 'transparent') {
          options.dimmerSettings= {
            dimmerName: 'transparent'
          }
        }
        
        options.onShow = () => {
          
          this.initDropdown()
          this.isShow = true
          
          if (typeof(callback) === 'function') {
            callback()
          }
        }
        
        options.onHidden = () => {
          this.isShow = false
          this.$emit('hide')
        }
        
        if (this.keyboardShortcuts === false) {
          options.keyboardShortcuts = false
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