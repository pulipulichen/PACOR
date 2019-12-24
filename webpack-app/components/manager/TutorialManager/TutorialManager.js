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
      guide: null,
      isPlaying: false
    }
  },
//  components: {
//  },
  computed: {
    defaultType () {
      return this.lib.auth.currentStep
    }
  },
  watch: {
    'status.needLogin' () {
      this.stop()
    }
  },
  mounted: async function () {
    //this._test()
  },
  destroyed () {
    this.stop()
  },
  methods: {
    addAction (type, action) {
      if (typeof(type) !== 'string') {
        action = type
        type = this.defaultType
      }
      //console.log(this.defaultType)
      
      if (Array.isArray(this.actionLists[type]) === false) {
        this.actionLists[type] = []
      }
      
      this.actionLists[type].push(action)
      
      //console.log(this.actionLists)
    },
    start (type) {
      let actions = this.getActions(type)
      if (Array.isArray(actions) === false) {
        return false
      }
      //console.log(actions)
      this.guide = $.guide({
        actions,
        complete: () => {
          this.isPlaying = false
          this.lib.RangyManager.selectionLock = false
        }
      });
      this.isPlaying = true
      //console.log(this.guide)
    },
    getActions (type) {
      if (typeof(type) !== 'string') {
        type = this.defaultType
      }
      
      let list = this.actionLists[type]
      if (Array.isArray(list) === false) {
        return undefined
      }
      
      // ---------------------
      
      list = list.map((action) => {
        if (typeof(action) === 'function') {
          action = action()
        }
        
        if (!action || typeof(action) !== 'object') {
          action = {}
        }
        
        //console.log(action)
        
//        if (action.element) {
////          if (action && !action.element) {
////            //throw new Error('Element is not found', action)
////          }
//          
//          if (typeof(action.element.$el) === 'object') {
//            action.element = action.element.$el
//          }
//          action.element = $(action.element)
//        }
        
        if (typeof(action.order) !== 'number') {
          action.order = 999
        }
        
        return action
      })
      
      // ---------------------
      
      list.sort(function (a, b) {
        return a.order - b.order
      })
      return list
    },
    stop () {
      if (!this.guide) {
        return false
      }
      //$.guide;
      this.guide.exit()
    },
    
    // -------------------------------------------------
    
    _test: async function () {
      await this.lib.VueHelper.sleep(3000)
    
      this.addAction({
        element: $('.my-MainIdea:first'),
        content: '1 Welcome, click on the screen at any position to enter the next step',
        order: 2
      })
      
      this.addAction({
        element: $('.DigitalCountdownTimer:first'),
        //content: '2 Welcome, click on the screen at any position to enter the next step',
        order: 1
      })
    
      this.start()
      
      await this.lib.VueHelper.sleep(3000)
      
      //this.stop()
    }
  } // methods
}

export default TutorialManager