import NavigationItems from './NavigationItems/NavigationItems.vue'
//const NavigationItems = require('./NavigationItems/NavigationItems.vue').default

let IndividualReading = {
  props: ['lib', 'status', 'config', 'progress', 'error', 'view'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      t: ''
    }
  },
  components: {
    //'navigation-items': () => import(/* webpackChunkName: "client-components/IndividualReading" */ './NavigationItems/NavigationItems.vue'),
    'navigation-items': NavigationItems,
    'rangy': () => import(/* webpackChunkName: "client-components/ReadingComponents" */ './../components/RangyManager/RangyManager.vue'),
  },
  computed: {
  },
  watch: {
  },
  mounted() {
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
    }, 1000 * 10)
  },
  methods: {
  } // methods
}

export default IndividualReading