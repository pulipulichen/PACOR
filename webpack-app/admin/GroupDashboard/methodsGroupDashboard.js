//import sigmaWebpack from 'sigma-webpack'
//console.log(Object.keys(sigmaWebpack))

import { sigma } from 'sigma-webpack'
//import './sigma.js/plugins/sigma.layout.forceAtlas2/sigma.layout.forceAtlas2.webpack.js'
import './sigma.js/plugins/sigma.plugins.dragNodes/sigma.plugins.dragNodes.js'
import './sigma.js/plugins/sigma.exporters.svg/sigma.exporters.svg.js'

export default function (GroupDashboard) {
  GroupDashboard.methods.initDashboard = async function () {
    // 先跟伺服器取得webpage的資訊
    this.reset()

    let groupID = Number(this.$route.params.groupID)
    let data = {
      webpageID: this.$route.params.webpageID,
      groupID,
      dashboardFilterMode: this.dashboardFilterMode
    }

    let result = await this.lib.AxiosHelper.get('/admin/GroupDashboard/info', data)

    if (!result) {
      throw new Error('GroupDahboard/info got error')
    }
    //console.log(result.groupIndicators)

    this.group = result.group
    this.group.group_seq_id = Number(this.$route.params.groupID)
    this.groupIndicators = result.groupIndicators
    this.eventList = result.eventList

    //console.log(this.group.users[0])
    //console.log(this.group.socialNetworks)

    this.status.webpageURL = result.webpageURL
    this.status.title = this.$t('Group Dashboard')
            + ' #' + (this.group.group_seq_id + 1)
            + ' (' + this.$t('{0} users', this.group.users.length, [this.group.users.length]) + ')'

    setTimeout(() => {
      this.drawGraphs()
    }, 100)
  }
  GroupDashboard.methods.attrHeaderID = function (anchor) {
    return '/group-dashboard/' + this.$route.params.webpageID + '/' + this.$route.params.groupID + '/' + anchor
  }
  GroupDashboard.methods.reset = function () {
    this.group.socialNetworks = []
    this.group.users = []
    this.groupIndicators = {}
    this.eventList = []
  }
  
}