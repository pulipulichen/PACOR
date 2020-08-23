
let GroupDashboard = {
  props: ['lib', 'status', 'config'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      toc: null,
      group: {
        group_seq_id: null,
        socialNetworks: [],
        users: []
      },
      dashboardFilterMode: 'onlyCompleted', // 'all' || 'onlyCompleted'
      groupIndicators: {},
      eventList: []
    }
  },
//  components: {
//  },
  computed: {}, // computedGroupDashboard.js
  watch: {
    dashboardFilterMode () {
      this.initDashboard()
    }
  },
  mounted() {
    this.initDashboard()
    this.toc = this.$refs.toc
    
  },
  methods: {} // methodsGroupDashboard
}

import computedGroupDashboard from './computedGroupDashboard.js'
computedGroupDashboard(GroupDashboard)

import methodsGroupDashboard from './methodsGroupDashboard.js'
methodsGroupDashboard(GroupDashboard)

import methodsGraphGroupDashboard from './methodsGraphGroupDashboard.js'
methodsGraphGroupDashboard(GroupDashboard)

export default GroupDashboard