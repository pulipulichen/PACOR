import PeerItem from './PeerItem/PeerItem.vue'

let PeerList = {
  props: ['lib', 'status', 'config', 'filterData'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
    }
  },
  components: {
    'peer-item': PeerItem
  },
//  computed: {
//  },
//  watch: {
//  },
//  mounted() {
//  },
  methods: {
    loadInit: async function () {
      let data = {
        //  好像也想不到要傳什麼資料...
      }
      
      let result = await this.lib.AxiosHelper.get('/client/UserFilter/initPeerList', data)
      
      //console.log(result)
      
      if (Array.isArray(result)) {
        this.filterData.users = this.filterData.users.slice(0, 0).concat(result)
      }
      
      //console.log(this.filterData.selectUser)
    }
  } // methods
}

export default PeerList