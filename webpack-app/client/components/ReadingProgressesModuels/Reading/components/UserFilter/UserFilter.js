import PeerList from './PeerList/PeerList.vue'
import UserChart from './UserChart/UserChart.vue'

let UserSelector = {
  props: ['lib', 'status', 'config'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      filterData: {
        
      }
    }
  },
  components: {
    'peer-list': PeerList,
    'user-chart': UserChart,
  },
  computed: {
    peer () {
      return
    }
  },
  watch: {
  },
  mounted() {
    //this.show() // for test
  },
  methods: {
    show () {
      //console.trace('誰開的？')
      this.$refs.Modal.show()
    },
    submit () {
      throw new Error('@TODO')
    }
  } // methods
}

export default UserSelector