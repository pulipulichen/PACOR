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
  },
  watch: {
    pinSelection: function (pinSelection) {
      if (pinSelection !== null 
              && typeof(pinSelection) === 'object') {
        this.show()
      }
    },
    heightVH: function (heightVH) {
      if (typeof(heightVH) === 'number') {
        this.placeholder.css('height', heightVH + 'vh')
      }
    }
  },
  mounted() {
    this.placeholder = window.$('<div></div>')
            .css('height', this.heightVH + 'vh')
            .hide()
            .appendTo('body')
  },
  destroyed() {
    this.placeholder.remove()
  },
  methods: {
    show () {
      this.isHide = false
      this.placeholder.show()
    },
    hide () {
      this.placeholder.hide()
      this.isHide = true
      this.$emit('hide')
    }
  } // methods
}

export default AnnotationPanel