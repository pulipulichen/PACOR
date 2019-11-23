import WordCloud from 'wordcloud'
import $ from 'jquery'
import './jQCloud/jqcloud.webpage.js'

let UserChart = {
  props: ['lib', 'status', 'config', 'filterData'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      user: null,
      others: null
    }
  },
//  components: {
//  },
  computed: {
    myAvatar () {
      return this.status.avatar
    },
    myUsername () {
      let user = this.status
      if (typeof(user.displayName) === 'string') {
        return user.displayName
      }
      else {
        return user.username
      }
    },
    otherAvatar () {
      return this.filterData.selectUser.avatar_url
    },
    otherUsername () {
      let user = this.filterData.selectUser
      if (typeof(user.display_name) === 'string') {
        return user.display_name
      }
      else {
        return user.username
      }
    }
  },
  watch: {
    'filterData.selectUser' () {
      this.load()
    }
  },
  mounted() {
    
    this._testjQCloud()
  },
  methods: {
    _testjQCloud: async function () {
      await this.lib.VueHelper.sleep(2000)
      
      var words = [
        {text: "Lorem", weight: 13},
        {text: "Ipsum", weight: 10.5},
        {text: "Dolor", weight: 9.4, color: 'red',
        handlers: {
          click: function () {
            //console.log(this)
            $(this)
              .popup({
                title   : 'Popup Title',
                content : 'Hello I am a popup'
            })
            ;
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
    _testWordCloud () {
      let canvas = this.$refs.canvas
    WordCloud(this.$refs.canvas, {
      list: [['foo', 12], ['bar', 6]],
      gridSize: Math.round(16 * $(canvas).width() / 1024),
      weightFactor: function (size) {
        return Math.pow(size, 2.3) * $(canvas).width() / 1024;
      },
      fontFamily: 'Times, serif',
      color: function (word, weight) {
        return (weight === 12) ? '#f02222' : '#c09292';
      },
      rotateRatio: 0.5,
      rotationSteps: 2,
      backgroundColor: '#ffe0e0'
    })
    },
    loadInit: async function () {
      console.log('讀取')
      this.user = null
      this.others = null
    },
    load: async function () {
      console.log('讀取')
    },
    _mockupData () {
      
    }
  } // methods
}

export default UserChart