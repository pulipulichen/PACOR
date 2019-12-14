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
      
      if (this.status.filter.focusUser) {
        data.focusUserID = this.status.filter.focusUser.id
      }
      
      let result = await this.lib.AxiosHelper.get('/client/AnnotationTypeFilter/init', data)
      //console.log(result)
      
      let totalItem = this.getTotalItem(result)
      result.unshift(totalItem)
      
      this.typeDataList = result
      this.loadLock = false
    },
    getTotalItem (typeDataList) {
      let item = {
        type: null,
        myCount: 0,
        othersCount: 0
      }
      
      typeDataList.forEach(typeData => {
        item.myCount = item.myCount + parseInt(typeData.myCount, 10)
        item.othersCount = item.othersCount + parseInt(typeData.othersCount, 10)
      }) 
      
      return item
    }
  } // methods
}

export default AnnotationTypeFilterPopup