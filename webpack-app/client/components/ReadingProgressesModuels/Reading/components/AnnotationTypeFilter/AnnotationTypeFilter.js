import AnnotationTypeFilterPopup from './AnnotationTypeFilterPopup/AnnotationTypeFilterPopup.vue'
import $ from 'jquery'

let AnnotationTypeFilter = {
  props: ['lib', 'status', 'config'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      inited: false,
      anchor: null
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
    
    show: async function () {
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
      
      this.anchor.popup({
                popup: popup,
                inline     : true,
                hoverable  : true,
                on    : 'click',
                position: "top center",
                onShow: () => {
                  this.$refs.AnnotationTypeFilterPopup.load()
                }
              })
      
      //await this.lib.VueHelper.sleep(500)
      this.anchor.popup('show')
      //this.anchor.popup('hide')
      //this.anchor.popup('show')
    },
    hide () {
      //throw new Error('hide')
      this.anchor.popup('hide all')
    },
  } // methods
}

export default AnnotationTypeFilter