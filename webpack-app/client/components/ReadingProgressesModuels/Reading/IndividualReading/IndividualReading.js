import NavigationItems from './NavigationItems/NavigationItems.vue'
//const NavigationItems = require('./NavigationItems/NavigationItems.vue').default

let IndividualReading = {
  props: ['lib', 'status', 'config'],
  data() {    
    //this.$i18n.locale = this.config.locale
    return {
      stepData: {
        
      },
      t: '',
    }
  },
  components: {
    //'navigation-items': () => import(/* webpackChunkName: "client-components/IndividualReading" */ './NavigationItems/NavigationItems.vue'),
    'navigation-items': NavigationItems,
    'rangy': () => import(/* webpackChunkName: "client-components/components" */ './../components/RangyManager/RangyManager.vue'),
    'annotation-panel': () => import(/* webpackChunkName: "client-components/components" */ './../components/AnnotationPanel/AnnotationPanel.vue'),
    'annotation-manager': () => import(/* webpackChunkName: "client-components/components" */ './../components/AnnotationManager/AnnotationManager.vue'),
    'section-manager': () => import(/* webpackChunkName: "client-components/components" */ './../components/SectionManager/SectionManager.vue'),
  },
  computed: {
  },
  watch: {
  },
  mounted() {
            
    this.status.title = this.status.username
    
    setTimeout(() => {
      return
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
      //console.log(window.$(`[data-pacor-section-seq-id="0"]`).length)
      //window.$(`[data-pacor-section-seq-id="0"]`).after($(`<div>${this.t}</div>`))
    }, 1000 * 1)
    
    
  },
  methods: {
    initComponentToLib () {
      this.lib.RangyManager = this.$refs.RangyManager
      this.lib.AnnotationPanel = this.$refs.AnnotationPanel
    }
  } // methods
}

export default IndividualReading