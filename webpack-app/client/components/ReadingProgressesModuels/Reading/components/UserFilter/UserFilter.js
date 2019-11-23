import PeerList from './PeerList/PeerList.vue'
import UserChart from './UserChart/UserChart.vue'

let UserSelector = {
  props: ['lib', 'status', 'config'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      filterData: {
        users: [],
        allAnnotationTypes: [],
        selectUser: null
      }
    }
  },
  components: {
    'peer-list': PeerList,
    'user-chart': UserChart,
  },
  computed: {
    peer () {
      return this.status.filter.findUser
    },
    username () {
      if (this.peer) {
        let user = this.peer

        if (typeof(user.displayName) === 'string') {
          return user.displayName
        }
        else {
          return user.username
        }
      }
    }
  },
//  watch: {
//  },
//  mounted() {
//    //this.show() // for test
//  },
  methods: {
    show () {
      this.$refs.PeerList.loadInit()
      this.$refs.UserChart.load()
      
      this.$refs.Modal.show()
    },
    submit () {
      this.status.filter.findUser = this.filterData.selectUser
    }
  } // methods
}

export default UserSelector