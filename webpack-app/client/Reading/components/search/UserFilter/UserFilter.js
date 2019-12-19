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
        tempSelectUserID: null,
        
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
    },
    selectUsername () {
      if (!this.filterData.selectUser) {
        return undefined
      }
      
      let user = this.filterData.selectUser

      if (typeof(user.displayName) === 'string') {
        return user.displayName
      }
      else {
        return user.username
      }
    }
  },
//  watch: {
//  },
//  mounted() {
//    this.testShow() // for test
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
      this.$emit('show')
    },
    selectUser (id) {
      //console.log(id)
      this.filterData.tempSelectUserID = id
      this.show()
    },
    hide () {
      this.$refs.Modal.hide()
      //console.log('有hide嗎？')
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