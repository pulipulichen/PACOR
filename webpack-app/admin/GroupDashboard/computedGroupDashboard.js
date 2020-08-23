
export default function (GroupDashboard) {
  GroupDashboard.computed.webpagePath = function () {
    if (typeof (this.status.webpageURL) === 'string') {
      return '/' + this.status.webpageURL.split('/').slice(3).join('/')
    }
  }

  GroupDashboard.computed.groupExportLink = function () {
    return '/admin/GroupDashboard/exportGroupData?webpageID=' + this.$route.params.webpageID + '&groupID=' + this.$route.params.groupID
  }
  GroupDashboard.computed.groupIndicatorsTSV = function () {
    let keys = this.groupIndicatorsKeys
    let values = keys.map(key => this.groupIndicators[key])

    return [
      keys.join('\t'),
      values.join('\t')
    ].join('\n')
  }
  GroupDashboard.computed.groupIndicatorsKeys = function () {
    if (this.groupIndicators === undefined
            || this.groupIndicators === null) {
      return []
    }

    return Object.keys(this.groupIndicators)
  }
  
  GroupDashboard.computed.eventListTSV = function () {
    if (this.eventList.length === 0) {
      return ''
    }
    
    let keys = Object.keys(this.eventList[0])
    let output = [
      keys.join('\t')
    ]
    
    this.eventList.forEach(line => {
      output.push(Object.keys(line).map(key => {
        return line[key]
      }).join('\t'))
    })
    
    return output.join('\n')
  }
}