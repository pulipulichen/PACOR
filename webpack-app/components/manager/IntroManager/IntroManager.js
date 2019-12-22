//import IntroJs from './introjs/intro.js'
import anno from './anno/anno.js'

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
  mounted() {
    //console.log(introJs)
    /*
    setTimeout(() => {
      //let introJs = new IntroJs()
      //IntroJs().start();
    }, 3000)
    */
  },
  methods: {
  } // methods
}

export default IntroManager