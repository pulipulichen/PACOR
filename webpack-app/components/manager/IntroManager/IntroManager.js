//import IntroJs from './introjs/intro.js'
//import anno from './anno/anno.js'
import './jquery-guide/jquery-guide.webpack.js'
import $ from 'jquery'

let IntroManager = {
  props: ['lib', 'status', 'config'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
    }
  },
//  components: {
//  },
  computed: {
  },
  watch: {
  },
  mounted: async function () {
    //console.log(introJs)
    /*
    setTimeout(() => {
      //let introJs = new IntroJs()
      //IntroJs().start();
    }, 3000)
    */
    await this.lib.VueHelper.sleep(1500)
    console.log($('.DigitalCountdownTimer').length)
    $.guide({
      actions: [
        {
          element: $('.my-MainIdea:first'),
          content: '<p>Welcome, click on the screen at any position to enter the next step</p>',
          offsetX: -140,
          offsetY: -60
        },
        /*
        {
          element: $('#domeUsingPanel'),
          content: '<p>How to using...</p>',
          offsetX: -140,
          offsetY: 0,
          beforeFunc: function(g) {
            $('#domeUsingPanel').fadeIn();
          }
        },
        {
          element: $('#domeGithubBtn'),
          content: '<p>Click here to access the project for Github</p>',
          offsetX: 0,
          offsetY: 50,
          isBeforeFuncExec: true,
          beforeFunc: function(g) {
            $('#domeGithubBtn').slideDown(function() {
              g.execAction();
            });
          }
        }
         */
      ]
    });
  },
  methods: {
  } // methods
}

export default IntroManager