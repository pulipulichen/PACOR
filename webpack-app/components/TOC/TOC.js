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
    window.$('<div class="js-toc"></div>').appendTo('body')
    setTimeout(() => {
      tocbot.init({
        // Where to render the table of contents.
        tocSelector: '.js-toc',
        // Where to grab the headings to build the table of contents.
        contentSelector: '.ui.form',
        // Which headings to grab inside of the contentSelector element.
        headingSelector: 'h3, h4',
        // For headings inside relative or absolute positioned containers within content.
        hasInnerContainers: true,
      });
    }, 1000)
      
  },
  methods: {
  } // methods
}

export default TOC