//import IntroJs from './introjs/intro.js'
//import anno from './anno/anno.js'
import './jquery-guide/jquery-guide.webpack.js'
import $ from 'jquery'

let TutorialManager = {
  props: ['lib', 'status', 'config'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      actionLists: {},
      guide: null
    }
  },
//  components: {
//  },
//  computed: {
//  },
//  watch: {
//  },
  mounted: async function () {
    //this._test()
  },
  methods: {
    addAction (type, action, order) {
      if (typeof(type) !== 'string') {
        order = action
        action = type
        type = 'default'
      }
      
      if (typeof(order) !== 'number') {
        order = 0
      }
      
      if (Array.isArray(this.actionLists[type]) === false) {
        this.actionLists[type] = []
      }
      
      this.actionLists[type].push({
        action,
        order
      })
    },
    start (type) {
      let actions = this.getActions(type)
      this.guide = $.guide({actions});
      //console.log(this.guide)
    },
    getActions (type) {
      if (typeof(type) !== 'string') {
        type = 'default'
      }
      
      let list = this.actionLists[type]
      list.sort(function (a, b) {
        return a.order - b.order
      })
      return list.map(a => a.action)
    },
    stop () {
      //$.guide;
      this.guide.exit()
    },
    
    // -------------------------------------------------
    
    _test: async function () {
      await this.lib.VueHelper.sleep(3000)
    
      this.addAction({
        element: $('.my-MainIdea:first'),
        content: '1 Welcome, click on the screen at any position to enter the next step',
      }, 2)
      
      this.addAction({
        element: $('.DigitalCountdownTimer:first'),
        //content: '2 Welcome, click on the screen at any position to enter the next step',
      }, 1)
    
      this.start()
      
      await this.lib.VueHelper.sleep(3000)
      
      //this.stop()
    }
  } // methods
}

export default TutorialManager