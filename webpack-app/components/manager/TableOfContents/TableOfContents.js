import tocbot from './tocbot/tocbot.webpack.js'
import $ from 'jquery'

let TableOfContent = {
  props: ['lib', 'config', 'headings'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      inited: false,
      rootContainer: null,
      container: null
    }
  },
  /*
  components: {
  },
  computed: {
  },
  watch: {
  },
  */
  mounted() {
    this.init()
  },
  destroyed () {
    this.inited = false
    tocbot.destroy()
    //console.log('reset')
    this.removeContainer()
  },
  methods: {
    init: function () {
      this.initContainer()
      let options = this.initOptions()
      setTimeout(() => {
        //console.log(options)
        tocbot.init(options)
        //console.trace('inited')
      }, 0)
    },
    initOptions: function () {
      let options = this.options
      let height = this.config.styleConfig.TopMenuHeight
      if (height.endsWith('px')) {
        height = height.slice(0, -2)
      }
      if (typeof(height) === 'string'){
        height = parseInt(height, 10)
      }

      let defaultOptions = {
        // Where to render the table of contents.
        tocSelector: '.js-toc',
        // Where to grab the headings to build the table of contents.
        contentSelector: '.non-invasive-web-style-framework',
        // Which headings to grab inside of the contentSelector element.
        headingSelector: this.headings,
        // For headings inside relative or absolute positioned containers within content.
        hasInnerContainers: true,
        fixedSidebarOffset: height,
      }
      /*
      if (options !== undefined && typeof(options) === 'object') {
        for (let name in options) {
          defaultOptions[name] = options[name]
        }
      }
      */
      return defaultOptions
    },
    initContainer: function () {
      //this.container = window.$(this.$refs.toc)
      //container.prependTo('body')

      this.rootContainer = $('.non-invasive-web-style-framework:first')
      this.rootContainer.addClass('tocbot')
    },
    removeContainer: function () {
      //this.container.remove()
      this.rootContainer.removeClass('tocbot')
    },
    
    refresh: function () {
      setTimeout(() => {
        tocbot.refresh()
        //console.log('refresh')
      }, 0)
    }
  } // methods
}

export default TableOfContent