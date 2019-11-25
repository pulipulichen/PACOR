import AnnotationTypeFilterPopup from './AnnotationTypeFilterPopup/AnnotationTypeFilterPopup.vue'

let AnnotationTypeFilter = {
  props: ['lib', 'status', 'config'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
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
      throw new Error('showTypeFilter')
    },
    hide () {
      throw new Error('hide')
    }
  } // methods
}

export default AnnotationTypeFilter