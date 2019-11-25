import TypeItem from './TypeItem/TypeItem.vue'

let AnnotationTypeFilterPopup = {
  props: ['lib', 'status', 'config'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      typeDataList: []
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
      let data = {}
      
      if (this.status.search.focusUser) {
        data.focusUserID = this.status.search.focusUser.id
      }
      
      let result = await this.lib.AxiosHelper.get('/client/TypeFilter/init', data)
      console.log(result)
      
      this.typeDataList = result
    }
  } // methods
}

export default AnnotationTypeFilterPopup