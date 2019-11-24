//import WordCloud from 'wordcloud'
import $ from 'jquery'
import './jQCloud/jqcloud.webpage.js'

import UserChartPopup from './UserChartPopup/UserChartPopup.vue'
import UserChartLables from './UserChartLables/UserChartLables.vue'

let UserChart = {
  props: ['lib', 'status', 'config'
    , 'filterData'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      jQCloudOptions: {
        autoResize: true,
        colors: [
          'rgba(0,0,0,0.85)',
          '#312520',
          '#493131',
          '#161823',
          '#3d3b4f',
          '#622a1d',
          '#725e82',
          '#50616d',
          '#41555d',
          '#758a99'
        ]
      },
      //allArray: null,
      othersArrayMap: {},
    }
  },
  components: {
    'user-chart-popup': UserChartPopup,
    'user-chart-labels': UserChartLables
  },
  computed: {
    otherIsAll () {
      return (!this.filterData.selectUser)
    },
    otherIsMe () {
      return (this.filterData.selectUser
              && this.filterData.selectUser.id === this.status.userID)
    },
    userWordsTextArray () {
      if (!this.filterData.chart.userJSON) {
        return []
      }
      return Object.keys(this.filterData.chart.userJSON)
    },
    allWords () {
      let words = this.filterData.chart.allJSON
      return this._processWordFrequency(words)
    },
    userWords() {
      let words = this.filterData.chart.userJSON
      return this._processWordFrequency(words)
    },
    jQCloudWords () {
      let words
      if (this.otherIsAll) {
        // 先看看有沒有暫存
        return this.allWords
      }
      else if (this.otherIsMe) {
        return this.userWords
      }
      else {
        let userID = this.filterData.selectUser.id
        if (Array.isArray(this.othersArrayMap[userID])) {
          return this.othersArrayMap[userID]
        }
        
        let words = this.filterData.chart.othersJSONMap[userID]
        this.othersArrayMap[userID] = this._processWordFrequency(words)
        return this.othersArrayMap[userID]
      }
    }
  },
  watch: {
    'filterData.selectUser' () {
      //console.log('有變更嗎？')
      this.load()
    }
  },
//  mounted() {
//    //this._testjQCloud()
//  },
  methods: {
    loadInit: async function () {
      this.filterData.chart.userJSON = null
      this.filterData.chart.allJSON = null
      this.filterData.chart.othersJSONMap = null
      
      // 載入
      let url = '/client/UserFilter/initUserChart'
      let data = {}
      if (this.filterData.selectUser) {
        data.userID = this.filterData.selectUser.id
      }
      
      let result = await this.lib.AxiosHelper.get(url, data)
      this.filterData.chart.userJSON = result.userJSON
      if (this.filterData.selectUser) {
        if (!this.filterData.chart.othersJSONMap) {
          this.filterData.chart.othersJSONMap = {}
        }
        this.filterData.chart.othersJSONMap[data.userID] = result.otherJSON
      }
      else {
        this.filterData.chart.allJSON = result.allJSON
      }
      
      this._draw()
    },
    load: async function () {
      
      // 這邊要先偵測快取
      if (this.otherIsMe === true) {
        //console.log('是我')
        this._draw(true)
        return null
      }
      else if (this.otherIsAll === true && this.filterData.chart.allJSON) {
        //console.log('是大家')
        this._draw(true)
        return null
      }
      else {
        //console.log('是某人')
        let userID = this.filterData.selectUser.id
        if (this.filterData.chart.othersJSONMap
            && this.filterData.chart.othersJSONMap[userID]) {
          this._draw(true)
          return null
        }
      }
      
      // --------------------------
      
      let url = '/client/UserFilter/getUserWords'
      let data = {}
      if (this.filterData.selectUser) {
        data.userID = this.filterData.selectUser.id
      }
      let result = await this.lib.AxiosHelper.get(url, data)
      if (this.otherIsAll === true) {
        this.filterData.chart.allJSON = result
      }
      else {
        if (!this.filterData.chart.othersJSONMap) {
          this.filterData.chart.othersJSONMap = {}
        }
        this.filterData.chart.othersJSONMap[data.userID] = result
      }
      
      this._draw(true)
    },
    _draw (doUpdate) {
      // 畫
      //console.log(this.jQCloudWords)
      if (doUpdate === undefined) {
        $(this.$refs.jQCloudContainer).jQCloud(this.jQCloudWords, this.jQCloudOptions)
      }
      else {
        //console.log('update')
        $(this.$refs.jQCloudContainer).jQCloud('update', this.jQCloudWords)
      }
    },
    // ---------------------------------
    
    _processWordFrequency (words) {
      let initPopup = this.$refs.UserChartPopup.initPopup
      //let _this = this
      //console.log(typeof(initPopup))
      //console.log(words)
      return Object.keys(words).map(text => {
        let item = {
          text
        }
        item.weight = words[text]
        if (this.userWordsTextArray.indexOf(text) > -1) {
          item.color = '#690'
        }
        
        item.handlers = {
//          mouseover: function () {
//            initPopup(this)
//          },
          click: function () {
            initPopup(this)
          }
        }
        return item
      })
    },
    
    // ---------------------------------------------------------
    
    _testjQCloud: async function () {
      await this.lib.VueHelper.sleep(2000)
      
      let popupEle = $(this.$refs.popup)
      
      let inited = false
      
      var words = [
        {text: "Lorem", weight: 13},
        {text: "Ipsum", weight: 10.5},
        {text: "Dolor", weight: 9.4, color: 'red',
        handlers: {
          mouseover: function () {
            if (inited === true) {
              return
            }
            //console.log(this)
            console.log(this.innerText.trim())
            $(this)
              .popup({
                popup: popupEle,
                hoverable: true
            })
            inited = true
          }
        }},
        {text: "Sit", weight: 8},
        {text: "Amet", weight: 6.2},
        {text: "Consectetur", weight: 5},
        {text: "Adipiscing", weight: 5},
        /* ... */
      ];

      $(this.$refs.jQCloudContainer).jQCloud(words, {
        autoResize: true
//        colors: function (i) {
//          console.log(i)
//          return '#F00'
//          if (words[i].text === 'Dolor') {
//            return '#F00'
//          }
//          else {
//            return 'black'
//          }
//        }
      });
      
      await this.lib.VueHelper.sleep(3000)
      
      ///$(this.$refs.jQCloudContainer).jQCloud(words, 'update');
    },
    
//    _mockupData () {
//      
//    },
//    onPopupClick () {
//      console.log('搜尋')
//    }
  } // methods
}

export default UserChart