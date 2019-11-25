import TypeItem from './TypeItem/TypeItem.vue'

let AnnotationTypeFilterPopup = {
  props: ['lib', 'status', 'config'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      typeDataList: [],
      loadLock: false
    }
  },
  components: {
    'type-item': TypeItem
  },
  computed: {
  },
//  watch: {
//  },
//  mounted() {
//  },
  methods: {
    load: async function () {
      if (this.loadLock === true) {
        return null
      }
      this.loadLock = true
      let data = {}
      
      if (this.status.search.focusUser) {
        data.focusUserID = this.status.search.focusUser.id
      }
      
      let result = await this.lib.AxiosHelper.get('/client/AnnotationTypeFilter/init', data)
      console.log(result)
      
      this.typeDataList = result
      this.loadLock = false
    }
  } // methods
}

export default AnnotationTypeFilterPopup