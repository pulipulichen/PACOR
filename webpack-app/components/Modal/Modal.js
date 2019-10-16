let Template = {
  props: ['lib', 'status', 'config', 'progress', 'error', 'view'
    , 'displayCloseIcon', 'cancalAction', 'reset'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      resetCache: null
    }
  },
  components: {
  },
  computed: {
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
    show: function () {
      this.getModal().modal('show')
    },
    hide: function () {
      this.getModal().modal('hide')
    },
    doReset: function () {
      for (let name in this.resetCache) {
        this.reset[name] = this.resetCache[name]
      }
    }
  } // methods
}

export default Template