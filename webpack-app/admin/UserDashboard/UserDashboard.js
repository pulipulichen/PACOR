import PreImaginary from './PreImaginary/PreImaginary.vue'
import IndividualReading from './IndividualReading/IndividualReading.vue'
import CollaborativeReading from './CollaborativeReading/CollaborativeReading.vue'
import PostRecall from './PostRecall/PostRecall.vue'

import PreImaginaryKeyword from './PreImaginaryKeyword/PreImaginaryKeyword.vue'
import PostRecallKeyword from './PostRecallKeyword/PostRecallKeyword.vue'

//import ReaderCard from './ReaderCard/ReaderCard.vue'

let UserDashboard = {
  props: ['lib', 'status', 'config', 'progress', 'error', 'view'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      toc: null,
      user: {
        readingProgresses: []
      },
      group: {
        group_seq_id: null,
        users: []
      }
    }
  },
  components: {
    PreImaginary: PreImaginary,
    IndividualReading: IndividualReading,
    CollaborativeReading: CollaborativeReading,
    PostRecall: PostRecall,
    PreImaginaryKeyword: PreImaginaryKeyword,
    PostRecallKeyword: PostRecallKeyword,
    //'reader-card': ReaderCard
  },
  computed: {
    'webpagePath': function () {
      if (typeof(this.status.webpageURL) === 'string') {
        return '/' + this.status.webpageURL.split('/').slice(3).join('/')
      }
    },
    'username': function () {
      if (typeof(this.user.username) !== 'string') {
        return ''
      }
      
      let output = this.user.username
      if (typeof(this.user.display_name) === 'string'
              && this.user.username !== this.user.display_name) {
        output = output + ' (' + this.user.display_name + ')'
      }
      
      return output
    }
  },
  //watch: {
  //},
  mounted() {
    this.initDashboard()
    this.toc = this.$refs.toc
  },
  methods: {
    initDashboard: async function () {
      // 先跟伺服器取得webpage的資訊
      let data = {
        webpageID: this.$route.params.webpageID,
        userID: this.$route.params.userID,
      }
      
      let result = await this.lib.AxiosHelper.get('/admin/UserDashboard/info', data)
      this.user = result.user
      //console.log(this.user)
      
      this.group = result.group
      //console.log(this.group)
      
      this.status.webpageURL = result.webpageURL
      this.status.title = this.$t('Dashboard') + ' ' + this.username
    },
    attrHeaderID: function (anchor) {
      return '/user-dashboard/' + this.$route.params.webpageID + '/' + this.$route.params.userID + '/' + anchor
    },
    stepIcon: function (step) {
      if (step.isCompleted) {
        return 'checkmark'
      }
      else if (typeof(step.start_timestamp) === 'number') {
        return 'play'
      }
      else {
        return 'hourglass'
      }
    }
  } // methods
}

export default UserDashboard