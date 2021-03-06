import AnnotationTypeFilterPopup from './AnnotationTypeFilterPopup/AnnotationTypeFilterPopup.vue'
import $ from 'jquery'

let AnnotationTypeFilter = {
  props: ['lib', 'status', 'config'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      inited: false,
      anchor: null,
      isFixed: false
    }
  },
  components: {
    'annotation-type-filter-popup': AnnotationTypeFilterPopup
  },
  computed: {
    type () {
      return this.status.filter.findType
    }
  },
//  watch: {
//  },
//  mounted() {
//  },
  methods: {
    
    show: async function (fix) {
      //console.log(fix)
      if (fix === true) {
        this.isFixed = true
      }
      
      if (!this.anchor) {
        this.anchor = $(this.$refs.anchor)
      }
      
      if (this.inited === true) {
        this.anchor.popup('show')
        return null
      }
      
      this.inited = true
      
      let popup = this.$refs.popup
      
      await this.$refs.AnnotationTypeFilterPopup.load()
      
      let popupOptions = {
        popup: popup,
        inline     : true,
        hoverable  : true,
        on    : 'click',
        position: "top center",
        //boundary: document.body,
        onShow: () => {
          this.$refs.AnnotationTypeFilterPopup.load()
        },
        onHide: () => {
          //console.log(this.isFixed)
          return !this.isFixed
        }
      }
      //console.log(popupOptions)
      this.anchor.popup(popupOptions)
      
      //await this.lib.VueHelper.sleep(500)
      this.anchor.popup('show')
      //this.anchor.popup('hide')
      //this.anchor.popup('show')
    },
    hide () {
      //throw new Error('hide')
      this.isFixed = false
      if (this.anchor) {
        this.anchor.popup('hide all')
      }
    },
  } // methods
}

export default AnnotationTypeFilter