import PeerList from './PeerList/PeerList.vue'
import UserChart from './UserChart/UserChart.vue'

let UserFilter = {
  props: ['lib', 'status', 'config'],
  // data() { },  // 轉移到 dataUserFilter
  components: {
    'peer-list': PeerList,
    'user-chart': UserChart,
  },
  computed: {}, // 轉移到 computedUserFilter
//  watch: {
//  },
  mounted() {
    //this.testShow() // for test
    this.setupTutorial()
  },
  methods: {} // 轉移到 methodsUserFilter
}

import dataUserFilter from './dataUserFilter.js'
dataUserFilter(UserFilter)

import computedUserFilter from './computedUserFilter.js'
computedUserFilter(UserFilter)

import methodsUserFilter from './methodsUserFilter.js'
methodsUserFilter(UserFilter)

import methodsTutorialUserFilter from './methodsTutorialUserFilter.js'
methodsTutorialUserFilter(UserFilter)

export default UserFilter