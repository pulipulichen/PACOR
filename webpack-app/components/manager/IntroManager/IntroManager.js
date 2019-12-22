import introJs from './introjs/intro.js'

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
    introJs().start();
  },
  methods: {
  } // methods
}

export default IntroManager