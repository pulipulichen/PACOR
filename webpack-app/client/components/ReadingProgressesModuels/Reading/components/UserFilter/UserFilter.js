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
        selectUser: null,
        
        chart: {
          userJSON: null,

          allJSON: null,

          othersJSONMap: null,
        }
      }
    }
  },
  components: {
    'peer-list': PeerList,
    'user-chart': UserChart,
  },
  computed: {
    peer () {
      return this.status.filter.focusUser
    },
    peerIsMe () {
      return (this.status.filter.focusUser 
              && this.status.filter.focusUser.id === this.status.userID)
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
      if (this.status.filter.focusUser) {
        this.filterData.selectUser = this.status.filter.focusUser
      }
      //console.log(this.filterData.selectUser)
      
      this.$refs.PeerList.loadInit()
      this.$refs.UserChart.loadInit()
      
      this.$refs.Modal.show()
      
    },
    hide () {
      this.$refs.Modal.hide()
    },
    submit () {
      if (this.filterData.selectUser) {
        this.status.filter.focusUser = this.filterData.selectUser
      }
      else {
        this.status.filter.focusUser = null
      }
      //console.log(this.filterData.selectUser)
      
      this.$refs.Modal.hide()
    }
  } // methods
}

export default UserSelector