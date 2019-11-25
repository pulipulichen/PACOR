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
    show () {
      if (!this.anchor) {
        this.anchor = $(this.$refs.anchor)
      }
      
      if (this.inited === true) {
        this.anchor.click()
        return null
      }
      
      this.inited = true
      
      let popup = this.$refs.popup
      
      this.anchor.popup({
                popup: popup,
                inline     : true,
                hoverable  : true,
                on    : 'click',
                position: "top center",
                //distanceAway: 20,
                onVisible: () => {
                  this.$refs.AnnotationTypeFilterPopup.load()
                }
              })
              
      this.anchor.click()
    },
    hide () {
      //throw new Error('hide')
      this.anchor.click()
    },
  } // methods
}

export default AnnotationTypeFilter