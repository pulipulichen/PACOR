import AnnotationTypeFilterPopup from './AnnotationTypeFilterPopup/AnnotationTypeFilterPopup.vue'
import $ from 'jquery'

let AnnotationTypeFilter = {
  props: ['lib', 'status', 'config'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      inited: false
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
      //throw new Error('showTypeFilter')
    },
    hide () {
      throw new Error('hide')
    },
    initPopup () {
      return null
      if (this.inited === true) {
        return null
      }
      this.inited = true
      
      let popup = this.$refs.AnnotationTypeFilterPopup
      
      let anchor = $(this.$refs.anchor)
      
      anchor.popup({
                popup: popup,
                inline     : true,
                hoverable  : true,
                on    : 'click',
                distanceAway: 20,
                onVisible: () => {
                  popup.load()
                }
              })
              
      anchor.click()
    }
  } // methods
}

export default AnnotationTypeFilter