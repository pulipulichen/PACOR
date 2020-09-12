import WepbageDashboardSubHeader from './../components/WepbageDashboardSubHeader/WepbageDashboardSubHeader.vue'

let WebpageExport = {
  props: ['lib', 'status', 'config'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      groupIndicators: [], 
      userEventList: [],
      confusedAnchorTexts: [],
      userEventListLoadingGroupID: null,
      groupIndicatorsListLoadingGroupID: null
      // 要挑那些組別，請看這裡
      // https://drive.google.com/drive/u/0/folders/17_P9Lm20Vx2_NA9lbWf4Fw3NeRefYSoe
      /*
      targetGroups: [
        'nn1 nn12 nn27 nn4 nn9',
        'nn11 nn20 nn22 nn7',
      ],
      */
      /*
      excludeGroups: [
        'nn23 nn25 nn999',
        'sz18 sz23 sz6 sz999'
      ]
      */
    }
  },
  components: {
    WepbageDashboardSubHeader
  },
  computed: {
    exportAllData () {
      return '/admin/WebpageExport/allData?webpageID=' + this.$route.params.webpageID
    },
    groupIndicatorsKeys () {
      let keys = []
      
      this.groupIndicators.forEach(group => {
        let groupKeys = Object.keys(group)
        
        groupKeys.forEach(key => {
          if (keys.indexOf(key) === -1) {
            keys.push(key)
          }
        })
      })
      
      return keys
    },
    groupModels () {
      let models = []
      this.groupIndicators.forEach(group => {
        if (Array.isArray(group.targetModels) === false) {
          return false
        }
        
        group.targetModels.forEach(model => {
          if (models.indexOf(model) === -1) {
            models.push(model)
          }
        })
      })
      
      models.sort()
      return models
    },
    groupIndicatorsEMMVariableNameList () {
      return 'model\n' + this.groupIndicatorsKeys.join('\n')
    },
    groupIndicatorsTSV () {
      let keys = this.groupIndicatorsKeys
      
      // --------------------------------
      
      let lines = [
        keys.join('\t')
      ]
      
      this.groupIndicators.forEach(group => {
        let line = keys.map(key => {
          return group[key]
        }).join('\t')
        lines.push(line)
      })
      
      return lines.join('\n')
      //return ''
    },
    groupIndicatorsEMMTSV () {
      let keys = ['model'].concat(this.groupIndicatorsKeys)
      
      // --------------------------------
      
      let lines = [
        keys.join('\t')
      ]
      
      /*
      this.groupIndicators.forEach(group => {
//        if (this.excludeGroups.indexOf(group.users) > -1) {
//          return false
//        }
        
        let line = keys.map(key => {
          return group[key]
        }).join('\t')
        lines.push(1 + line)
      })
      
      this.groupIndicators.forEach(group => {
        if (this.targetGroups.indexOf(group.users) === -1) {
          return false
        }
        
        let line = keys.map(key => {
          return group[key]
        }).join('\t')
        lines.push(2 + line)
      })
      */
      this.groupModels.forEach(model => {
        this.groupIndicators.forEach(group => {
          if (Array.isArray(group.targetModels) === false) {
            return false
          }
          
          if (group.targetModels.indexOf(model) === -1) {
            return false
          }

          let line = keys.map(key => {
            let value = group[key]
            if (typeof(value) === 'string') {
              value = value.trim()
            }
            return value
          }).join('\t')
          line = model + line
          lines.push(line)
        })
      })
     
      return lines.join('\n')
      //return ''
    },
    eventListTSV () {
      let eventList = this.userEventList
      if (eventList.length === 0) {
        return ''
      }

      let keys = Object.keys(eventList[0])
      let output = [
        keys.join('\t')
      ]

      eventList.forEach(line => {
        output.push(Object.keys(line).map(key => {
          return line[key]
        }).join('\t'))
      })

      return output.join('\n')
    },
    confusedAnchorTextsTSV () {
      return this.confusedAnchorTexts.map(line => {
        return Object.keys(line).map(key => line[key]).join('\t')
      }).join('\n')
    }
  },
//  watch: {
//  },
  mounted() {
    //this.loadGroupIndicators()
    this.loadGroupIndicatorsBatch()
    //this.loadUserEventList()
    //this.loadConfusedAnchorTexts()
  },
  methods: {
    attrHeaderID: function (anchor) {
      return '/webpage-dashboard/' + this.$route.params.webpageID + '/' + anchor
    },
    loadGroupIndicators: async function () {
      this.groupIndicators = []
      
      let data = {
        webpageID: this.$route.params.webpageID
      }
      
      let result = await this.lib.AxiosHelper.get('/admin/WebpageExport/groupIndicators', data)
      //console.log(result)
      if (Array.isArray(result)) {
        this.groupIndicators = result
      }
    },
    loadGroupIndicatorsBatch: async function () {
      this.groupIndicators = []
      
      let groupID = 0
      this.groupIndicatorsListLoadingGroupID = groupID
      
      while (true) {
        let data = {
          webpageID: this.$route.params.webpageID,
          groupID: groupID
        }

        let result = await this.lib.AxiosHelper.get('/admin/WebpageExport/groupIndicators', data)
        if (result === false) {
          break
        }
        
        //console.log(result)
        if (Array.isArray(result)) {
          this.groupIndicators = this.groupIndicators.concat(result)
        }
        
        groupID++
        this.groupIndicatorsListLoadingGroupID = groupID
      }
      
      this.groupIndicatorsListLoadingGroupID = null
      
      this.groupIndicators.sort((a, b) => {
        if (a.groupCode < b.groupCode) {
          return -1
        }
        else {
          return 1
        }
      })
    },
    loadUserEventList: async function () {
      this.userEventList = []
      
      let groupID = 0
      while (true) {
        let data = {
          webpageID: this.$route.params.webpageID,
          groupID
        }
        
        this.userEventListLoadingGroupID = groupID
        //console.log('load event list: ' + groupID)
        let result = await this.lib.AxiosHelper.get('/admin/WebpageExport/eventList', data)
        
        //console.log(result)
        if (Array.isArray(result)) {
          this.userEventList = this.userEventList.concat(result)
        }
        
        if (result === false) {
          this.userEventListLoadingGroupID = null
          return false
        }
        groupID++
      }
    },
    loadConfusedAnchorTexts: async function () {
      this.confusedAnchorTexts = []
      
      let data = {
        webpageID: this.$route.params.webpageID
      }
      
      let result = await this.lib.AxiosHelper.get('/admin/WebpageExport/confusedAnchorTexts', data)
      //console.log(result)
      if (Array.isArray(result)) {
        this.confusedAnchorTexts = result
      }
    },
    buildARFF: function (modelA, modelB) {
      let relation = this.mmddhhmm() + '_' + modelA + '-' + modelB
      
      // ------------------
      
      let attributes = {}
      let excludeKeys = ['targetModels', 'users']
      let keys = this.groupIndicatorsKeys
      keys.forEach(key => {
        let type = 'numeric'
        if (excludeKeys.indexOf(key) > -1) {
          return false
        }
        
        attributes[key] = type
      })
      attributes.model = `{A${modelA},B${modelB}}`
      
      let attributesText = Object.keys(attributes).map(key => {
        return `@attribute ${key} ${attributes[key]}`
      }).join('\n')
      
      // ------------------
      
      let data = []
      
      let models = [modelA, modelB]
      //console.log(models)
      models.forEach((model, i) => {
        this.groupIndicators.forEach(group => {
          if (Array.isArray(group.targetModels) === false) {
            return false
          }

          if (group.targetModels.indexOf(model) === -1) {
            return false
          }

          let line = []
          
          keys.forEach(key => {
            if (excludeKeys.indexOf(key) > -1) {
              return false
            }
            let value = group[key]
            if (typeof(value) === 'string') {
              value = value.trim()
            }
            line.push(value)
          })
          
          if (i === 0) {
            line.push('A' + model)
          }
          else {
            line.push('B' + model)
          }
          data.push(line.join(','))
        })
      })
      //console.log(data)
        
      // ------------------
      // 合併
      
      return `@relation ${relation}

${attributesText}

@data
${data.join('\n')}`
    },
    mmddhhmm: function () {
      let d = new Date()
      var mm = d.getMonth() < 9 ? "0" + (d.getMonth() + 1) : (d.getMonth() + 1); // getMonth() is zero-based
      var dd = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();
      var hh = d.getHours() < 10 ? "0" + d.getHours() : d.getHours();
      var min = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();

      return "".concat(mm)
              .concat(dd)
              .concat('-')
              .concat(hh)
              .concat(min)
    }
  } // methods
}

export default WebpageExport