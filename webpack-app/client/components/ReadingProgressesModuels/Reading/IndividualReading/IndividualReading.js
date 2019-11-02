import NavigationItems from './NavigationItems/NavigationItems.vue'
//const NavigationItems = require('./NavigationItems/NavigationItems.vue').default

let IndividualReading = {
  props: ['lib', 'status', 'config', 'progress', 'error', 'view'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      t: '',
    }
  },
  components: {
    //'navigation-items': () => import(/* webpackChunkName: "client-components/IndividualReading" */ './NavigationItems/NavigationItems.vue'),
    'navigation-items': NavigationItems,
    'annotation': () => import(/* webpackChunkName: "client-components/AnnotationManager" */ './../components/AnnotationManager/AnnotationManager.vue'),
  },
  computed: {
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
      console.log(window.$(`[data-pacor-section-seq-id="0"]`).length)
      //window.$(`[data-pacor-section-seq-id="0"]`).after($(`<div>${this.t}</div>`))
    }, 1000 * 1)
    
    
  },
  methods: {
  } // methods
}

export default IndividualReading