import tocbot from './../../vendors/tocbot/tocbot.webpack.js'

let TOC = {
  props: ['config'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
    }
  },
  components: {
  },
  computed: {
  },
  watch: {
  },
  mounted() {
    let height = this.config.style.TopMenuHeight
    if (height.endsWith('px')) {
      height = height.slice(0, -2)
    }
    if (typeof(height) === 'string'){
      height = parseInt(height, 10)
    }
    
    tocbot.init({
      // Where to render the table of contents.
      tocSelector: '.js-toc',
      // Where to grab the headings to build the table of contents.
      contentSelector: '.non-invasive-web-style-framework',
      // Which headings to grab inside of the contentSelector element.
      headingSelector: 'h3, h4',
      // For headings inside relative or absolute positioned containers within content.
      hasInnerContainers: true,
      fixedSidebarOffset: height,
    });
  },
  destroyed () {
    tocbot.destroy()
  },
  methods: {
    refresh: function () {
      setTimeout(() => {
        tocbot.refresh()
      }, 0)
    }
  } // methods
}

export default TOC