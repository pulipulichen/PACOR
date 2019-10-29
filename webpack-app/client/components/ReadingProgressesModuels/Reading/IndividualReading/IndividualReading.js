import NavigationItems from './NavigationItems/NavigationItems.vue'
//const NavigationItems = require('./NavigationItems/NavigationItems.vue').default

let IndividualReading = {
  props: ['lib', 'status', 'config', 'progress', 'error', 'view'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      t: '',
      
      selection: null,
    }
  },
  components: {
    //'navigation-items': () => import(/* webpackChunkName: "client-components/IndividualReading" */ './NavigationItems/NavigationItems.vue'),
    'navigation-items': NavigationItems,
    'rangy': () => import(/* webpackChunkName: "client-components/ReadingComponents" */ './../components/RangyManager/RangyManager.vue'),
    'annotation-type-selector': () => import(/* webpackChunkName: "client-components/ReadingComponents" */ './../components/AnnotationTypeSelector/AnnotationTypeSelector.vue'),
  },
  computed: {
    rangyConfig: function () {
      let output = {}
      if (typeof(this.status) === 'object'
              && typeof(this.status.readingConfig) === 'object') {
        output.articleSelector = this.status.readingConfig.articleSelector
        output.sectionSelector = this.status.readingConfig.sectionSelector
        output.annotationTypeModules = this.status.readingConfig.annotationTypeModules
      }
      return output
    }
  },
  watch: {
  },
  mounted() {
    this.status.title = this.status.username
    
    setTimeout(() => {
      this.t = `AAAAAAAAAAAAAAAAAAAAAAAAAAA<br />
AAAAAAAAAAAAAAAAAAAAAAAAAAA<br />
AAAAAAAAAAAAAAAAAAAAAAAAAAA<br />
AAAAAAAAAAAAAAAAAAAAAAAAAAA<br />
AAAAAAAAAAAAAAAAAAAAAAAAAAA<br />
AAAAAAAAAAAAAAAAAAAAAAAAAAA<br />
AAAAAAAAAAAAAAAAAAAAAAAAAAA<br />
AAAAAAAAAAAAAAAAAAAAAAAAAAA<br />
AAAAAAAAAAAAAAAAAAAAAAAAAAA<br />
AAAAAAAAAAAAAAAAAAAAAAAAAAA<br />
AAAAAAAAAAAAAAAAAAAAAAAAAAA<br />
AAAAAAAAAAAAAAAAAAAAAAAAAAA<br />
AAAAAAAAAAAAAAAAAAAAAAAAAAA<br />
AAAAAAAAAAAAAAAAAAAAAAAAAAA<br />
AAAAAAAAAAAAAAAAAAAAAAAAAAA<br />
AAAAAAAAAAAAAAAAAAAAAAAAAAA<br />`
    }, 1000 * 1)
  },
  methods: {
    onselect: function (selection) {
      console.log(selection)
      this.selection = selection
    },
    onselectcollapsed: function () {
      console.log('collapsed')
      this.selection = null
    }
  } // methods
}

export default IndividualReading